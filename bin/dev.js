#!/usr/bin/env node

/* eslint-env node */

// Sub options for dev command
exports.builder = {
  e: {
    alias: 'environment',
    type: 'string',
    choices: ['development', 'testing', 'production'],
    describe: 'environment setting'
  },
  p: {
    alias: 'port',
    type: 'number',
    describe: 'server port to listen on'
  },
  dt: {
    alias: 'devtool',
    type: 'string',
    describe: 'webpack performance build'
  },
  sr: {
    alias: 'single-run',
    default: true,
    type: 'boolean',
    describe: 'testing single run'
  }
}

// dev command function
exports.handler = function (yargs) {
  var Webpack = require('webpack')
  var WebpackDevServer = require(process.cwd() + '/node_modules/webpack-dev-server/lib/Server.js')
  var webpackConfig = require('./config/webpack.dev.config.js')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var chalk = require('chalk')

  // Set port in order of importance - fallback is 8080
  var port = process.env.E2E_PORT || yargs.port || process.env.PORT || webpackConfig.devServer.port || 8080

  // Overwrite devtool
  var devtool = yargs.devtool || false
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
    if (process.env.ENVIRONMENT !== 'production') {
      console.log() // Add spacing
      console.log(chalk.blue('Dev server started'))
      console.log(chalk.blue('http://localhost:' + port + '.....PID:' + process.pid))
    }
  })
}
