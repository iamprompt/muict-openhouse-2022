import QuestLog, { QuestLogStatus } from '../../../models/questlog.model'

export const getQuestLogFromStatus = async (userId: string, status: QuestLogStatus) => {
  const result = await QuestLog.find({
    participant: userId,
    status,
  }).exec()

  return result
}
