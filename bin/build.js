#!/usr/bin/env node

/* eslint-env node */

var webpack = require('webpack')
var config = require('./scripts/webpack.prod.config.js')
var ora = require('ora') // Loading spinner

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
