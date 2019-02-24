import express from 'express'
import { Movie } from '../models'

const router = express.Router()

router.route('/movies')
  .get(async (req, res) => {
    const movies = await Movie.find({})
    res.json(movies)
  })
  .post(async (req, res) => {
    const movie = await Movie.create(req.body)
    res.json(movie)
  })

router.route('/movies/:id')
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

export default router
