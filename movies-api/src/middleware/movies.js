import express from 'express'
import { Movie } from '../models'
import { BadRequest, NotFound } from '../errors'
import { objectId, resolve } from './utils'

const router = express.Router()

const fillable = body => (
  ({ title, genre, minutes, year }) => ({ title, genre, minutes, year })
)(body)

const resolveMovie = resolve({
  model: Movie, param: 'movieId', variable: 'movie'
})

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
  .get(objectId, resolveMovie, (req, res) => {
    res.send(res.locals.movie)
  })
  .put(objectId, async (req, res) => {
    const { movieId: _id } = req.params
    const { upserted } = await Movie
      .replaceOne({ _id }, fillable(req.body), { upsert: true })
      .select('-__v')

    res.status(upserted ? 201 : 200).send(
      await Movie.findById(_id).select('-__v')
    )
  })
  .patch(objectId, resolveMovie, async (req, res) => {
    const { movie } = res.locals

    movie.fill(fillable(req.body))
    await movie.save()

    res.json(movie)
  })
  .delete(objectId, async ({ params: { movieId: _id } }, res) => {
    const { deletedCount } = await Movie.deleteOne({ _id })

    if (!deletedCount) {
      throw new NotFound('Movie does not exist.')
    }

    res.sendStatus(204)
  })

export default router
