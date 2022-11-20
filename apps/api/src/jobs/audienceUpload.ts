import { AudienceGroups } from '@line/bot-sdk'
import dayjs from 'dayjs'
import { LINEClient } from '~/libs/line'
import { getParticipants } from '~/routes/stats/helpers/getParticipants'
import { groupParticipantsByType } from '~/routes/stats/helpers/groupParticipantsByType'

export const audienceUpload = async () => {
  console.log('audienceUpload job started at', new Date().toISOString())

  const participants = await getParticipants()
  const participantsGroupByRegType = groupParticipantsByType(participants)

  const participantsLineUIdsByTypes = Object.keys(participantsGroupByRegType).reduce((acc, type) => {
    acc[type] = participantsGroupByRegType[type].map((participant) => participant.lineUserId).filter(Boolean)
    return acc
  }, {} as Record<string, Array<string>>)

  const existingAudienceGroups: AudienceGroups = []
  let audienceGroupsHasNextPage = true
  let audienceGroupsPage = null

  do {
    const audienceGroups = await LINEClient.getAudienceGroups(audienceGroupsPage, undefined, undefined, 40)
    existingAudienceGroups.push(...audienceGroups.audienceGroups)
    audienceGroupsHasNextPage = audienceGroups.hasNextPage
  } while (audienceGroupsHasNextPage)

  for (const type of Object.keys(participantsLineUIdsByTypes)) {
    const audienceGroupDescription = `OP2022_${type}`
    const audienceGroupDescriptionWithTimestamp = `${audienceGroupDescription}-UA${dayjs().format('YYYYMMDDHHmm')}`
    const audienceGroupLineUIds = participantsLineUIdsByTypes[type]

    const audienceGroup = existingAudienceGroups.find(
      (audienceGroup) => audienceGroup.description.replace(/-UA(\d{12})/g, '') === audienceGroupDescription
    )

    if (audienceGroup) {
      await LINEClient.deleteAudienceGroup(`${audienceGroup.audienceGroupId}`)
      await LINEClient.createUploadAudienceGroup({
        description: audienceGroupDescriptionWithTimestamp,
        isIfaAudience: false,
        uploadDescription: `Updated: ${dayjs().format()}`,
        audiences: audienceGroupLineUIds.map((lineUId) => ({ id: lineUId })),
      })
    } else {
      await LINEClient.createUploadAudienceGroup({
        description: audienceGroupDescriptionWithTimestamp,
        isIfaAudience: false,
        uploadDescription: `Created: ${dayjs().format()}`,
        audiences: audienceGroupLineUIds.map((lineUId) => ({ id: lineUId })),
      })
    }
  }

  console.log('audienceUpload job finished at', new Date().toISOString())
}
