var webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BabiliMinifyPlugin = require('babili-webpack-plugin')
var baseWebpackConfig = require('./webpack.base.config.js')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var chalk = require('chalk')
var fs = require('fs')
var projectRoot = process.cwd()

// Set default environment
process.env.NODE_ENV = process.env.ENVIRONMENT || 'production'
process.env.ENVIRONMENT = process.env.ENVIRONMENT || 'production'

var webpackConfig = merge(baseWebpackConfig, {
  devtool: process.env.SOURCE_MAP ? '#source-map' : false,
  plugins: [
    new ProgressBarPlugin({
      format: 'Building [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new BabiliMinifyPlugin({
      comments: false,
      sourceMape: process.env.SOURCE_MAP
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

// Check if they have an html file to output if so add plugin
try {
  var indexHtml = projectRoot + '/src/index.html'
  fs.statSync(indexHtml)

  // If your here it did find an html file and now we add plugin
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    inject: true,
    showErrors: false,
    template: 'index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }))
} catch (err) {}

module.exports = webpackConfig
