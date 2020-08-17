module.exports = app => {
  require('./htmlRoutes')(app)
  require('./userRoutes')(app)
  require('./taskRoutes')(app)
  require('./authRoutes')(app)
}