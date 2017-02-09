var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config.js')
var projectRoot = process.cwd()
var fs = require('fs')

var webpackConfig = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  entry: {
    app: [
      // 'webpack-dev-server/client',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?noInfo=true'
    ]
  },
  // Plugins needed for development
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})

// Check if they have an html file to output if so add plugin
try {
  var indexHtml = projectRoot + '/src/index.html'
  fs.statSync(indexHtml)

  var htmlOptions = {
    inject: true,
    cache: false,
    showErrors: false,
    template: 'index.html'
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
