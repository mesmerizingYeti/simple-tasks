// const { User } = require('../models')
// const jwt = require('jsonwebtoken')
const passport = require('passport')

module.exports = app => {
 
  // // Register a new user with local strategy
  // app.post('/auth/register', (req, res) => {
  //   const { email } = req.body
  //   User.register(new User({ email }), req.body.password, e => {
  //     if (e) { console.log(e) }
  //     res.sendStatus(200)
  //   })
  // })

  // // Sign in user with local strategy
  // app.post('/auth/local', (req, res) => {
  //   User.authenticate()(req.body.username, req.body.password, (e, user) => {
  //     if (e) { console.log(e) }
  //     if (user) {
  //       res.json({ token: jwt.sign({ id: user._id }, process.env.SECRET )})
  //     } else {
  //       res.json(user)
  //     }
  //   })
  // })

  // check authentication success
  app.get('/auth/authenicated', (req, res) => {
    if (req.user) {
      res.json({
        isAuthenticated: true,
        message: 'User authenticated',
        user: req.user,
        cookies: req.cookies
      })
    } else {
      res.json({
        isAuthenticated: false,
        message: 'User not authenticated',
        user: null,
        cookies: null
      })
    }
  })

  // google login failed
  app.get('/auth/google/failure', (req, res) => {
    res.status(401).json({
      success: false,
      message: 'Google login failed'
    })
  })

  // logout and redirect to login page
  app.get('/auth/logout', (req, res) => {
    // logout with passport
    req.logout()
    res.redirect('/')
  })

  // authenticate user with google
  app.get('/auth/google', 
    passport.authenticate('google', { 
      scope: ['profile', 'email'] 
    })
  )


  // When google sign in fails, send fail message
  app.get('/auth/signin/failure', (req, res) => {
    res.status(401).json({
      success: false,
      message: 'Failed to sign in'
    })
  })


  // google callback url
  app.get('auth/google/redirect', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/home',
    failureRedirect: '/auth/signin/failure'
  })) 

}