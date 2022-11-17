import type { Document, Model } from 'mongoose'
import { Schema, model } from 'mongoose'
import { Registration as RegistrationEntity } from '../types/Registration'

type RegistrationDocument = Document & RegistrationEntity

const registrationSchema = new Schema(
  {
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'Participant',
    },
  },
  { timestamps: true }
)

const Registration: Model<RegistrationDocument> = model<RegistrationDocument>('Registration', registrationSchema)

export default Registration
