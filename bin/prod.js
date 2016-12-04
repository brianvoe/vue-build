#!/usr/bin/env node

/* eslint-env node */

module.exports = function (yargs) {
  var webpack = require('webpack')
  var config = require('./config/webpack.prod.config.js')
  var ora = require('ora') // Loading spinner

  // Set default environment
  process.env.NODE_ENV = 'production'
  process.env.ENVIRONMENT = 'production'

  // Start spinner
  var spinner = ora({
    text: 'Building for production...',
    color: 'green'
  }).start()

  // Run webpack
  webpack(config, function (err, stats) {
    spinner.succeed()
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
