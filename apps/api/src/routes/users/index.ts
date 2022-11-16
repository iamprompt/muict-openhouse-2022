import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.status(204).json({
    message: 'This users endpoint is working!',
  })
})

export { router as usersRouter }
