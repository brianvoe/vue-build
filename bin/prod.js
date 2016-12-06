#!/usr/bin/env node

/* eslint-env node */

module.exports = function (yargs) {
  var webpack = require('webpack')
  var config = require('./config/webpack.prod.config.js')

  // Set default environment
  process.env.NODE_ENV = 'production'
  process.env.ENVIRONMENT = 'production'

  // Run webpack
  webpack(config, function (err, stats) {
    if (err) { throw err }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
  })
}
