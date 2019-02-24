import express from 'express'
import mongoose from 'mongoose'
import { APP_PORT, DB_URI, DB_OPTIONS } from './config'
import { movies, notFound, errorHandler } from './middleware'

(async () => {
  try {
    await mongoose.connect(DB_URI, DB_OPTIONS)

    const app = express()

    app.disable('x-powered-by')

    app.use(express.json())

    app.use(movies)

    app.use(notFound)

    app.use(errorHandler)

    app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`))
  } catch (e) {
    console.error(e)
  }
})()
