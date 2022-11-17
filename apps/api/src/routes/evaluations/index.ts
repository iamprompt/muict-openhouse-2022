import { Router } from 'express'
import { getAuthorizationToken } from '../../utils'
import isEvaluated from './helpers/isEvaluated'
import submitEvaluation from './helpers/submitEvaluation'

const router = Router()

router.get('/', (_req, res) => {
  res.status(204).json({
    message: 'This evaluation endpoint is working!',
  })
})

router.post('/', async (req, res) => {
  try {
    const { data, token } = req.body

    const p = await submitEvaluation(data, token)

    res.status(200).json({
      success: true,
      payload: p,
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

router.get('/isEvaluated', async (req, res) => {
  try {
    const token = getAuthorizationToken(req)

    const isEvaluatedValue = await isEvaluated(token)

    res.status(200).json({
      success: true,
      payload: {
        isEvaluated: isEvaluatedValue,
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

export { router as evaluationsRouter }
