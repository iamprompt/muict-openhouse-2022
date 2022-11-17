import { Router } from 'express'
import { z } from 'zod'
import QuestLog from '../../models/questlog.model'
import { getLineUserFromRequest } from '../users/helpers/getLineUserFromRequest'
import { getUserRecordFromLineUId } from '../users/helpers/getUserRecordFromLineUId'
import { checkAnswer } from './helpers/checkAnswer'
import { getQuestLogFromQuestNo } from './helpers/getQuestLogFromQuestNo'
import { getQuestQuestion } from './helpers/getQuestQuestion'
import { randomArray } from './helpers/random'

const router = Router()

router.get('/', (_req, res) => {
  res.status(204).json({
    message: 'This quests endpoint is working!',
  })
})

router.get('/question', async (req, res) => {
  const { query } = req

  const queryValidator = z.object({
    questNo: z.string(),
    lang: z.literal('en').or(z.literal('th')).optional(),
  })

  const { questNo, lang = 'th' } = queryValidator.parse(query)

  if (!questNo) {
    return res.status(400).json({
      message: 'Missing id',
    })
  }

  const user = await getLineUserFromRequest(req)
  const userRecord = await getUserRecordFromLineUId(user.userId)

  if (!userRecord) {
    throw new Error('Participant not found')
  }

  const questLog = await getQuestLogFromQuestNo(userRecord.id, Number(questNo))

  const questions = await getQuestQuestion(Number(questNo), lang, true)

  const initQuestLog = questLog.find((q) => q.status === 'init')
  const successQuestLog = questLog.find((q) => q.status === 'success')

  // If user has finished the quest, return the success message
  if (successQuestLog) {
    return res.status(200).json({
      success: true,
      payload: {
        status: 'SUCCESS_QUEST',
      },
    })
  }

  // If user has not started the quest yet
  if (!initQuestLog) {
    const randomQuestion = randomArray(questions)

    await QuestLog.create({
      participant: userRecord._id,
      questNo: Number(questNo),
      questionId: randomQuestion.id,
      status: 'init',
    })

    return res.status(200).json({
      success: true,
      payload: {
        status: 'INIT_QUEST',
        question: randomQuestion,
      },
    })
  }

  const question = questions.find((q) => q.id === questLog[0].questionId)
  return res.status(200).json({
    success: true,
    payload: {
      status: 'IN_PROGRESS',
      question,
    },
  })
})

router.post('/submit', async (req, res) => {
  const bodyValidator = z.object({
    questionId: z.string(),
    questNo: z.number(),
    answer: z.string().or(z.array(z.string())),
  })

  const body = bodyValidator.parse(req.body)

  const lineUser = await getLineUserFromRequest(req)
  const userRecord = await getUserRecordFromLineUId(lineUser.userId)

  if (!userRecord) {
    throw new Error('Participant not found')
  }

  if (req.method === 'POST') {
    const questions = await getQuestQuestion(body.questNo, undefined, true, true)

    const question = questions.find((q) => q.id === body.questionId)
    if (!question) {
      return res.status(404).json({
        error: 'Question not found',
      })
    }

    const result = checkAnswer(question.expectedAnswer, body.answer)

    if (result) {
      // Update user's quest progress
      await QuestLog.create({
        participant: userRecord._id,
        questNo: body.questNo,
        questionId: question.id,
        answer: Array.isArray(body.answer) ? body.answer : [body.answer],
        status: 'success',
      })
    } else {
      await QuestLog.create({
        participant: userRecord._id,
        questNo: body.questNo,
        questionId: question.id,
        status: 'incorrect',
      })
    }

    return res.status(200).json({ success: true, payload: { result } })
  }
})

export { router as questsRouter }
