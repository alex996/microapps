import mongoose from 'mongoose'
import { BadRequest, NotFound } from '../errors'

export const objectId = (req, res, next) => {
  Object.values(req.params).forEach(id => {
    abortIf(!mongoose.Types.ObjectId.isValid(id), 400, 'Invalid object ID.')
  })

  next()
}

export const abortIf = (condition, status, message) => {
  if (condition) {
    switch (status) {
      case 404:
        throw new NotFound(message)
      case 400:
      default:
        throw new BadRequest(message)
    }
  }
}
