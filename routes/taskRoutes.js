const { Task } = require('../models')

module.exports = app => {

  // GET ALL Task
  app.get('/tasks', (req, res) => {
    Task.find()
      .then((tasks) => req.json(tasks))
      .catch(e => console.log(e))
  })

  // GET ONE Task
  app.get('/tasks/:id', (req, res) => {
    Task.find({ _id: req.params.id })
      .then((task) => req.json(task))
      .catch(e => console.log(e))
  })

  // POST ONE Task
  app.post('/tasks', (req, res) => {
    Task.create(req.body)
      .then((task) => req.json(task))
      .catch(e => console.log(e))
  })

  // UPDATE ONE Task
  app.put('/tasks', (req, res) => {
    Task.updateOne({ _id: req.body._id }, req.body )
      .then(() => res.sendStatus(200))
      .catch(e => console.log(e))
  })

  // DELETE ONE Task
  app.delete('/tasks/:id', (req, res) => {
    Task.deleteOne({ _id: req.params.id })
      .then(() => res.sendStatus(200))
      .catch(e => console.log(e))
  })

}