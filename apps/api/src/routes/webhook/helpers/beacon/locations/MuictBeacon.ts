import type { BeaconEvent, FlexMessage, FollowEvent, ImageMapMessage, TextMessage } from '@line/bot-sdk'
import { BASE_URL } from '~/const/config'
import { getLiffUrl } from '~/const/line/liff'
import { LINEClient } from '~/libs/line'
import BeaconLog, { BeaconMessageSent } from '~/models/beaconlog.model'

// LINE Message consist of 4 bubbles:
// 1. Welcome Message
// 2. MUICT OP2022 Poster
// 3. MUICT OP2022 Registration Flex

const WelcomeMessage: TextMessage = {
  type: 'text',
  text: 'เตรียมพร้อม แล้วมาตะลุยมัลติเวิร์สด้วยกันที่งาน ICT Mahidol Open House 2022 กันเลย!!\n\nGet ready and join us at the ICT Mahidol Open House 2022!!',
}

const MUICTOP2022Poster: ImageMapMessage = {
  type: 'imagemap',
  baseUrl: `${BASE_URL}/static/line/images/square-poster`,
  altText: 'ICT Mahidol Open House 2022',
  baseSize: {
    width: 1040,
    height: 1040,
  },
  actions: [],
}

const MUICTOP2022Message: TextMessage = {
  type: 'text',
  text: 'มาร่วมเดินทางค้นหาตัวตนและ passion ทางด้าน IT ผ่าน 8 specializations ของ ICT Program และ 4 fields ของ DST Program ไปด้วยกันนะคะ',
}

const MUICTOP2022RegistrationFlex: FlexMessage = {
  type: 'flex',
  altText: 'ICT Mahidol Open House 2022 Registration',
  contents: {
    type: 'bubble',
    hero: {
      type: 'image',
      url: `${BASE_URL}/static/line/images/registration-hero.jpg`,
      size: 'full',
      aspectRatio: '1000:1156',
      aspectMode: 'cover',
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: [
        {
          type: 'button',
          style: 'primary',
          height: 'sm',
          action: {
            type: 'uri',
            label: 'Register Here',
            uri: getLiffUrl('/register'),
          },
          color: '#56D7B8',
        },
      ],
      flex: 0,
      paddingAll: 'xxl',
    },
    styles: {
      footer: {
        backgroundColor: '#00063E',
      },
    },
  },
}

export const MUICTBeaconHandler = async (event: BeaconEvent | FollowEvent) => {
  const { replyToken } = event
  const result = await LINEClient.replyMessage(replyToken, [
    WelcomeMessage,
    MUICTOP2022Poster,
    MUICTOP2022Message,
    MUICTOP2022RegistrationFlex,
  ])

  // Check if the MUICT message has sent
  const MUICTSent = await BeaconLog.find({
    lineUId: event.source.userId,
    messageSent: BeaconMessageSent.MUICT_WELCOME,
  }).exec()

  const isMUICTSent = MUICTSent.length > 0

  if (isMUICTSent) {
    return
  }

  if (event.type === 'beacon') {
    await BeaconLog.create({
      lineUId: event.source.userId,
      hwid: event.beacon.hwid,
      type: 'beacon',
      messageSent: BeaconMessageSent.MUICT_WELCOME,
    })
  } else if (event.type === 'follow') {
    await BeaconLog.create({
      lineUId: event.source.userId,
      type: 'follow',
      messageSent: BeaconMessageSent.MUICT_WELCOME,
    })
  }

  return result
}
