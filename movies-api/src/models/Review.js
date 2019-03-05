import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const reviewSchema = new Schema({
  movieId: {
    type: ObjectId,
    ref: 'Movie',
    required: true
  },
  comment: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 4000
  },
  author: {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255
    },
    email: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 254,
      validate: [
        email => /^\S+@\S+$/.test(email),
        '{PATH} must be a valid email address.'
      ]
    }
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
}, {
  timestamps: true
})

const Movie = mongoose.model('Review', reviewSchema)

export default Movie
