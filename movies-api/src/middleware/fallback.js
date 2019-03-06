import { NotFound } from '../errors'

const getStatusCode = err =>
  err.status
    ? err.status
    : err.name === 'ValidationError'
      ? 422
      : err.name === 'MongoError'
        ? 400
        : 500

export const notFound = (req, res, next) => {
  next(new NotFound())
}

export const errorHandler = (err, req, res, next) => {
  const status = getStatusCode(err)

  status === 500 && console.error(err)

  res.status(status).json({
    message: err.message || 'Internal Server Error'
  })
}
