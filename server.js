require('dotenv').config()
require('./config').config()
const express = require('express')
const { join } = require('path')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')
const PORT = process.env.PORT || 3001

const app = express()

// middleware
app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// setup cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET]
  })
)

// setup cookie parser
app.use(cookieParser())

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

<<<<<<< HEAD
passport.use(new Strategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({id}, cb) => 
  User.findById(id)
    .then(user => cb(null, user))
    .catch(e => cb(e))
))

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, cb) => {
  User.findOne({ _id: profile.id })
    .then(currentUser => {
      if (currentUser) {
        cb(null, currentUser)
      } else {
        console.log('ID: ' + profile.id)
        console.log('Email: ' + profile.email)
        cb (null, { _id: profile.id, email: profile.email })
      }
    })
}))
=======
// setup cors
app.use(
  cors({
    // allow server to accept requests from different origin
    origin: "http://localhost:3000", 
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    // allow session cookie from browser to pass through
    credentials: true
  })
)
>>>>>>> d19da573ff5db8c664f5aadc3b8e5636255b5f14

// setup routes
require('./routes')(app)

require('mongoose')
  .connection
  .once('open', () => app.listen(PORT))