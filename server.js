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

// setup routes
require('./routes')(app)

require('mongoose')
  .connection
  .once('open', () => app.listen(PORT))