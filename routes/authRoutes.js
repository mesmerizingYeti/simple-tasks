const { User } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')

module.exports = app => {
 
  // Register a new user with local strategy
  app.post('/auth/register', (req, res) => {
    const { email } = req.body
    User.register(new User({ email }), req.body.password, e => {
      if (e) { console.log(e) }
      res.sendStatus(200)
    })
  })

  // Sign in user with local strategy
  app.post('/auth/local', (req, res) => {
    User.authenticate()(req.body.username, req.body.password, (e, user) => {
      if (e) { console.log(e) }
      if (user) {
        res.json({ token: jwt.sign({ id: user._id }, process.env.SECRET )})
      } else {
        res.json(user)
      }
    })
  })

  // Sign in user with google
  app.post('/auth/google', passport.authenticate('google'))

  // When google sign in is successful, send user info
  app.get('/auth/signin/success', (req, res) => {
    if (req.user) {
      res.json({ 
        success: true,
        message: 'Successfully signed in',
        user: req.user,
        cookies: req.cookies
      })
    }
  })

  // When google sign in fails, send fail message
  app.get('/auth/signin/failure', (req, res) => {
    res.status(401).json({
      success: false,
      message: 'Failed to sign in'
    })
  })

  // When signing out, redirect user to sign in page
  app.get('/auth/signout', (req, res) => {
    req.logout()
    res.redirect('/signin')
  })

  // Redirect to home page after successful google sign in
  app.get('auth/google/redirect', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/signin/failure'
  })) 

}