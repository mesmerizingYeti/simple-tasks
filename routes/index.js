module.exports = app => {
  require('./authRoutes')(app)
  require('./userRoutes')(app)
  require('./taskRoutes')(app)
  require('./htmlRoutes')(app)
}