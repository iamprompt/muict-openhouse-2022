import { Router } from 'express'
import Participant from '~/models/participant.model'

const router = Router()

router.get('/', (_req, res) => {
  res.status(204).json({
    message: 'This experiment endpoint is working!',
  })
})

router.get('/saveUser', async (req, res) => {
  const participant = new Participant({
    language: 'en',
    regType: 'line',
    firstName: 'John',
    lastName: 'Doe',
    dob: new Date(),
    email: 'john.doe@gmail.com',
    phone: '1234567890',
    province: 1,
    school: 'School',
    educationLevel: 1,
    policyAgreement: true,
  })

  await participant.save()

  res.status(200).json({
    success: true,
    payload: {
      message: 'Participant saved',
    },
  })
})

export { router as experimentRouter }
