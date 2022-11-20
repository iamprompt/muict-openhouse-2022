import { getParticipants } from './getParticipants'

export const groupParticipantsByType = (participants: Awaited<ReturnType<typeof getParticipants>>) => {
  const participantsGroupByRegType = participants.reduce((acc, participant) => {
    const { regType, educationLevel } = participant
    let type = regType

    if (type === 'student' || type === 'uni_student') {
      type = `student_${educationLevel}`
    }

    if (!acc[type]) {
      acc[type] = []
    }

    acc[type].push(participant)
    return acc
  }, {} as Record<string, Array<any>>)

  return participantsGroupByRegType
}
