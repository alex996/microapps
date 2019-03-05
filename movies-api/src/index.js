import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import { APP_PORT, LOG_FORMAT, DB_URI, DB_OPTIONS } from './config'
import { movies, reviews, notFound, errorHandler } from './middleware'

(async () => {
  try {
    await mongoose.connect(DB_URI, DB_OPTIONS)

    const app = express()

    app.disable('x-powered-by')

    app.use(cors())

    app.use(express.json())

    app.use(morgan(LOG_FORMAT))

    app.use(movies)

    app.use(reviews)

    app.use(notFound)

    app.use(errorHandler)

    app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`))
  } catch (e) {
    console.error(e)
  }
})()
