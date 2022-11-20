import { Schema } from 'mongoose'
import { z } from 'zod'
import { ParticipantValidator } from './Participant'

export const RegistrationValidator = z.object({
  participant: z.instanceof(Schema.Types.ObjectId).or(ParticipantValidator),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Registration = z.infer<typeof RegistrationValidator>
