const { User, Task } = require('../models')

const authCheck = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    req.redirect('/')
  }
}

module.exports = app => {

  // GET ONE Task
  app.get('/tasks/single/:id', authCheck, (req, res) => {
    Task.findById(req.params.id)
    .then(task => req.json(task))
    .catch(err => console.log(err))
  })

  // GET ALL Tasks
  app.get('/tasks', authCheck, (req, res) => {
    Task.find()
      .then(tasks => res.json(tasks))
      .catch(err => console.log(err))
  })

  // GET ALL Tasks for User
  app.get('/tasks/user', authCheck, (req, res) => {
    Task.find({ user: req.user._id })
      .then(tasks => res.json(tasks))
      .catch(err => console.log(err))
  })

  // POST ONE Task
  app.post('/tasks', authCheck, (req, res) => {
    // create new task
    Task.create(req.body)
      // add task to user's taskList
      .then(task => {
        User.updateOne({ _id: task.user }, { $push: { taskList: task._id }})
          .catch(err => console.log(err))
        res.json(task)
      })
      .catch(err => console.log(err))
  })

  // UPDATE ONE Task
  app.put('/tasks', authCheck, (req, res) => {
    Task.updateOne({ _id: req.body._id }, req.body )
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err))
  })

  // UPDATE MANY Tasks
  app.put('/tasks/many', authCheck, (req, res) => {
    req.body.forEach((taskData, index, array) => {
      Task.updateOne({ _id: taskData._id }, taskData.value)
        .then(() => {
          if (index === array.length - 1) {
            res.sendStatus(200)
          }
        })
        .catch(err => console.log(err))
    })
  })

  // DELETE ONE Task
  app.delete('/tasks/:id', authCheck, (req, res) => {
    User.updateOne({ _id: req.user._id }, { $pull: { taskList: req.params.id }})
      .then(() => Task.deleteOne({ _id: req.params.id }))
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err))
  })

}