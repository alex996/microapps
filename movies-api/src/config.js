export const {
  APP_PORT = 3000,

  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'cinema',
  DB_USERNAME = 'admin',
  DB_PASSWORD = 'secret'
} = process.env

export const DB_URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

export const DB_OPTIONS = { useNewUrlParser: true }
