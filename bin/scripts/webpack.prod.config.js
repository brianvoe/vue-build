var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require(process.cwd() + '/webpack.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = process.env.environment

var webpackConfig = merge(baseWebpackConfig, {
  devtool: process.env.SOURCE_MAP ? '#source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.NODE_ENV': JSON.stringify(process.env.ENVIRONMENT)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
})

module.exports = webpackConfig
