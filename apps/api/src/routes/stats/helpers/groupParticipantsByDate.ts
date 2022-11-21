import dayjs from '~/utils/dayjs'
import { ParticipantDocument } from '~/models/participant.model'
import { getParticipants } from './getParticipants'

export const groupParticipantsByDate = (participants: Awaited<ReturnType<typeof getParticipants>>) => {
  return participants.reduce((acc, participant) => {
    const { createdAt } = participant

    console.log(createdAt)
    console.log(dayjs(createdAt).format('YYYY-MM-DD'))

    const dateFormatted = dayjs.tz(createdAt).format('YYYY-MM-DD')

    if (!acc[dateFormatted]) {
      acc[dateFormatted] = []
    }

    acc[dateFormatted].push(participant)
    return acc
  }, {} as Record<string, Array<ParticipantDocument>>)
}
