#!/usr/bin/env node
/* eslint-env node */

// Sub options for prod command
exports.builder = {
  e: {
    alias: 'css-extraction',
    type: 'boolean',
    default: true,
    describe: 'extract css'
  },
  u: {
    alias: 'uglify',
    type: 'boolean',
    default: true,
    describe: 'uglify js'
  },
  b: {
    alias: 'bundle-analyzer',
    type: 'boolean',
    default: false,
    describe: 'create a bundle size report'
  }
}

// prod command function
exports.handler = function (yargs) {
  var webpack = require('webpack')
  var config = require('./config/webpack.prod.config.js')
  var ExtractTextPlugin = require('extract-text-webpack-plugin')
  var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  var cssExtraction = yargs['css-extraction']
  var uglify = yargs['uglify']
  var bundleAnalyzer = yargs['bundle-analyzer']

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

  // Uglify code
  if (uglify) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: process.env.SOURCE_MAP
    }))

    config.plugins.push(new OptimizeCssAssetsWebpackPlugin())
  }

  // Output bundle analyzer html file
  if (bundleAnalyzer) {
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-analyzer.html'
    }))
  }

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
