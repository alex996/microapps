import { NotFound } from '../errors'

export const notFound = (req, res, next) => {
  next(new NotFound())
}

export const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  })
}
