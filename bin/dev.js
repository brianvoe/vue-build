#!/usr/bin/env node

/* eslint-env node */

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

function dev () {
  var config = require('./scripts/webpack.config.js')
  config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/')
  var compiler = webpack(config)
  var server = new WebpackDevServer(compiler)
  server.listen(8080)
  console.error('Now running dev server')
}
dev()
