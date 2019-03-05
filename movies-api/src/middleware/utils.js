import mongoose from 'mongoose'
import capitalize from 'lodash/capitalize'
import { BadRequest, NotFound } from '../errors'

export const objectId = (req, res, next) => {
  Object.values(req.params).forEach(id => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequest('Invalid object ID.')
    }
  })

  next()
}

export const resolve = ({
  model: Model, param, variable = 'document'
}) => async (req, res, next) => {
  const document = await Model.findById(req.params[param]).select('-__v')

  if (!document) {
    throw new NotFound(`${capitalize(variable)} does not exist.`)
  }

  res.locals[variable] = document

  next()
}
