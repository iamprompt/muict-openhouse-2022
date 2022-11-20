import EduLevels from '~/const/register/eduLevel'
import Provinces from '~/const/register/province'
import Participant from '~/models/participant.model'

export const getParticipants = async (query = {}) => {
  try {
    const participants = await Participant.find(query)

    const participantFormatted = participants
      .filter((value, index, self) => {
        return (
          self.findIndex((v) => {
            return (v.lineUserId && v.lineUserId === value.lineUserId) || v.email === value.email
          }) === index
        )
      })
      .map((participant) => {
        participant.__v = undefined

        const participantJson = participant.toJSON()

        participantJson.province = Provinces.find((x) => x.province_id === participant.province)?.value || 'ไม่ระบุ'

        participantJson.educationLevel = EduLevels.find((x) => x.id === participant.educationLevel)?.value || 'ไม่ระบุ'

        participantJson.updatedAt = undefined

        return participantJson
      })

    console.log('[getParticipants]', participantFormatted.length, 'records')

    return participantFormatted
  } catch (error: any) {
    throw new Error(error.message)
  }
}
