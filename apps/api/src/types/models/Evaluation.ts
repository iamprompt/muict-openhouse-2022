import { Schema } from 'mongoose'
import { z } from 'zod'
import { ParticipantValidator } from './Participant'

export const EvaluationValidator = z.object({
  participant: z.instanceof(Schema.Types.ObjectId).or(ParticipantValidator),
  role: z.string(),
  gender: z.string(),
  channels: z.array(z.string()),
  'participated-activities': z.array(z.string()),
  'date-and-time-rating': z.string(),
  'location-rating': z.string(),
  'service-rating': z.string(),
  'understanding-rating': z.string(),
  'stage-rating': z.string(),
  'booths-rating': z.string(),
  'project-rating': z.string(),
  'guidance-rating': z.string(),
  'intl-exp-rating': z.string(),
  'benefit-rating': z.string(),
  'overall-rating': z.string(),
  'interest-rating': z.string(),
  'interested-programs': z.array(z.string()),
  factors: z.array(z.string()),
  impressed: z.string(),
  unimpressed: z.string(),
  'other-suggestions': z.string(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Evaluation = z.infer<typeof EvaluationValidator>
