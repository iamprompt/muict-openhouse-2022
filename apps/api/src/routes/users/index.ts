import { Request, Router } from 'express'
import { Participant, ParticipantValidator } from '../../types/Participant'
import { getAuthorizationToken } from '../../utils'
import { getLineUserFromRequest } from './helpers/getLineUserFromRequest'
import { getUserRecordFromLineUId } from './helpers/getUserRecordFromLineUId'
import isParticipantRegistered from './helpers/isParticipantRegistered'
import registerUser from './helpers/registerUser'

const router = Router()

router.get('/', (_req, res) => {
  res.status(204).json({
    success: true,
    payload: {
      message: 'This users endpoint is working!',
    },
  })
})

router.post('/register', async (req: Request<undefined, any, Participant>, res) => {
  const { body } = req

  try {
    const userRequestData = ParticipantValidator.parse(body)
    const token = getAuthorizationToken(req)
    const isRegistered = await isParticipantRegistered(token)

    if (isRegistered) {
      throw new Error('Participant already registered')
    }

    await registerUser(userRequestData, token)

    res.status(200).json({
      success: true,
      payload: {
        message: 'Participant registered',
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      payload: {
        message: error.message,
      },
    })
  }
})

router.get('/isRegistered', async (req, res) => {
  try {
    const { userId } = await getLineUserFromRequest(req)
    const isRegistered = await isParticipantRegistered(userId)

    res.status(200).json({
      success: true,
      payload: {
        isRegistered,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      payload: {
        message: error.message,
      },
    })
  }
})

router.get('/me', async (req, res) => {
  try {
    const { userId } = await getLineUserFromRequest(req)
    const userRecord = await getUserRecordFromLineUId(userId)

    if (!userRecord) {
      throw new Error('Participant not found')
    }

    res.status(200).json({
      success: true,
      payload: {
        user: userRecord,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      payload: {
        message: error.message,
      },
    })
  }
})

export { router as usersRouter }
