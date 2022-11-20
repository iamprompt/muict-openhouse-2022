import type { BeaconEvent } from '@line/bot-sdk'
import { MUICTBeaconHandler } from './locations/MuictBeacon'
import { LABeaconHandler } from './locations/LaBeacon'
import { LINE_BEACON_HWID } from '~/const/line/beacon'
import BeaconLog, { BeaconMessageSent } from '~/models/beaconlog.model'

export const beaconHandler = async (webhookEvent: BeaconEvent) => {
  console.log('[BEACON]', webhookEvent.beacon.type, '-', webhookEvent.beacon.hwid)

  // Don't use stay / leave event at this time
  if (webhookEvent.beacon.type === 'stay' || webhookEvent.beacon.type === 'leave') {
    return
  }

  // Do Something
  const location = LINE_BEACON_HWID[webhookEvent.beacon.hwid]

  // Check if the MUICT message has sent
  const MUICTSent = await BeaconLog.find({
    lineUId: webhookEvent.source.userId,
    messageSent: BeaconMessageSent.MUICT_WELCOME,
  }).exec()

  const isMUICTSent = MUICTSent.length > 0

  const LASent = await BeaconLog.find({
    lineUId: webhookEvent.source.userId,
    messageSent: BeaconMessageSent.LA_WELCOME,
  }).exec()

  const isLASent = LASent.length > 0

  if (location === 'MUICT') {
    // Do Something
    if ((webhookEvent.beacon.type === 'enter' || webhookEvent.beacon.type === 'banner') && !isMUICTSent) {
      // Send MUICT Welcome Message
      await MUICTBeaconHandler(webhookEvent)
    }
  } else if (location === 'LA') {
    // Do Something
    if (webhookEvent.beacon.type === 'banner' && !isMUICTSent && !isLASent) {
      // Send LA Welcome Message
      await LABeaconHandler(webhookEvent)
    }
  }
}
