import express from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

const {
  PORT = 3000
} = process.env

const app = express()

app.use(passport.initialize())

app.use(passport.session())

passport.use(new LocalStrategy(
  (username, password, done) => {

  }
))

app.get('/', (req, res) => {
  res.json({})
})

app.route('/login')
  .post(
    passport.authenticate('local'),
    (req, res) => {
      console.log(req.user)
    }
  )

app.get('/dashboard', (req, res) => {
  res.send('<h1>Dashboard</h1>')
})

app.use((req, res, next) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('<h1>500 Internal Server Erro</h1>')
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
