import type { ClientConfig } from '@line/bot-sdk'
import { Client } from '@line/bot-sdk'

const config: ClientConfig = {
  channelAccessToken: process.env.LINE_MESSAGING_API_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_MESSAGING_API_CHANNEL_SECRET || undefined,
}

export const LINEClient = new Client(config)
