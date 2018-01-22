var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var merge = require('webpack-merge')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var projectRoot = process.cwd()
var projectModules = path.join(projectRoot, '/node_modules')
var firstProgressBarRun = true

var clientEnvironment = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  'process.env.ENVIRONMENT': JSON.stringify(process.env.ENVIRONMENT),
  'process.env.TESTING_TYPE': JSON.stringify(process.env.TESTING_TYPE)
}

// Check if there is a typescript file as the main entry point
var entry = './index.js'
try {
  var typescriptFile = path.join(projectRoot, 'src', 'index.ts')
  fs.statSync(typescriptFile)
  entry = './index.ts'
} catch (err) {}

try {
  var projectClientEnv = require(path.join(projectRoot, 'env.js'))

  for (var key of Object.keys(projectClientEnv)) {
    clientEnvironment[key] = JSON.stringify(projectClientEnv[key])
  }
} catch (err) {}

var config = {
  // Path to main source folder where your files reside
  context: path.join(projectRoot, 'src'),
  // Main file entry point - must be an object as we append dev injections to that path
  entry: {
    index: entry
  },
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name].js', // filename based upon entry variable - ex: index.js
    publicPath: '/' // Important for dev server main path
  },
  resolve: {
    modules: [projectRoot + '/src', projectModules],
    // If you dont put the extension on an import it will
    // try to resolve it by looking for these extensions first
    extensions: ['.scss', '.ts', '.tsx', '.js', '.vue'],
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
      // Loaders
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            postcss: [
              require('autoprefixer')({
                browsers: ['last 3 versions']
              })
            ]
          }
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true,
          appendTsSuffixTo: [/\.vue$/],
          logLevel: 'warn'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(projectRoot, 'src'), path.join(projectRoot, 'test')]
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
    // Temporarily removed to fix hot module reloading issues
    // new webpack.optimize.ModuleConcatenationPlugin(), // Scope Hoisting for better performance
    new webpack.DefinePlugin(clientEnvironment),
    new ProgressBarPlugin({
      format: '[:bar] :percent :msg',
      callback: function (info) {
        // Output message on development
        if (process.env.ENVIRONMENT === 'development' && firstProgressBarRun) {
          console.log(chalk.green('Dev server started'))
          console.log(chalk.blue('http://localhost:' + process.env.PORT + '.....PID:' + process.pid))
          firstProgressBarRun = false
        }
      }
    })
  ]
}

// If a user has a .babelrc file lets just let it use that
// If user doesnt have a .babelrc file lets create a default for them
try {
  var babelrcFile = path.join(projectRoot, '.babelrc')
  fs.statSync(babelrcFile)
} catch (err) {
  var babelSettings = {
    presets: [['env', {'modules': false}], 'stage-2'],
    plugins: ['transform-runtime'],
    comments: false
  }
  if (process.env.COVERAGE === 'true') {
    babelSettings.plugins.push('istanbul')
  }

  let rules = config.module.rules
  for (var i = 0; i < rules.length; i++) {
    // Add babel options to babel-loader
    if (rules[i].loader === 'babel-loader') {
      rules[i].options = babelSettings
    }

    // Add babel options to vue-loader
    if (rules[i].loader === 'vue-loader') {
      rules[i].options.loaders.js = 'babel-loader?' + JSON.stringify(babelSettings)
    }
  }
}

// If user has a .eslintrc file lets add loaders
try {
  var eslintFile = projectRoot + '/.eslintrc'
  fs.statSync(eslintFile)

  config.unshift({
    enforce: 'pre',
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    include: [path.join(projectRoot, 'src'), path.join(projectRoot, 'test')]
  })
} catch (err) {}

// If there is a webpack in the main project merge it
try {
  var webpackConfig = projectRoot + '/webpack.config.js'
  fs.statSync(webpackConfig)

  config = merge.smart(config, require(webpackConfig))
} catch (err) {}

// Check entry index to make sure files exist
try {
  if (typeof config.entry.index === 'string') {
    fs.statSync(path.join(projectRoot, 'src', config.entry.index))
  } else {
    for (let file of config.entry.index) {
      fs.statSync(path.join(projectRoot, 'src', file))
    }
  }
} catch (err) {
  var error = `Could not find file ${err.path}. Vue build uses index.js as the main entry point. Please make sure that file exists.`
  throw new Error(error)
}

module.exports = config
