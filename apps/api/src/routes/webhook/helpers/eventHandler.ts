import type { WebhookEvent } from '@line/bot-sdk'
// import { beaconHandler } from './beacon/handler'
// import { LABeaconHandler } from './beacon/locations/LaBeacon'
import { MUICTBeaconHandler } from './beacon/locations/MuictBeacon'

export const eventHandler = async (webhookEvent: WebhookEvent) => {
  // if (webhookEvent.type === 'beacon') {
  //   // Do Something
  //   await beaconHandler(webhookEvent)
  // }

  if (webhookEvent.type === 'follow') {
    // Do Something
    await MUICTBeaconHandler(webhookEvent)
  }
}
