import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const movieSchema = new Schema('Movie', {
  title: String,
  year: Number,
  reviews: [{
    type: ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
