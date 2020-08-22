const passport = require('passport')
// const { Strategy } = require('passport-local')
// const { Strategy:JWTStrategy, ExtractJwt } = require('passport-jwt')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { User } = require('../models')

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err))
})

passport.use(new GoogleStrategy({
  // options for google strategy
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, cb) => {
  // deconstruct profile data
  const { sub:googleId, name, email } = profile._json
  // try to find user in database
  User.findOne({ googleId })
    .populate('taskList')
    .then(user => {
      // found user
      if (user) {
        cb(null, user)
      } else {
        // otherwise, create new user
        const newUser = {
          googleId, 
          name, 
          email,
          taskList: []
        }
        User.create(newUser)
          .then(user => cb(null, user))
          .catch(err => cb(err))
      }
    })
    .catch(err => cb(err))
}))

// passport.use(new Strategy(User.authenticate()))
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

// passport.use(new JWTStrategy({
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.SECRET
// }, ({id}, cb) => 
//   User.findById(id)
//     .then(user => cb(null, user))
//     .catch(e => cb(e))
// ))