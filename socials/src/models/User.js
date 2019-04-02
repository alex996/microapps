import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 50,
    trim: true
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
    validate: [
      password => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password),
      'Password must contain one lowercase letter, one uppercase letter, and one number.'
    ]
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User
