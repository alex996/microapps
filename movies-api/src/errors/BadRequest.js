export default class BadRequest extends Error {
  constructor (message = 'Bad Request') {
    super()
    this.message = message
    this.status = 400
  }
}
