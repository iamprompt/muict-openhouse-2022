import Participant from '~/models/participant.model'

export const getUserRecordFromLineUId = async (uId: string, toThrow = false) => {
  const user = await Participant.findOne({ lineUserId: uId }).exec()
  if (!user && toThrow) {
    throw new Error('Participant not found')
  }
  return user
}
