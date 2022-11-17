import type { Document, Model } from 'mongoose'
import { Schema, model } from 'mongoose'
import { Participant as ParticipantEntity } from '../types/Participant'

export type ParticipantDocument = Document & ParticipantEntity

export const participantSchema = new Schema(
  {
    regType: String,
    language: String,
    firstName: String,
    lastName: String,
    dob: Date,
    email: String,
    phone: String,
    province: Number,
    school: String,
    educationLevel: Number,
    policyAgreement: Boolean,

    // LINE
    lineUserId: String,
    lineDisplayName: String,
    linePicture: String,
  },
  { timestamps: true }
)

const Participant: Model<ParticipantDocument> = model<ParticipantDocument>('Participant', participantSchema)

export default Participant
