import mongoose, { Schema } from 'mongoose'

const genres = [
  'action', 'adventure', 'comedy', 'thriller', 'crime', 'drama', 'fantasy', 'sci-fi', 'history', 'mystery'
]

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  genre: {
    type: [{
      type: String,
      enum: genres
    }],
    validate: [
      genre => genre.length < 10,
      '{PATH} can only be up to 10 categories'
    ]
  },
  minutes: {
    type: Number,
    min: 1,
    max: 500
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2999
  }
}, {
  timestamps: true
})

movieSchema.statics.fillable = [
  'title', 'genre', 'minutes', 'year'
]

movieSchema.statics.exists = async function (options) {
  return await this.where(options).countDocuments() !== 0
}

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
