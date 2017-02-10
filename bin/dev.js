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
  var projectRoot = process.cwd()
  var Webpack = require('webpack')
  var chalk = require('chalk')
  var fs = require('fs')
  var WebpackDevServer = require('webpack-dev-server')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var ProgressBarPlugin = require('progress-bar-webpack-plugin')
  var firstRun = true

  // Check environment if yargs is passed set environment
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  process.env.ENVIRONMENT = process.env.ENVIRONMENT || 'development'
  if (yargs.environment) {
    process.env.ENVIRONMENT = yargs.environment
  }

  // Set port in order of importance - fallback is 8080
  var port = process.env.PORT = process.env.E2E_PORT || yargs.port || process.env.PORT || 8080

  // Overwrite devtool
  var devtool = yargs.devtool || false
  if (devtool) { webpackConfig.devtool = devtool }

  // Check if there is a server.js file in the test folder
  var pathToServer = projectRoot + '/test/server.js'
  try {
    fs.statSync(pathToServer)
  } catch (err) { pathToServer = false }

  // Load webpack config file
  var webpackConfig = require('./config/webpack.dev.config.js')

  // Add progress bar to webpack config
  webpackConfig.plugins.push(new ProgressBarPlugin({
    format: 'Building [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
    callback: function () {
      if (process.env.ENVIRONMENT !== 'production' && firstRun) {
        console.log(chalk.blue('Dev server started'))
        console.log(chalk.blue('http://localhost:' + port + '.....PID:' + process.pid))
        firstRun = false // only show dev server started once
      }
    }
  }))

  var compiler = Webpack(webpackConfig)
  var server = new WebpackDevServer(compiler, {
    contentBase: projectRoot + '/dist/',
    publicPath: webpackConfig.output.publicPath || '/',
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'warning',
    quiet: true,
    noInfo: true,
    stats: {
      colors: true
    },
    // express server setup extension
    setup: function (app) {
      app.use(function (req, res, next) {
        if (process.env.ENVIRONMENT === 'development') {
          console.log('Using middleware for ' + req.url)
        }
        next()
      })

      // Add webpack hot middleware to use for error overlay
      // Quiet is set to true because well let WebpackDevServer handle console logging
      app.use(webpackHotMiddleware(compiler))

      // If there is a server.js file load it and pass app to it
      if (pathToServer) {
        require(pathToServer)(app)
      }
    }
  })

  var serverListen = server.listen(port, 'localhost', function () {})

  return {
    compiler: compiler,
    server: serverListen
  }
}
