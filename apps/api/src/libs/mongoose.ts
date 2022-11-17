import { config } from 'dotenv'
import mongoose from 'mongoose'

config()

const MONGODB_URI = process.env.MONGODB_URI

export const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  return mongoose.connect(MONGODB_URI, (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  })
}
