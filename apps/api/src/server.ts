import express, { json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'

// Import Routes
import { webhookRouter } from './routes/webhook'
import { statsRouter } from './routes/stats'
import { usersRouter } from './routes/users'
import { experimentRouter } from './routes/experiments'

const createServer = () => {
  const app = express()
  app.disable('x-powered-by')

  // Middleware
  app.use(morgan('dev'))
  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(cors())

  app.use('/webhook', webhookRouter)
  app.use('/stats', statsRouter)
  app.use('/users', usersRouter)

  app.use('/exp', experimentRouter)

  return app
}

export { createServer }
