import { BASE_URL } from '~/const/config'
import { FLEX_IG_FILTER, FLEX_TICKET_BUBBLE } from '~/const/line/flex-messages'
import { getLiffUrl } from '~/const/line/liff'
import { LINEClient } from '~/libs/line'
import { Participant } from '../../../types/Participant'

export const sendTicketToLine = async (lineUid: string, profile: Participant) => {
  await LINEClient.pushMessage(lineUid, [
    {
      type: 'text',
      text:
        profile.language === 'th'
          ? `ยินดีต้อนรับ ${profile.firstName} ${profile.lastName} สู่กิจกรรม MUICT Open House 2022`
          : `Welcome ${profile.firstName} ${profile.lastName} to MUICT Open House 2022`,
    },
    {
      type: 'flex',
      altText: 'Ticket',
      contents: FLEX_IG_FILTER(),
    },
    {
      type: 'flex',
      altText: 'Important Link',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'bubble',
            hero: {
              type: 'image',
              url: `${BASE_URL}/static/line/images/carousel-agenda.jpg`,
              size: 'full',
              aspectRatio: '765:657',
              aspectMode: 'cover',
              action: {
                type: 'uri',
                label: 'action',
                uri: getLiffUrl('/agenda'),
              },
            },
          },
          {
            type: 'bubble',
            hero: {
              type: 'image',
              url: `${BASE_URL}/static/line/images/carousel-my-passport.jpg`,
              size: 'full',
              aspectRatio: '765:657',
              aspectMode: 'cover',
              action: {
                type: 'uri',
                label: 'action',
                uri: getLiffUrl('/quest'),
              },
            },
          },
          {
            type: 'bubble',
            hero: {
              type: 'image',
              url: `${BASE_URL}/static/line/images/carousel-scan.jpg`,
              size: 'full',
              aspectRatio: '765:657',
              aspectMode: 'cover',
              action: {
                type: 'uri',
                label: 'action',
                uri: 'https://line.me/R/nv/QRCodeReader',
              },
            },
          },
        ],
      },
    },
    {
      type: 'flex',
      altText:
        profile.language === 'th'
          ? 'นี่คือตั๋วของคุณ ขอให้คุณสนุกกับการเข้าร่วมกิจกรรมมหิดลวิชาการ เปิดบ้านมหิดล 2565'
          : 'This is your ticket, Enjoy the ICT Mahidol Open House 2022',
      contents: FLEX_TICKET_BUBBLE(profile.lineDisplayName, profile.linePicture),
    },
  ])
}
