const { model, Schema } = require('mongoose')

const User = require('./User.js')(model, Schema)
const Task = require('./Task.js')(model, Schema)

module.exports = { User, Task }