#!/usr/bin/env node
/* eslint-env node */

// Sub options for prod command
exports.builder = {
  e: {
    alias: 'css-extraction',
    type: 'boolean',
    default: true,
    describe: 'extract css'
  }
}

// prod command function
exports.handler = function (yargs) {
  var rimraf = require('rimraf')
  rimraf(process.cwd() + '/dist', require('fs'), function (info) {})

  var webpack = require('webpack')
  var config = require('./config/webpack.prod.config.js')
  var ExtractTextPlugin = require('extract-text-webpack-plugin')
  var cssExtraction = yargs['css-extraction']

  // Add css extraction
  if (cssExtraction) {
    var extractCSS = new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true
    })
    for (var rule in config.module.rules) {
      if (config.module.rules[rule].test.test('.css')) {
      // Replace default loader with extractCSS
        config.module.rules[rule].loader = extractCSS.extract([
          'css-loader?sourceMap',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ])

      // Add extraction plugin
        config.plugins.push(extractCSS)
      }
    }
  }
  console.log(config.plugins)

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
