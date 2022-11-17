import { Router } from 'express'
import { BASE_URL } from '../../const/config'
import { LINEClient } from '../../libs/line'
import QuestLog, { QuestLogStatus } from '../../models/questlog.model'
import { getQuestStatus } from '../quests/helpers/getQuestStatus'
import { getLineUserFromRequest } from '../users/helpers/getLineUserFromRequest'
import { getUserRecordFromLineUId } from '../users/helpers/getUserRecordFromLineUId'
import { getRewardEligibility } from './helpers/getRewardEligibility'
import { isRewardClaimed } from './helpers/isRewardClaimed'

const router = Router()

router.get('/', (_req, res) => {
  res.status(204).json({
    message: 'This rewards endpoint is working!',
  })
})

router.get('/isEligible', async (req, res) => {
  try {
    const user = await getLineUserFromRequest(req)
    const userRecord = await getUserRecordFromLineUId(user.userId)

    const questStatus = await getQuestStatus(userRecord.id)
    const eligibleForReward = await getRewardEligibility(questStatus)
    const isClaimed = await isRewardClaimed(userRecord.id)

    res.status(200).json({
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      payload: {
        message: error.message,
      },
    })
  }
})

router.get('/claim', async (req, res) => {
  try {
    const user = await getLineUserFromRequest(req)
    const userRecord = await getUserRecordFromLineUId(user.userId)

    if (!userRecord) {
      throw new Error('Participant not found')
    }

    const questStatus = await getQuestStatus(userRecord.id)
    const eligibleForReward = await getRewardEligibility(questStatus)
    const isClaimed = await isRewardClaimed(userRecord.id)

    if (!eligibleForReward || isClaimed) {
      return res.status(400).json({
        success: true,
        payload: {
          isEligible: false,
          isClaimed,
        },
      })
    }

    await QuestLog.create({
      participant: userRecord.id,
      questNo: 0,
      status: QuestLogStatus.REWARD_CLAIM,
    })

    // Unlink Rich Menu
    await LINEClient.unlinkRichMenuFromUser(user.userId)

    // Send some message
    await LINEClient.pushMessage(user.userId, [
      {
        type: 'imagemap',
        baseUrl: `${BASE_URL}/static/line/images/op-thankyou`,
        altText: 'Thank you for joining the event!',
        baseSize: {
          width: 1040,
          height: 1749.65,
        },
        actions: [],
      },
      {
        type: 'text',
        text: 'ติดตามพวกเราได้ที่\n\nFacebook: fb.com/ict.mahidol.university\nInstagram: instagram.com/ict_mahidol\nTwitter: twitter.com/ict_mahidol\nYouTube: youtube.com/ICTMahidol\nWebsite: ict.mahidol.ac.th\n',
      },
    ])

    return res.status(200).json({
      success: true,
      payload: {
        message: 'Reward claimed',
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      payload: {
        message: error.message,
      },
    })
  }
})

export { router as rewardsRouter }
