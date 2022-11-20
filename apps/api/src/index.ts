import { scheduleJob } from 'node-schedule'
import { audienceUpload } from './jobs/audienceUpload'
import { dbConnect } from './libs/mongoose'
import { createServer } from './server'

const port = process.env.PORT || 5001

dbConnect()

const server = createServer()

scheduleJob('* * * * *', async () => {
  await audienceUpload()
})

server.listen(port, () => {
  console.log(`API is running on ${port}`)
})
