const { User } = require('../models')

const authCheck = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    req.redirect('/')
  }
}

module.exports = app => {

  // GET ALL Users
  app.get('/users', authCheck, (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(e => console.log(e))
  })

  // GET ONE User
  app.get('/users/:id', authCheck, (req, res) => {
    User.find({ _id: req.params.id })
      .then(user => red.json(user))
      .catch(e => console.log(e))
  })

  // POST ONE User
  app.post('/users', authCheck, (req, res) => {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(e => console.log(e))
  })

  // UPDATE ONE User
  app.put('/users', authCheck, (req, res) => {
    User.updateOne({ _id: req.body._id }, req.body )
      .then(() => res.sendStatus(200))
      .catch(e => console.log(e))
  })

  // DELETE ONE User
  app.delete('/users/:id', authCheck, (req, res) => {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.sendStatus(200))
      .catch(e => console.log(e))
  })

}