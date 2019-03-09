import { abortIf } from './utils'

export const paginate = (req, res, next) => {
  let { limit = 10, page = 1 } = req.query
  limit = +limit
  page = +page

  abortIf(!Number.isInteger(limit), 400, 'Invalid limit value.')

  abortIf(!Number.isInteger(page), 400, 'Invalid page value.')

  abortIf(limit < 1 || limit > 100, 400, 'Limit must be between 1 and 100.')

  abortIf(page < 1, 400, 'Page number must start at 1.')

  res.locals.limit = limit
  res.locals.page = page

  res.paginate = paginateResults

  next()
}

function paginateResults (data, total) {
  const { locals: { limit, page }, req } = this

  const pages = Math.ceil(total / limit)
  const hasMore = page < pages
  const hasLess = page > 1 && page <= pages

  const next = hasMore ? `${req.path}?limit=${limit}&page=${page + 1}` : ''
  const prev = hasLess ? `${req.path}?limit=${limit}&page=${page - 1}` : ''

  this.json({
    data, total, count: data.length, next, prev
  })
}
