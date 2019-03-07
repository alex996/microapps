import mongoose, { Schema } from 'mongoose'
import get from 'lodash/get'

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

reviewSchema.statics.fillable = [
  'comment', 'author.name', 'author.email', 'rating'
]

reviewSchema.statics.filterOut = function (payload) {
  return pickDeep(payload, this.fillable)
}

const pickDeep = (object, paths) => (
  paths.reduce((whitelist, field) => {
    const [key, subkey] = field.split('.')
    const value = subkey ? get(object, field) : object[key]

    if (value !== undefined) {
      whitelist[key] = subkey
        ? {
          ...whitelist[key],
          [subkey]: value
        }
        : value
    }

    return whitelist
  }, {})
)

const Movie = mongoose.model('Review', reviewSchema)

export default Movie
