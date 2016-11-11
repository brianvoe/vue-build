var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge')
var baseWebpackConfig = require(process.cwd() + '/webpack.config')

module.exports = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  entry: {
    app: [
      'webpack-dev-server/client',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    ]
  },
  // Set webpack dev server options - essentially default values
  // Could be overwritten by may main webpack config
  devServer: {
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'warning',
    noInfo: true
  },
  // Plugins needed for development
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      showErrors: false,
      template: 'index.html'
    })
  ]
})
