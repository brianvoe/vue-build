var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  // entry: [
  //   'webpack/hot/dev-server',
  //   'webpack-dev-server/client?http://localhost:1234/'
  // ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    // Hot module replacement
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})
