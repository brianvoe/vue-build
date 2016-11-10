var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge')
var baseWebpackConfig = require(process.cwd() + '/webpack.config')

module.exports = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:1234/',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    ]
  },
  // Set webpack dev server items here
  devServer: {
    // Content base sets the base path of where you wan to serve your files
    contentBase: './src',
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'warning',

    noInfo: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      showErrors: false,
      template: 'index.html'
    })
  ]
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: '"development"'
  //     }
  //   })
  // ]
})
