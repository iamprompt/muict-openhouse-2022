import type { BeaconEvent, FollowEvent, ImageMapMessage, TextMessage } from '@line/bot-sdk'
import { BASE_URL } from '~/const/config'
import { LINEClient } from '~/libs/line'
import BeaconLog, { BeaconMessageSent } from '~/models/beaconlog.model'

// LINE Message consist of 4 bubbles:
// 1. Welcome Message
// 2. MUICT OP2022 Poster
// 3. MUICT OP2022 Registration Flex

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

const WelcomeMessage: TextMessage = {
  type: 'text',
  text: 'แวะมาบอก!! คณะ ICT เขามีงาน Open House ที่รอให้น้อง ๆ ไปตะลุยมัลติเวิร์สด้วยกันด้วยนะ เดินไปได้หรือน้องจะกดภาพด้านล่างเพื่อให้น้องสตาร์นำทางน้อง ๆ ไปก็ได้เหมือนกัน\n\nWe are waiting for you to come and join the journey throughout the multiverse in ICT Mahidol Open House 2022. You can visit the event by walking or click the image below to start your journey to the multiverse.',
}

const MUICTOP2022WarpMap: ImageMapMessage = {
  type: 'imagemap',
  baseUrl: `${BASE_URL}/static/line/images/warp-map`,
  altText: 'Navigate to ICT Mahidol Open House 2022',
  baseSize: {
    width: 1040,
    height: 892.67,
  },
  actions: [
    {
      type: 'uri',
      label: 'ICT Mahidol | Google Maps',
      linkUri:
        'https://www.google.com/maps/dir/?api=1&destination=Faculty+of+Information+and+Communication+Technology&destination_place_id=ChIJj03KfYuT4jAROhBUGBxOyxg&travelmode=walking',
      area: {
        x: 0,
        y: 0,
        width: 1040,
        height: 892.67,
      },
    },
  ],
}

const MUICTOP2022Detail: TextMessage = {
  type: 'text',
  text: '😍พบกับกิจกรรมจาก 4 Zone สุด wow ‼️\n👉Meet & Greet Zone โซนกิจกรรมสุดมันส์ พร้อมแชร์ประสบการณ์ในสายงาน IT\n👉International Experiences Zone พบกับนักศึกษาปัจจุบันและศิษย์เก่าที่ยกขบวนกันมาแชร์ประสบการณ์ Internship เรียนต่อ และทำงานในต่างประเทศ พร้อม Live สดจากรุ่นพี่ศิษย์เก่าส่งตรงจากต่างประเทศ\n👉Guidance Zone แนะแนวหลักสูตร ICT & DST Programs พร้อมทดลองเรียน Mock-Up Classes\n👉Innovative Project Zone พบกับ Senior Project สุดเจ๋งจากพี่ ๆ ICT Mahidol\n\nอย่าลืม‼️ แวะมาเยี่ยมชม ICT Mahidol กันนะคะ',
}

export const LABeaconHandler = async (event: BeaconEvent | FollowEvent) => {
  const { replyToken } = event

  const result = await LINEClient.replyMessage(replyToken, [
    MUICTOP2022Poster,
    WelcomeMessage,
    MUICTOP2022WarpMap,
    MUICTOP2022Detail,
  ])

  if (event.type === 'beacon') {
    await BeaconLog.create({
      lineUId: event.source.userId,
      hwid: event.beacon.hwid,
      type: event.beacon.type,
      messageSent: BeaconMessageSent.LA_WELCOME,
    })
  } else if (event.type === 'follow') {
    await BeaconLog.create({
      lineUId: event.source.userId,
      type: 'follow',
      messageSent: BeaconMessageSent.LA_WELCOME,
    })
  }

  return result
}
