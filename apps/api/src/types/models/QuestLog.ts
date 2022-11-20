import { Schema } from 'mongoose'
import { z } from 'zod'
import { ParticipantValidator } from './Participant'

export const QuestLogValidator = z.object({
  participant: z.instanceof(Schema.Types.ObjectId).or(ParticipantValidator),
  questNo: z.number(),
  questionId: z.string().optional(),
  answer: z.array(z.string()).optional(),
  status: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type QuestLog = z.infer<typeof QuestLogValidator>
