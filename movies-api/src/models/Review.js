import mongoose, { Schema } from 'mongoose'

const reviewSchema = new Schema({
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
        email => /^\S+@\S+$/,
        '{PATH} must be a valid email address.'
      ]
    }
  },
  rating: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 5
  }
}, {
  timestamps: true
})

const Movie = mongoose.model('Review', reviewSchema)

export default Movie
