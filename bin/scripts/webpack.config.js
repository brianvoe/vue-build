var projectRoot = process.cwd()

module.exports = {
  context: process.cwd() + '/src',
  // Main file entry point
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:1234/',
    './app.js'
  ],
  output: {
    path: process.cwd() + '/dist',
    filename: '[name].js'
  },
  // resolveLoader: {
  //   fallback: [process.cwd() + '/node_modules']
  // },
  // resolve: {
  //   extensions: ['', '.js', '.jsx'],
  //   modules: [
  //     process.cwd() + '/src',
  //     process.cwd() + '/node_modules'
  //   ]
  // },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.vue$/,
    //     loader: 'eslint',
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   },
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint',
    //     include: projectRoot,
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      // {
      //   test: /\.vue$/,
      //   loader: 'vue'
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/,
        query: {
          presets: [['es2015', {'modules': false}], 'stage-2']
        }
      }
      // {
      //   test: /\.json$/,
      //   loader: 'json'
      // }
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url',
      //   query: {
      //     limit: 10000,
      //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // },
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url',
      //   query: {
      //     limit: 10000,
      //     name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      //   }
      // }
    ]
  }
}
