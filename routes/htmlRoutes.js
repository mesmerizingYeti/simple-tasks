const { join } = require('path')

module.exports = app => {

  app.get('*', (req, res) => {
    console.log(req.headers.referer)
    res.send(join(__dirname, "client", "build"))
  })
  
}