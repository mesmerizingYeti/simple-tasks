const { Task } = require('../models')

const authCheck = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    req.redirect('/')
  }
}

module.exports = app => {

  // GET ALL Tasks for User
  app.get('/tasks', authCheck, (req, res) => {
    Task.find()
      .then((tasks) => req.json(tasks))
      .catch(e => console.log(e))
  })

  // GET ONE Task
  app.get('/tasks/:id', authCheck, (req, res) => {
    Task.find({ _id: req.params.id })
      .then((task) => req.json(task))
      .catch(e => console.log(e))
  })

  // POST ONE Task
  app.post('/tasks', authCheck, (req, res) => {
    Task.create(req.body)
      .then((task) => req.json(task))
      .catch(e => console.log(e))
  })

  // UPDATE ONE Task
  app.put('/tasks', authCheck, (req, res) => {
    Task.updateOne({ _id: req.body._id }, req.body )
      .then(() => res.sendStatus(200))
      .catch(e => console.log(e))
  })

  // DELETE ONE Task
  app.delete('/tasks/:id', authCheck, (req, res) => {
    Task.deleteOne({ _id: req.params.id })
      .then(() => res.sendStatus(200))
      .catch(e => console.log(e))
  })

}