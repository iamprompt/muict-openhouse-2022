import { IQuestStatus, QUEST_STATUS } from '../../quests/helpers/getQuestStatus'

export const getRewardEligibility = async (questStatus: IQuestStatus[]) =>
  questStatus.every((q) => q.status === QUEST_STATUS.SUCCESS_QUEST)
