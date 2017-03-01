var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config.js')
var projectRoot = process.cwd()
var fs = require('fs')

var entryIndex = baseWebpackConfig.entry.index
if (typeof baseWebpackConfig.entry.index === 'string') {
  entryIndex = [baseWebpackConfig.entry.index]
}
// entryIndex.push('webpack-dev-server/client')
entryIndex.push('webpack/hot/dev-server')
entryIndex.push('webpack-hot-middleware/client?noInfo=true')

var webpackConfig = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  entry: {
    index: entryIndex
  },
  // Plugins needed for development
  plugins: [
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
