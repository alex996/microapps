import express from 'express'
import mongoose from 'mongoose'
import { APP_PORT, DB_URI } from './config'
import { notFound, errorHandler } from './middleware'
import { Movie } from './models'

(async () => {
  await mongoose.connect(DB_URI)

  const app = express()

  app.use(express.urlencoded({ extended: true }))

  app.route('/movies')
    .get(async (req, res) => {
      const movies = await Movie.find({})
      res.json(movies)
    })
    .post(async (req, res) => {
      const movie = await Movie.create(req.body)
      res.json(movie)
    })

  app.route('/movies/:id')
    .put(async (req, res) => {

    })
    .patch(async ({ id }, res) => {
      const movie = await Movie.findByIdAndUpdate(id)
      res.json(movie)
    })
    .delete(async ({ id }, res) => {
      await Movie.findByIdAndDelete(id)
      res.json({ id })
    })

  app.route('/movies/:movieId')

  app.use(notFound)

  app.use(errorHandler)

  app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`))
})()
