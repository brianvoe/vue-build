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
  }
}

// dev command function
exports.handler = function (yargs) {
  var projectRoot = process.cwd()
  var Webpack = require('webpack')
  var fs = require('fs')
  var WebpackDevServer = require('webpack-dev-server')
  var webpackHotMiddleware = require('webpack-hot-middleware')

  // Check environment if yargs is passed set environment
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  process.env.ENVIRONMENT = process.env.ENVIRONMENT || 'development'
  if (yargs.environment) {
    process.env.ENVIRONMENT = yargs.environment
  }

  // Set port in order of importance - fallback is 8080
  var port = process.env.PORT = process.env.E2E_PORT || yargs.port || process.env.PORT || 8080

  // LEAVE IT HERE - it was moved here because we need to set process.env stuff first
  var webpackConfig = require('./config/webpack.dev.config.js')

  // Overwrite devtool
  var devtool = yargs.devtool || false
  if (devtool) { webpackConfig.devtool = devtool }

  // Check if there is a server.js file in the test folder
  var pathToServer = projectRoot + '/test/server.js'
  try {
    fs.statSync(pathToServer)
  } catch (err) { pathToServer = false }

  var compiler = Webpack(webpackConfig)
  var webpackDevServerConfig = {
    publicPath: webpackConfig.output.publicPath || '/',
    contentBase: projectRoot + '/src/public', // Add the public folder as a means to search static content
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'warning',
    quiet: true,
    noInfo: true,
    stats: {
      colors: true
    },
    // express server setup extension
    before: function (appServer) {
      appServer.use(function (req, res, next) {
        if (process.env.ENVIRONMENT === 'development') {
          // Lets not console log for status polling or webpack hot module reloading
          if (
            !req.url.includes('/status') &&
            !req.url.includes('/__webpack_hmr')
          ) {
            console.log('Using middleware for ' + req.url)
          }
        }
        next()
      })

      // Add webpack hot middleware to use for error overlay
      // Quiet is set to true because well let WebpackDevServer handle console logging
      appServer.use(webpackHotMiddleware(compiler))

      // If there is a server.js file load it and pass appServer to it
      if (pathToServer) {
        require(pathToServer)(appServer)
      }
    }
  }
  if (webpackConfig.devServer) {
    webpackDevServerConfig = Object.assign(webpackDevServerConfig, webpackConfig.devServer)
  }
  var server = new WebpackDevServer(compiler, webpackDevServerConfig)

  var serverListen = server.listen(port)

  return {
    compiler: compiler,
    server: serverListen
  }
}
