import express, { json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'

const createServer = () => {
  const app = express()
  app.disable('x-powered-by')
  app.use(morgan('dev'))
  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(cors())

  app.get('/message/:name', (req, res) => {
    return res.json({ message: `hello ${req.params.name}` })
  })

  app.get('/healthz', (req, res) => {
    return res.json({ ok: true })
  })

  return app
}

export { createServer }
