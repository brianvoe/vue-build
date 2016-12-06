// Karma configuration
module.exports = function (config) {
  var webpack = require('webpack')
  var merge = require('webpack-merge')
  var fs = require('fs')
  var ProgressBarPlugin = require('progress-bar-webpack-plugin')
  var projectRoot = process.cwd()
  var testPath = projectRoot + '/test/unit'
  var webpackConfig = require(projectRoot + '/webpack.config.js')
  var chalk = require('chalk')
  var port = process.env.PORT

  // Check if there is a server.js file in the test folder
  var pathToServer = projectRoot + '/test/server.js'
  try {
    fs.statSync(pathToServer)
  } catch (err) { pathToServer = false }

  // Merge main config with test config
  var webpackTestConfig = merge(webpackConfig, {
    // use inline sourcemap for karma-sourcemap-loader
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
        'process.env.NODE_ENV': JSON.stringify(process.env.ENVIRONMENT)
      })
    ]
  })

  // no need for app entry during tests
  delete webpackTestConfig.entry

  // Add progress bar to webpack config
  webpackTestConfig.plugins.push(new ProgressBarPlugin({
    format: 'Building [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
  }))

  // Set karma configuration
  var singleRun = (process.env.SINGLE_RUN === 'true')
  var autoWatch = singleRun !== true
  var configInfo = {
    singleRun: singleRun,

    // test results reporter to use
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: autoWatch,

    // list of files / patterns to load in the browser
    files: [
      // Src files
      {pattern: projectRoot + '/src/**/*.js', watched: autoWatch},
      {pattern: projectRoot + '/src/**/*.vue', watched: autoWatch},
      // Test files
      {pattern: testPath + '/specs/**/*.js', watched: autoWatch}
    ],

    // files to exclude
    exclude: [
      projectRoot + '/src/app.js' // exclude main app file
    ],

    // Preprocess src/test files
    preprocessors: {
      [projectRoot + '/src/**/*.js']: ['webpack', 'sourcemap'],
      [projectRoot + '/src/**/*.vue']: ['webpack', 'sourcemap'],
      [testPath + '/specs/**/*.js']: ['webpack', 'sourcemap']
    },

    webpack: webpackTestConfig,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-as-promised', 'chai'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,

    // Dont have the browser console log or error to the terminal
    // client: {
    //   captureConsole: false
    // },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'], // ['PhantomJS', 'Chrome', 'Firefox'],

    // Code Coverage Report
    coverageReporter: {
      dir: testPath + '/coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },

    // Webpack middleware config
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },

    // plugins
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-chai',
      'karma-chai-as-promised',
      'karma-coverage',
      'karma-spec-reporter'
    ]
  }

  // If there is a server path add express server
  if (pathToServer) {
    var expressServer = function (args, config, logger, helper) {
      console.log(chalk.blue('Running server on http://localhost:' + port + '.....PID:' + process.pid))

      var express = require('express')
      var app = express()

      // require server path and pass express app to it
      require(pathToServer)(app)

      app.listen(port)
    }

    // Push inline express server plugin
    configInfo.frameworks.push('express-http-server')
    configInfo.plugins.push({
      'framework:express-http-server': ['factory', expressServer]
    })
  }

  config.set(configInfo)
}
