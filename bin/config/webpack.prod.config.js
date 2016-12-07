var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BabiliMinifyPlugin = require('babili-webpack-plugin')
var baseWebpackConfig = require('./webpack.base.config.js')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var chalk = require('chalk')

process.env.NODE_ENV = process.env.environment

var webpackConfig = merge(baseWebpackConfig, {
  devtool: process.env.SOURCE_MAP ? '#source-map' : false,
  plugins: [
    new ProgressBarPlugin({
      format: 'Building [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.NODE_ENV': JSON.stringify(process.env.ENVIRONMENT)
    }),
    new BabiliMinifyPlugin({
      comments: false,
      sourceMape: process.env.SOURCE_MAP
    }),
    new HtmlWebpackPlugin({
      inject: true,
      showErrors: false,
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
})

module.exports = webpackConfig
