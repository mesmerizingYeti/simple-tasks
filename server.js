require('./config')
require('dotenv').config()
const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { Strategy } = require('passport-local')
const { Strategy:JWTStrategy, ExtractJWT } = require('passport-jwt')
const { Strategy:GoogleStrategy } = require('passport-google-oauth20')
const PORT = process.env.PORT || 3001

const app = express()
const { User } = require('./models')

app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(passport.initial())
// app.use(passport.session())

// passport.use(new Strategy(User.authenticate()))
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

// passport.use(new JWTStrategy({
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.SECRET}, ({id}, cb) => User.findById(id)
// .then(user => cb(null, user))
// .catch(e => cb(e))))

require('./routes')(app)

require('mongoose').connection.once('open', () => app.listen(PORT))