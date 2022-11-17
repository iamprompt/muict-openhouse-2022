import type { IQuestion } from '~/const/activity/questions'

export enum QUEST_STATUS {
  INIT_QUEST = 'INIT_QUEST',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESS_QUEST = 'SUCCESS_QUEST',
  NOT_STARTED = 'NOT_STARTED',
  UNKNOWN = 'UNKNOWN',
}

export interface IQuestPayload {
  status: QUEST_STATUS
  question?: IQuestion
}

export interface IRewardEligibilityPayload {
  isEligible: boolean
  isClaimed: boolean
}
