#!/usr/bin/env node

/* eslint-env node */

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var connectHistoryApiFallback = require('connect-history-api-fallback')
var express = require('express')
var config = require('./scripts/webpack.dev.config.js')
var ora = require('ora') // Loading spinner

// Start spinner
var spinner = ora({
  text: 'Building for development...',
  color: 'green'
}).start()

var app = express()
var compiler = webpack(config, function (err, stats) {
  if (err) { throw err }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})

var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = webpackHotMiddleware(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
app.use(connectHistoryApiFallback())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

module.exports = app.listen(1234, function (err) {
  spinner.succeed()
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + 1234
  console.log('Listening at ' + uri + '\n')
})
