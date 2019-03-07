import express from 'express'
import { Movie, Review } from '../models'
import { objectId, abortIf } from './utils'
import { MOVIE_NOT_FOUND } from './movies'

const router = express.Router()

const REVIEW_NOT_FOUND = 'Review Not Found'

const resolveMovie = async (req, res, next) => {
  abortIf(!await Movie.exists({ _id: req.params.movieId }), 404, MOVIE_NOT_FOUND)

  next()
}

router.route('/movies/:movieId/reviews')
  .get(objectId, resolveMovie, async ({ params: { movieId } }, res) => {
    const reviews = await Review
      .where({ movieId })
      .find({})
      .select('-__v') // TODO: paginate

    res.send(reviews)
  })
  .post(objectId, resolveMovie, async (req, res) => {
    const { movieId } = req.params

    const review = await Review.create({
      ...Review.filterOut(req.body),
      movieId
    })

    res.send(review)
  })

router.route('/movies/:movieId/reviews/:reviewId')
  .get(objectId, resolveMovie, async (req, res) => {
    const review = await Review.findById(req.params.reviewId).select('-__v')

    abortIf(!review, 404, REVIEW_NOT_FOUND)

    res.send(review)
  })
  .put(objectId, resolveMovie, async (req, res) => {
    const { movieId, reviewId: _id } = req.params
    const { upserted } = await Review
      .replaceOne(
        { _id },
        {
          movieId,
          ...Review.filterOut(req.body)
        },
        { upsert: true, runValidators: true }
      )

    res.status(upserted ? 201 : 200).send(
      await Review.findById(_id).select('-__v')
    )
  })
  .patch(objectId, resolveMovie, async (req, res) => {
    const review = await Review.findByIdAndUpdate(
      req.params.reviewId, Review.filterOut(req.body), { runValidators: true, new: true }
    ).select('-__v')

    abortIf(!review, 404, REVIEW_NOT_FOUND)

    res.json(review)
  })
  .delete(objectId, resolveMovie, async ({ params: { reviewId: _id } }, res) => {
    const { deletedCount } = await Review.deleteOne({ _id })

    abortIf(!deletedCount, 404, REVIEW_NOT_FOUND)

    res.sendStatus(204)
  })

export default router
