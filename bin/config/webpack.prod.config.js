var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackUglifyJsPlugin = require('webpack-uglify-js-plugin')
var baseWebpackConfig = require(process.cwd() + '/webpack.config')

process.env.NODE_ENV = process.env.environment

var webpackConfig = merge(baseWebpackConfig, {
  devtool: process.env.SOURCE_MAP ? '#source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.NODE_ENV': JSON.stringify(process.env.ENVIRONMENT)
    }),
    new WebpackUglifyJsPlugin({
      cacheFolder: process.cwd() + '/dist/',
      debug: true,
      minimize: true,
      sourceMap: process.env.SOURCE_MAP,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      showErrors: false,
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  ]
})

module.exports = webpackConfig
