import dayjs from '~/utils/dayjs'
import { ParticipantDocument } from '~/models/participant.model'

export const groupParticipantsByDate = (participants: any[]) => {
  return participants.reduce((acc, participant) => {
    const { createdAt } = participant
    const dateFormatted = dayjs.tz(createdAt).format('YYYY-MM-DD')

    if (!acc[dateFormatted]) {
      acc[dateFormatted] = []
    }

    acc[dateFormatted].push(participant)
    return acc
  }, {} as Record<string, Array<ParticipantDocument>>)
}
