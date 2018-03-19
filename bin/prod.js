#!/usr/bin/env node

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
  },
  j: {
    alias: 'json',
    type: 'string',
    describe: 'write webpack build stats as JSON to given path (for profiling)'
  }
}

// prod command function
exports.handler = function (yargs) {
  var webpack = require('webpack')
  var fs = require('fs')
  var config = require('./config/webpack.prod.config.js')
  const MiniCssExtractPlugin = require("mini-css-extract-plugin")
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  var cssExtraction = yargs['css-extraction']
  var uglify = yargs['uglify']
  var bundleAnalyzer = yargs['bundle-analyzer']
  var jsonPath = yargs['json']

  // Add css extraction
  if (cssExtraction) {
    let extractCSS = new MiniCssExtractPlugin({
      filename: '[name].css'
    })

    // Add extraction plugin
    config.plugins.push(extractCSS)

    for (var rule in config.module.rules) {
      if (config.module.rules[rule].test.test('.css')) {
        // Replace default loader with extractCSS
        config.module.rules[rule].loader = [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap=true'+(uglify ? '&minimize=true' : ''),
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      }

      if (config.module.rules[rule].test.test('.vue')) {
        config.module.rules[rule].options.loaders.css = [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap=true'+(uglify ? '&minimize=true' : ''),
          'resolve-url-loader'
        ]

        config.module.rules[rule].options.loaders.scss = [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap=true'+(uglify ? '&minimize=true' : ''),
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      }
    }
  }

  if (jsonPath) {
    // enable profiling:
    config.profile = true
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

    if (jsonPath) {
      fs.writeFileSync(jsonPath, JSON.stringify(stats.toJson()))
    }
  })
}
