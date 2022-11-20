import { Router } from 'express'
import { getParticipants } from './helpers/getParticipants'
import { groupParticipantsByDate } from './helpers/groupParticipantsByDate'

const router = Router()

router.get('/', (_req, res) => {
  res.status(204).json({
    message: 'This stats endpoint is working!',
  })
})

router.get('/total', async (_req, res) => {
  try {
    const participants = await getParticipants()
    const participantsByDate = groupParticipantsByDate(participants)

    const totalParticipants = Object.keys(participantsByDate).reduce((acc, date) => {
      return acc + participantsByDate[date].length
    }, 0)

    const totalParticipantsByDate = Object.keys(participantsByDate).reduce((acc, date) => {
      acc[date] = participantsByDate[date].length
      return acc
    }, {})

    return res.status(200).json({
      success: true,
      payload: { total: totalParticipants, dates: totalParticipantsByDate, timestamp: new Date().toISOString() },
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      payload: {
        message: error.message,
      },
    })
  }
})

router.get('/types', async (_req, res) => {
  try {
    const participants = await getParticipants()

    return res.status(200).json({
      success: true,
      payload: { participants, timestamp: new Date().toISOString() },
    })
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      payload: {
        message: error.message,
      },
    })
  }
})

export { router as statsRouter }
