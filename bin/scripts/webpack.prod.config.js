var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config')

module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map'
})
