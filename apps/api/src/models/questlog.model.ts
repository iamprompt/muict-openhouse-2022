import type { Document, Model } from 'mongoose'
import { Schema, model } from 'mongoose'
import { QuestLog as QuestLogEntity } from '~/types/models/QuestLog'

/* eslint-disable no-unused-vars */
export enum QuestLogStatus {
  INCORRECT = 'incorrect',
  SUCCESS = 'success',
  INIT = 'init',
  REWARD_CLAIM = 'reward_claim',
}

type QuestLogDocument = Document & QuestLogEntity

const questLogSchema = new Schema(
  {
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
    },
    questNo: Number,
    questionId: String,
    answer: [String],
    status: {
      type: String,
      enum: Object.values(QuestLogStatus),
    },
  },
  { timestamps: true }
)

const QuestLog: Model<QuestLogDocument> = model<QuestLogDocument>('QuestLog', questLogSchema)

export default QuestLog
