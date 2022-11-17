import type { FlexBubble } from '@line/bot-sdk'

const LINE_MESSAGE_STATIC_ASSET_DIR =
  process.env.NODE_ENV === 'production'
    ? 'https://muictop2022.iamprompt.me/static/line-message'
    : 'https://mbam2-dev.iamprompt.me/static/line-message'

export const FLEX_TICKET_BUBBLE = (name: string, profileImg: string): FlexBubble => ({
  type: 'bubble',
  hero: {
    type: 'image',
    url: `${LINE_MESSAGE_STATIC_ASSET_DIR}/images/flex-ticket-header.jpg`,
    size: 'full',
    aspectRatio: '2508:1466',
    aspectMode: 'cover',
  },
  body: {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'text',
        text: 'You Ticket to',
        color: '#CBD4E1',
      },
      {
        type: 'text',
        text: 'MUICT Open House 2022',
        weight: 'bold',
        size: 'lg',
        color: '#FFFFFF',
      },
      {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'Place',
                color: '#FFC914',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: 'Faculty of ICT, Mahidol University',
                wrap: true,
                color: '#56D7B8',
                size: 'sm',
                flex: 5,
              },
            ],
          },
          {
            type: 'box',
            layout: 'baseline',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: 'Time',
                color: '#FFC914',
                size: 'sm',
                flex: 1,
              },
              {
                type: 'text',
                text: '9:00 - 16:00',
                wrap: true,
                color: '#56D7B8',
                size: 'sm',
                flex: 5,
              },
            ],
          },
        ],
      },
    ],
  },
  footer: {
    type: 'box',
    layout: 'horizontal',
    spacing: 'sm',
    contents: [
      {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'image',
            url: profileImg,
            size: 'sm',
            aspectRatio: '1:1',
            aspectMode: 'cover',
          },
        ],
        flex: 0,
        cornerRadius: '9999px',
      },
      {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: name,
            size: 'lg',
            color: '#FFFFFF',
            weight: 'bold',
          },
          {
            type: 'text',
            text: 'Here is your ticket to MUICT Open House 2022. Enjoy!',
            wrap: true,
            size: 'xs',
            color: '#CBD4E1',
          },
        ],
        paddingStart: 'lg',
      },
    ],
    flex: 0,
    paddingAll: 'xxl',
    alignItems: 'center',
  },
  styles: {
    body: {
      backgroundColor: '#00063E',
    },
    footer: {
      backgroundColor: '#00063E',
    },
  },
})

export const FLEX_IG_FILTER = (): FlexBubble => ({
  type: 'bubble',
  hero: {
    type: 'image',
    url: `${LINE_MESSAGE_STATIC_ASSET_DIR}/images/flex-ig-filter.jpg`,
    size: 'full',
    aspectRatio: '78:117',
    aspectMode: 'cover',
    action: {
      type: 'uri',
      label: 'action',
      uri: 'https://www.instagram.com/ar/791751438794853/',
    },
  },
})
