import { z } from 'zod'

export const BeaconLogValidator = z.object({
  lineUId: z.string(),
  hwid: z.string(),
  type: z.string(),
  messageSent: z.string(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type BeaconLog = z.infer<typeof BeaconLogValidator>
