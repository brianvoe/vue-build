// Karma configuration
module.exports = function (config) {
  var webpack = require('webpack')
  var merge = require('webpack-merge')
  var fs = require('fs')
  var ProgressBarPlugin = require('progress-bar-webpack-plugin')
  var projectRoot = process.cwd()
  var testPath = projectRoot + '/test/unit'
  var webpackConfig = require('./webpack.base.config.js')
  var chalk = require('chalk')
  var port = process.env.PORT
  var coverage = (process.env.COVERAGE === 'true')
  var singleRun = coverage || (process.env.SINGLE_RUN === 'true')
  var autoWatch = singleRun !== true
  var testFiles = process.env.FILES
  var useJUnit = JSON.parse(process.env.JUNIT)
  var path = require('path')

  // if show-coverage argument is passed in open browser to coverage report
  // if (coverage) {
  //   var open = require('open')
  //   open(projectRoot + '/test/unit/coverage/lcov-report/index.html')
  //   return
  // }

  // Merge main config with test config
  var webpackTestConfig = merge(webpackConfig, {
    // use inline sourcemap for karma-sourcemap-loader
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  })

  // no need for app entry during tests
  delete webpackTestConfig.entry

  // Add progress bar to webpack config
  webpackTestConfig.plugins.push(new ProgressBarPlugin({
    format: 'Building [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
  }))

  // Establish which files to run
  var files = []
  var preprocessors = {}
  // Default set of files
  if (!testFiles) {
    // Test all files in test/unit/specs
    files.push({pattern: path.join(testPath, 'index.js'), watched: autoWatch})
    preprocessors[path.join(testPath, 'index.js')] = ['webpack', 'sourcemap']
  } else {
    // Test file arguments were passed in lets use that for file and preprocessors
    testFiles = testFiles.replace(/^\/|\/$/g, '') // strip begining slashes slashes
    // Add to files
    var pattern = path.join(projectRoot, '/test/unit/specs/', testFiles)
    files.push({pattern: pattern, watched: autoWatch})

    // Add to preprocessors
    preprocessors[pattern] = ['webpack', 'sourcemap']
  }

  // Set karma configuration
  var configInfo = {
    singleRun: singleRun,

    // test results reporter to use
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: autoWatch,

    // list of files / patterns to load in the browser
    files: files,

    // files to exclude
    exclude: [
      projectRoot + '/src/app.js' // exclude main app file
    ],

    // Preprocess src/test files
    preprocessors: preprocessors,

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
      'karma-spec-reporter',
      'karma-junit-reporter',
    ]
  }

  // Polyfill stuff of phantomjs
  if (configInfo.browsers.includes('PhantomJS')) {
    configInfo.files.unshift(projectRoot + '/node_modules/whatwg-fetch/fetch.js') // fetch polyfill
    configInfo.files.unshift(projectRoot + '/node_modules/babel-polyfill/dist/polyfill.js') // other polyfill. Ex: Promise, etc...)
  }

  // If coverage add to config
  if (coverage) {
    configInfo.reporters.push('coverage')
    configInfo.coverageReporter = {
      dir: path.join(testPath, '/coverage'),
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  }

  if (useJUnit) {
    configInfo.reporters.push('junit')
    configInfo.junitReporter = {
      outputDir: path.join(testPath, 'reports')
    }
  }

  // Add express server
  // Check if there is a server.js file in the test folder
  try {
    var pathToServer = projectRoot + '/test/server.js'
    fs.statSync(pathToServer)

    // If statsSync is successfull push plugin and run express server
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
  } catch (err) {}

  // Set configuration
  config.set(configInfo)
}
