import { WebhookRequestBody } from '@line/bot-sdk'
import { Request } from 'express'

export interface LINEApiRequest extends Request {
  headers: Request['headers'] & {
    'x-line-signature'?: string
  }
  body: WebhookRequestBody
}
