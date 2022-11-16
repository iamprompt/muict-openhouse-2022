import express, { json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { webhookRouter } from './routes/webhook'

const createServer = () => {
  const app = express()
  app.disable('x-powered-by')

  // Middleware
  app.use(morgan('dev'))
  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(cors())

  app.use('/webhook', webhookRouter)

  return app
}

export { createServer }
