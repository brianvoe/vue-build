#!/usr/bin/env node

/* eslint-env node */

module.exports = function (yargs) {
  var Webpack = require('webpack')
  var WebpackDevServer = require(process.cwd() + '/node_modules/webpack-dev-server/lib/Server.js')
  var webpackConfig = require('./config/webpack.dev.config.js')
  var webpackHotMiddleware = require('webpack-hot-middleware')

  // Set port in order of importance
  var port = process.env.E2E_PORT || yargs.argv.port || process.env.PORT || webpackConfig.devServer.port

  // Overwrite devtool
  var devtool = process.env.DEVTOOL || yargs.argv.devtool || false
  if (devtool) { webpackConfig.devtool = devtool }

  var compiler = Webpack(webpackConfig)
  var server = new WebpackDevServer(compiler, Object.assign({}, {
    stats: {
      colors: true
    },
    setup: function (app) {
      app.use(function (req, res, next) {
        if (process.env.ENVIRONMENT === 'development') {
          console.log('Using middleware for ' + req.url)
        }
        next()
      })

      // Add webpack hot middleware to use for error overlay
      // Quiet is set to true because well let WebpackDevServer handle console logging
      app.use(webpackHotMiddleware(compiler, {
        overlay: true,
        quiet: true
      }))

      // Here you can access the Express app object and add your own custom middleware to it.
      // For example, to define custom handlers for some paths:
      // app.get('/some/path', function(req, res) {
      //   res.json({ custom: 'response' });
      // });
    }
  }, webpackConfig.devServer))

  return server.listen(port, 'localhost', function () {
    if (process.env.ENVIRONMENT === 'development') {
      console.log() // Add spacing
      console.log('Starting dev server on http://localhost:' + port)
    }
  })
}
