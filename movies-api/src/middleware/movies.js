import express from 'express'
import { Movie } from '../models'
import { BadRequest, NotFound } from '../errors'

const router = express.Router()

/*
  TODO: validate query, max limit/page + sorting via middleware
  get(paginate, sort(Movie.sortableFeilds), (req, res) => {}
*/

router.route('/movies')
  .get(async (req, res) => {
    const { limit = 10, page = 1 } = req.query

    if (limit > 100) {
      throw new BadRequest('Limit cannot exceed 100.')
    }

    const [data, total] = await Promise.all([
      Movie
        .find({})
        .limit(+limit)
        .skip((page - 1) * limit)
        .sort({ 'title': 'asc' })
        .lean(),
      Movie.countDocuments()
    ])

    const pages = Math.ceil(total / limit)
    const hasMore = page < pages
    const hasLess = page > 1 && hasMore

    res.json({
      data,
      total,
      count: data.length,
      next: hasMore ? `/movies?limit=${limit}&page=${+page + 1}` : '',
      prev: hasLess ? `/movies?limit=${limit}&page=${page - 1}` : ''
    })
  })
  .post(async (req, res) => {
    const { title, genre, minutes, year } = req.body
    const movie = await Movie.create({ title, genre, minutes, year })
    res.status(201).json(movie)
  })

router.route('/movies/:movieId')
  .get(async (req, res) => {
    // TODO: validate object ID (middleware?)
    const movie = await Movie.findById(req.params.movieId)

    if (!movie) {
      throw new NotFound('Movie does not exist.')
    }

    res.send(movie)
  })
  .put(async (req, res) => {

  })
  .patch(async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.movieId)
    res.json(movie)
  })
  .delete(async (req, res) => {
    const id = req.params.movieId
    await Movie.findByIdAndDelete(id)
    res.json({ id })
  })

export default router
