var projectRoot = process.cwd()

module.exports = {
  // Path to main source folder where your files reside
  context: projectRoot + '/src',
  // Main file entry point - must be in app object as we append dev injections to that path
  entry: {
    app: ['./app.js']
  },
  output: {
    path: projectRoot + '/dist',
    filename: '[name].js', // filename based upon entry variable - ex: app.js
    publicPath: '/' // Important for dev server main path
  },
  // Config information that will be sent to
  devServer: {
    // contentBase: './src', // Base path for the content
    port: 1234, // Dev server port
    hot: true, // Hot reloading
    historyApiFallback: true, // Enables suport for history api fallback
    clientLogLevel: 'warning', // The amount of logging for browser console logs
    noInfo: true // Suppress boring info in command line
  },
  resolve: {
    // If you dont put the extension on an import it will
    // try to resolve it by looking for these extensions first
    extensions: ['.scss', '.js', '.vue'],
    enforceExtension: false, // Whether or not to force user to add .ext to end of files
    // Aliases - Used for pointing to reusable parts of your app
    alias: {
      src: projectRoot + '/src'
    }
  },
  module: {
    rules: [
      // Preloaders
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      // Loaders
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('autoprefixer')({
              browsers: ['last 3 versions']
            })
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/,
        query: {
          presets: [['es2015', {'modules': false}], 'stage-2']
        }
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url',
      //   query: {
      //     limit: 10000,
      //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
      //   }
      // }
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url',
      //   query: {
      //     limit: 10000,
      //     name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      //   }
      // },
    ]
  }
}
