import type { Document, Model } from 'mongoose'
import { Schema, model } from 'mongoose'
import { Evaluation as EvaluationEntity } from '../types/Evaluation'

export type EvaluationDocument = Document & EvaluationEntity

const evaluationSchema = new Schema(
  {
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
    },
    role: String,
    gender: String,
    channels: [String],
    'participated-activities': [String],
    'date-and-time-rating': String,
    'location-rating': String,
    'service-rating': String,
    'understanding-rating': String,
    'stage-rating': String,
    'booths-rating': String,
    'project-rating': String,
    'guidance-rating': String,
    'intl-exp-rating': String,
    'benefit-rating': String,
    'overall-rating': String,
    'interest-rating': String,
    'interested-programs': [String],
    factors: [String],
    impressed: String,
    unimpressed: String,
    'other-suggestions': String,
  },
  { timestamps: true }
)

const Evaluation: Model<EvaluationDocument> = model<EvaluationDocument>('Evaluation', evaluationSchema)

export default Evaluation
