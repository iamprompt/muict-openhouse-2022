import type { Document, Model } from 'mongoose'
import { Schema, model } from 'mongoose'
import { BeaconLog as BeaconLogEntity } from '~/types/models/BeaconLog'

/* eslint-disable no-unused-vars */
export enum BeaconMessageSent {
  LA_WELCOME = 'la_welcome',
  MUICT_WELCOME = 'muict_welcome',
}

export enum BeaconEventType {
  ENTER = 'enter',
  LEAVE = 'leave',
  BANNER = 'banner',
  STAY = 'stay',
  FOLLOW = 'follow',
}

export type BeaconLogDocument = Document & BeaconLogEntity

const BeaconLogSchema = new Schema(
  {
    lineUId: String,
    hwid: String,
    type: {
      type: String,
      enum: Object.values(BeaconEventType),
    },
    messageSent: {
      type: String,
      enum: Object.values(BeaconMessageSent),
    },
  },
  { timestamps: true }
)

const BeaconLog: Model<BeaconLogDocument> = model<BeaconLogDocument>('BeaconLog', BeaconLogSchema)

export default BeaconLog
