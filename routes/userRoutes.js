const { User } = require('../models')

module.exports = app => {

  // GET ALL Users
  app.get('/users', (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(e => console.log(e))
  })

  // GET ONE User
  app.get('/users/:id', (req, res) => {
    User.find({ _id: req.params.id })
      .then(user => red.json(user))
      .catch(e => console.log(e))
  })

  // POST ONE User
  app.post('/users', (req, res) => {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(e => console.log(e))
  })

  // UPDATE ONE User
  app.put('/users', (req, res) => {
    User.updateOne({ _id: req.user._id }, req.body )
      .then(() => res.sendStatus(200))
      .catch(e => console.log(e))
  })

  // DELETE ONE User
  app.delete('/users/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.sendStatus(200))
      .catch(e => console.log(e))
  })

}