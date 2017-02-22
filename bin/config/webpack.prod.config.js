// Set default environment
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.ENVIRONMENT = process.env.ENVIRONMENT || 'production'

var webpack = require('webpack')
var merge = require('webpack-merge')
var fs = require('fs')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var baseWebpackConfig = require('./webpack.base.config.js')
var projectRoot = process.cwd()

// Merge webpacks
var webpackConfig = merge(baseWebpackConfig, {
  devtool: process.env.SOURCE_MAP ? '#source-map' : false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: process.env.SOURCE_MAP
    })
  ]
})

// Add css extraction
var extractCSS = new ExtractTextPlugin({
  filename: '[name].css',
  disable: false,
  allChunks: true
})
for (var rule in webpackConfig.module.rules) {
  if (webpackConfig.module.rules[rule].test.test('.css')) {
    // Replace default loader with extractCSS
    webpackConfig.module.rules[rule].loader = extractCSS.extract([
      'css-loader?sourceMap',
      'resolve-url-loader',
      'sass-loader?sourceMap'
    ])

    // Add extraction plugin
    webpackConfig.plugins.push(extractCSS)
  }
}

// Add static directory copying if folder exists
try {
  var copyDir = projectRoot + '/src/public'
  fs.statSync(copyDir)

  webpackConfig.plugins.push(new CopyWebpackPlugin([
    // Copy directory contents to {output}/
    { from: copyDir }
  ]))
} catch (err) {}

// Check if they have an html file to output if so add plugin
try {
  var indexHtml = projectRoot + '/src/index.html'
  fs.statSync(indexHtml)

  var htmlOptions = {
    inject: true,
    showErrors: false,
    template: indexHtml
  }

  try {
    var favicon = projectRoot + '/src/favicon.ico'
    fs.statSync(favicon)
    htmlOptions.favicon = favicon
  } catch (err) {}

  // If your here it did find an html file and now we add plugin
  webpackConfig.plugins.push(new HtmlWebpackPlugin(htmlOptions))
} catch (err) {}

module.exports = webpackConfig
