import express from 'express'
import { Movie } from '../models'
import { BadRequest, NotFound } from '../errors'
import { objectId } from './validation'

const router = express.Router()

/*
  TODO: validate query, max limit/page + sorting via middleware
  get(paginate, sort(Movie.sortableFeilds), (req, res) => {}
*/

const fillable = body => (
  ({ title, genre, minutes, year }) => ({ title, genre, minutes, year })
)(body)

router.route('/movies')
  .get(async (req, res, next) => {
    const { limit = 10, page = 1 } = req.query

    if (limit < 1 || limit > 100) {
      throw new BadRequest('Limit must be between 1 and 100.')
    } else if (page < 1) {
      throw new BadRequest('Page number must start at 1.')
    }

    const [data, total] = await Promise.all([
      Movie
        .find({})
        .limit(+limit)
        .skip((page - 1) * limit)
        .sort({ 'title': 'asc' })
        .select('-__v')
        .lean(),
      Movie.countDocuments()
    ])

    const pages = Math.ceil(total / limit)
    const hasMore = page < pages
    const hasLess = page > 1 && page <= pages

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
  .get(objectId, async ({ params: { movieId } }, res) => {
    const movie = await Movie.findById(movieId)

    if (!movie) {
      throw new NotFound('Movie does not exist.')
    }

    res.send(res.locals.movie)
  })
  .put(objectId, async (req, res) => {
    const movie = await Movie.findOneAndReplace({ _id: req.params.movieId }, fillable(req.body))

    if (!movie) {
      throw new NotFound('Movie does not exist.')
    }

    res.send(movie)
  })
  .patch(objectId, async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.movieId, fillable(req.body), { runValidators: true })
    res.json(movie)
  })
  .delete(objectId, async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.movieId)

    if (!movie) {
      throw new NotFound('Movie does not exist.')
    }

    res.json(movie)
  })

export default router
