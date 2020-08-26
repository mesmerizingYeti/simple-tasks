const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  app.use(
    ['/auth', '/tasks', '/users'],
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true
    })
  )
}