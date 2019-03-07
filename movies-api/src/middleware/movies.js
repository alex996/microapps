import express from 'express'
import { Movie } from '../models'
import { BadRequest } from '../errors'
import { objectId, abortIf } from './utils'

const router = express.Router()

export const MOVIE_NOT_FOUND = 'Movie not found.'

router.route('/movies')
  .get(async (req, res, next) => {
    const { limit = 10, page = 1 } = req.query

    // TODO: check for integer values, cast to int
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
  .get(objectId, async (req, res) => {
    const movie = await Movie.findById(req.params.movieId)

    abortIf(!movie, 404, MOVIE_NOT_FOUND)

    res.send(movie)
  })
  .put(objectId, async (req, res) => {
    const { movieId: _id } = req.params
    const { upserted } = await Movie
      .replaceOne(
        { _id }, Movie.filterOut(req.body), { upsert: true, runValidators: true }
      )

    res.status(upserted ? 201 : 200).send(
      await Movie.findById(_id).select('-__v')
    )
  })
  .patch(objectId, async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(
      req.params.movieId, Movie.filterOut(req.body), { runValidators: true, new: true }
    ).select('-__v')

    abortIf(!movie, 404, MOVIE_NOT_FOUND)

    res.json(movie)
  })
  .delete(objectId, async ({ params: { movieId: _id } }, res) => {
    const { deletedCount } = await Movie.deleteOne({ _id })

    abortIf(!deletedCount, 404, MOVIE_NOT_FOUND)

    res.sendStatus(204)
  })

export default router
