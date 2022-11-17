import { Request, Router } from 'express'
import { Participant, ParticipantValidator } from '../../types/Participant'
import { getAuthorizationToken } from '../../utils'
import { getQuestStatus } from '../quests/helpers/getQuestStatus'
import { getRewardEligibility } from '../rewards/helpers/getRewardEligibility'
import { isRewardClaimed } from '../rewards/helpers/isRewardClaimed'
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
    const user = await getLineUserFromRequest(req)
    const isRegistered = user ? await isParticipantRegistered(user?.userId) : false

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

    const questStatus = await getQuestStatus(userRecord.id)
    const eligibleForReward = await getRewardEligibility(questStatus)
    const isClaimed = await isRewardClaimed(userRecord.id)

    return res.status(200).json({
      success: true,
      payload: {
        name: `${userRecord.firstName} ${userRecord.lastName}`,
        language: userRecord.language,
        profileImage: userRecord.linePicture,
        isRewardEligible: eligibleForReward,
        isRewardClaimed: isClaimed,
        quests: questStatus,
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
