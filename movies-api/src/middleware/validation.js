import mongoose from 'mongoose'
import { BadRequest } from '../errors'

const getIdParam = req => Object.values(req.params)[0]

export const objectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(getIdParam(req))) {
    throw new BadRequest('Invalid object ID.')
  }

  next()
}
