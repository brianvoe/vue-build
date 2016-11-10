#!/usr/bin/env node

/* eslint-env node */

var Webpack = require('webpack')

var WebpackDevServer = require(process.cwd() + '/node_modules/webpack-dev-server/lib/Server.js')
var webpackConfig = require('./scripts/webpack.dev.config.js')

var compiler = Webpack(webpackConfig)
var server = new WebpackDevServer(compiler, Object.assign({}, {
  // Content base sets the base path of where you wan to serve your files
  stats: {
    colors: true
  },
  setup: function (app) {
    app.use(function (req, res, next) {
      console.log('Using middleware for ' + req.url)
      next()
    })

    // Here you can access the Express app object and add your own custom middleware to it.
    // For example, to define custom handlers for some paths:
    // app.get('/some/path', function(req, res) {
    //   res.json({ custom: 'response' });
    // });
  }
}, webpackConfig.devServer))

server.listen(1234, 'localhost', function () {
  console.log('Starting server on http://localhost:1234')
})
