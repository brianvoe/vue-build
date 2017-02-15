var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var projectRoot = process.cwd()
var projectModules = path.join(projectRoot, '/node_modules')

var babelSettings = {
  presets: [['es2015', {'modules': false}], 'stage-2'],
  plugins: ['transform-runtime']
}
if (process.env.COVERAGE === 'true') {
  babelSettings.plugins.push('istanbul')
}

var clientEnvironment = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.ENVIRONMENT': JSON.stringify(process.env.ENVIRONMENT),
  'process.env.TESTING_TYPE': JSON.stringify(process.env.TESTING_TYPE)
}

try {
  projectClientEnv = require(path.join(projectRoot, 'env.js'))

  for (key of Object.keys(projectClientEnv)) {
    clientEnvironment['process.env.' + key] = JSON.stringify(projectClientEnv[key])
  }
} catch (err) {}

var config = {
  // Path to main source folder where your files reside
  context: path.join(projectRoot, 'src'),
  // Main file entry point - must be in app object as we append dev injections to that path
  entry: {
    app: ['./app.js']
  },
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name].js', // filename based upon entry variable - ex: app.js
    publicPath: '/' // Important for dev server main path
  },
  resolve: {
    modules: [projectRoot + '/src', projectModules],
    // If you dont put the extension on an import it will
    // try to resolve it by looking for these extensions first
    extensions: ['.scss', '.js', '.vue'],
    enforceExtension: false, // Whether or not to force user to add .ext to end of files
    // Aliases - Used for pointing to reusable parts of your app
    alias: {
      src: projectRoot + '/src'
    }
  },
  resolveLoader: {
    alias: {
      // This will allow you to do lang="scss" in your style tags
      'scss-loader': 'sass-loader'
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
          loaders: {
            js: 'babel-loader?' + JSON.stringify(babelSettings),
            postcss: [
              require('autoprefixer')({
                browsers: ['last 3 versions']
              })
            ]
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: babelSettings
      },
      {
        test: /\.(scss|css)$/,
        loader: ['style-loader', 'css-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(clientEnvironment),
  ]
}

// If there is a webpack in the main project merge it
try {
  var webpackConfig = projectRoot + '/webpack.config.js'
  fs.statSync(webpackConfig)

  config = merge(config, require(webpackConfig))
} catch (err) {}

module.exports = config
