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
  }
}

// prod command function
exports.handler = function (yargs) {
  var webpack = require('webpack')
  var config = require('./config/webpack.prod.config.js')
  const MiniCssExtractPlugin = require("mini-css-extract-plugin")
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  var cssExtraction = yargs['css-extraction']
  var uglify = yargs['uglify']
  var bundleAnalyzer = yargs['bundle-analyzer']

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
          'css-loader?sourceMap=true', // Minify
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      }

      // if (config.module.rules[rule].test.test('.vue')) {
      //   config.module.rules[rule].options.loaders.css = extractCSS.extract({
      //     use: 'css-loader?sourceMap=true' + (uglify ? '&minimize=true' : ''),
      //     fallback: 'vue-style-loader'
      //   })

      //   config.module.rules[rule].options.loaders.scss = extractCSS.extract({
      //     use: 'css-loader?sourceMap=true' + (uglify ? '&minimize=true' : '') + '!sass-loader',
      //     fallback: 'vue-style-loader'
      //   })
      // }
    }
  }

  // Uglify code
  if (uglify) {
    // if (config.optimization) {
    //   config.optimization.minimize = true
    // } else {
    //   config.optimization = {
    //     minimize: true
    //   }
    // }
  }

  // Output bundle analyzer html file
  if (bundleAnalyzer) {
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-analyzer.html'
    }))
  }

  console.log(config.module.rules)

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
