import express, { json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'

// Import Routes
import { webhookRouter } from './routes/webhook'
import { statsRouter } from './routes/stats'
import { usersRouter } from './routes/users'
import { evaluationsRouter } from './routes/evaluations'
import { rewardsRouter } from './routes/rewards'
import { questsRouter } from './routes/quests'

const createServer = () => {
  const app = express()
  app.disable('x-powered-by')

  // Middleware
  app.use(morgan('dev'))
  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(cors())

  app.use('/api/webhook', webhookRouter)
  app.use('/api/stats', statsRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/evaluations', evaluationsRouter)
  app.use('/api/rewards', rewardsRouter)
  app.use('/api/quests', questsRouter)

  return app
}

export { createServer }
