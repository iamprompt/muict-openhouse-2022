import { z } from 'zod'

export const ParticipantValidator = z.object({
  language: z.string(),
  regType: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  province: z.number().or(z.string()),
  school: z.string().optional(),
  educationLevel: z.number().or(z.string()).optional(),
  policyAgreement: z.boolean(),

  lineUserId: z.string().optional(),
  lineDisplayName: z.string().optional(),
  linePicture: z.string().optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type Participant = z.infer<typeof ParticipantValidator>
