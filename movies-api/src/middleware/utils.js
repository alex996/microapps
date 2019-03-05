import mongoose from 'mongoose'
import capitalize from 'lodash/capitalize'
import { BadRequest, NotFound } from '../errors'

const getIdParam = req => Object.values(req.params)[0]

export const objectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(getIdParam(req))) {
    throw new BadRequest('Invalid object ID.')
  }

  next()
}

export const resolve = (Model, key = 'document') => async (req, res, next) => {
  const document = await Model.findById(getIdParam(req)).select('-__v')

  if (!document) {
    throw new NotFound(`${capitalize(key)} does not exist.`)
  }

  res.locals[key] = document

  next()
}
