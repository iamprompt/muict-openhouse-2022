import QuestLog from '../../../models/questlog.model'

export const getQuestLogFromQuestNo = async (userId: number, questNo: number, status?: string) => {
  const result = await QuestLog.find({
    participant: userId,
    questNo,
    ...(status && { status }),
  }).exec()

  return result
}
