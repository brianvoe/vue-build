var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config.js')

module.exports = merge(baseWebpackConfig, {
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      showErrors: false,
      template: 'index.html'
    })
  ]
})
