// var webpack = require('webpack')
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

  // Aliases - Used for pointing to reusable parts of your app
  // alias: {
  //   src: projectRoot + '/src'
  // },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue',
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
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/,
        query: {
          presets: [['es2015', {'modules': false}], 'stage-2']
        }
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      },
      {
        test: /\.json$/,
        loader: 'json'
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
