import express from 'express'

const router = express.Router()

router.use((req, res, next) => {
  res.status(404).json({
    message: 'Not Found'
  })
})

router.use((err, req, res, next) => {
  const {
    status = 500,
    message = 'Internal Server Error'
  } = err

  status === 500 && console.error(err)
  res.status(status).json(message)
})

export default router
