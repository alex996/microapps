export const notFound = (req, res, next) => {
  res.status(404).json({
    message: 'Not Found'
  })
}

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  status === 500 && console.error(err)
  res.status(status || 500).json({ message })
}
