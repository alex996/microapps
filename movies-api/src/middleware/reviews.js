import express from 'express'
import { NotFound } from '../errors'
import { Movie, Review } from '../models'
import { objectId, resolve } from './utils'

const router = express.Router()

const resolveReview = resolve({
  model: Review, param: 'reviewId', variable: 'review'
})

const fillable = body => (
  ({ comment, author: { name, email }, rating }) => ({ comment, author: { name, email }, rating })
)(body)

router.route('/movies/:movieId/reviews')
  .get(objectId, async (req, res) => {
    const { movieId } = req.params

    if (!await Movie.exists({ _id: movieId })) {
      throw new NotFound('Movie not found.')
    }

    const reviews = await Review.where({ movieId }).find({})

    res.send(reviews)
  })
  .post(async (req, res) => {
    const { movieId } = req.params

    if (!await Movie.exists({ _id: movieId })) {
      throw new NotFound('Movie not found.')
    }

    const review = await Review.create({
      ...fillable(req.body),
      movieId
    })

    res.send(review)
  })

router.route('/movies/:movieId/reviews/:reviewId')
  .get(objectId, resolveReview, (req, res) => {
    res.send(res.locals.review)
  })

export default router
