import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.status(204).json({
    message: 'This webhook endpoint is working! intended for use with LINE Messaging API.',
  })
})

router.post('/', (req, res) => {
  // TODO: Handle webhook events
  res.send('Hello World!')
})

export { router as webhookRouter }
