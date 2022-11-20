import { validateSignature } from '@line/bot-sdk'
import { NextFunction, Response } from 'express'
import { LINEApiRequest } from '~/types/api/webhook'

export const verifyLineSignature = async (req: LINEApiRequest, res: Response, next: NextFunction) => {
  const { headers, body } = req

  if (headers['x-line-signature'] === undefined) {
    console.log('[ERROR] No x-line-signature header found.')
    res.status(400).json({
      success: false,
      payload: 'Missing X-Line-Signature header, Please POST your request through LINE Messaging API',
    })
    return
  }

  const signature = headers['x-line-signature']
  const isSignatureValid = validateSignature(
    JSON.stringify(body),
    process.env.LINE_MESSAGING_API_CHANNEL_SECRET || '',
    signature
  )

  if (!isSignatureValid) {
    console.log('[ERROR] Invalid signature.')
    res.status(400).json({
      success: false,
      payload: 'Invalid signature, Please POST your request through LINE Messaging API',
    })
    return
  }

  console.log('[INFO] Signature is valid.')

  return next()
}
