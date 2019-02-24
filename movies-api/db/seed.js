import mongoose from 'mongoose'
import { DB_URI } from '../src/config'
import { Movie } from '../src/models'
import movies from './movies.json'

(async () => {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(DB_URI, { useNewUrlParser: true })

    console.log('Clearing movies collection...')
    await Movie.deleteMany({})

    console.log('Batch insterting movies...')
    await Movie.insertMany(movies)

    console.log(`Done! Inserted ${movies.length} documents.`)
  } catch (e) {
    console.error(e)
  } finally {
    mongoose.connection.close()
  }
})()
