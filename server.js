require('./config')
require('dotenv').config()
const express = require('express')
const { join } = require('path')
const cors = require('cors')
const passport = require('passport')
const { Strategy } = require('passport-local')
const { Strategy:JWTStrategy, ExtractJwt } = require('passport-jwt')
const { Strategy:GoogleStrategy } = require('passport-google-oauth20')
const PORT = process.env.PORT || 3001

const app = express()
const { User } = require('./models')

app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

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
  callbackURL: 'http://localhost:3000/auth/google/redirect'
}, (accessToken, refreshToken, profile, cb) => 
  User.findOrCreate({ _id: profile.id })
    .then(user => cb(null, user))
    .catch(e => cb(e))
))

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
)

require('./routes')(app)

require('mongoose').connection.once('open', () => app.listen(PORT))