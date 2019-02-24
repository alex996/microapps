import mongoose, { Schema } from 'mongoose'

const reviewSchema = new Schema({
  comment: String,
  author: {
    name: String,
    email: String
  },
  stars: Number
}, {
  timestamps: true
})

const Movie = mongoose.model('Review', reviewSchema)

export default Movie
