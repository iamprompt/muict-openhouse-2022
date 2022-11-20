import { Router } from 'express'
import { LINEApiRequest } from '~/types/api/webhook'
import { eventHandler } from './helpers/eventHandler'

const router = Router()

router.get('/', (_req, res) => {
  res.status(204).json({
    message: 'This webhook endpoint is working! intended for use with LINE Messaging API.',
  })
})

router.post('/', async (req: LINEApiRequest, res) => {
  const { body } = req

  for (const webhookEvent of body.events) {
    await eventHandler(webhookEvent)
  }

  res.status(200).json({
    success: true,
    payload: {
      message: 'OK',
    },
  })
})

export { router as webhookRouter }
