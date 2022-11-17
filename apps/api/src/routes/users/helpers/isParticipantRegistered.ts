import { getUserRecordFromLineUId } from './getUserRecordFromLineUId'

const isParticipantRegistered = async (uid?: string) => {
  // If no uid is provided, return false
  if (!uid) {
    return false
  }

  try {
    const userRecord = await getUserRecordFromLineUId(uid)
    return !!userRecord
  } catch (error: any) {
    throw new Error(error)
  }
}

export default isParticipantRegistered
