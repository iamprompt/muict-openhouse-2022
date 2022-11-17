import { QuestLogStatus } from '../../../models/questlog.model'
import { getQuestLogFromStatus } from '../../quests/helpers/getQuestLogFromStatus'

export const isRewardClaimed = async (userId: string) => {
  const questLogs = await getQuestLogFromStatus(userId, QuestLogStatus.REWARD_CLAIM)

  const isRewardClaimed = questLogs.find((q) => q.status === QuestLogStatus.REWARD_CLAIM)

  return !!isRewardClaimed
}
