import express from 'express'
import mongoose from 'mongoose'
import { APP_PORT, DB_URI } from './config'
import { movies, errors } from './middleware'

(async () => {
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true })

    const app = express()

    app.use(express.urlencoded({ extended: true }))

    app.use(movies)

    app.use(errors)

    app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`))
  } catch (e) {
    console.error(e)
  }
})()
