export const {
  APP_PORT = 3000,

  NODE_ENV = 'development',

  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'cinema',
  DB_USERNAME = 'admin',
  DB_PASSWORD = 'secret'
} = process.env

export const IN_PROD = NODE_ENV === 'production'

export const DB_URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

export const DB_OPTIONS = { useNewUrlParser: true }

export const LOG_FORMAT = IN_PROD ? 'combined' : 'dev'
