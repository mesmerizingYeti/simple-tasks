const { join } = require('path')

module.exports = app => {

  app.get('*', (req, res) => {
    console.log(req)
    res.send(join(__dirname, "client", "build"))
  })
  
}