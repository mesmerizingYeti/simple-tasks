module.exports = app => {

  app.get('*', (req, res) => {
    console.log(req.headers.referer)
    res.redirect('/')
  })
  
}