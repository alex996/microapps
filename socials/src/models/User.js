import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true,
    validate: [
      username => User.doesntExist({ username }),
      'Username is already taken.'
    ]
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 254,
    lowercase: true,
    trim: true,
    match: [
      /\S+@\S+\.\S+/, 'Email is invalid.'
    ],
    validate: [
      email => User.doesntExist({ email }),
      'Email is already taken.'
    ]
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100,
    match: [
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      'Password must contain one lowercase letter, one uppercase letter, and one number.'
    ]
  }
}, {
  timestamps: true
})

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const User = mongoose.model('User', userSchema)

export default User
