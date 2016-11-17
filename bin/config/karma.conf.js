// Karma configuration
module.exports = function (config) {
  var merge = require('webpack-merge')
  var projectRoot = process.cwd()
  var testPath = projectRoot + '/test/unit'
  var webpackConfig = require(projectRoot + '/webpack.config.js')

  // Merge main config with test config
  var webpackTestConfig = merge(webpackConfig, {
    // use inline sourcemap for karma-sourcemap-loader
    devtool: '#inline-source-map'
  })
  // no need for app entry during tests
  delete webpackTestConfig.entry

  // Add isparta stuff - code coverage
  // webpackTestConfig.module.rules.some(function (loader, i) {
  //   if (loader.loader === 'babel-loader') {
  //     loader.include = testPath
  //   }
  //   if (loader.loader === 'vue-loader') {
  //     loader.options.js = 'isparta!' + loader.options.js
  //   }
  //   if (loader.enforce === 'pre' && loader.test.test('.vue')) {
  //     console.log('hit')
  //     loader.loader = 'isparta-loader!' + loader.loader
  //     loader.include = projectRoot + '/src'
  //   }
  // })

  // Set karma configuration
  config.set({
    singleRun: process.env.SINGLE_RUN || true,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'spec', 'coverage'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: (process.env.SINGLE_RUN === true || false),

    // list of files / patterns to load in the browser
    files: [
      // Test files
      'node_modules/whatwg-fetch/fetch.js', // fetch polyfill
      'node_modules/babel-polyfill/dist/polyfill.js', // other polyfill. Ex: Promise, etc...
      {pattern: testPath + '/specs/**/*.js', watched: false}
    ],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      [projectRoot + '/src/**/*.js']: ['coverage'],
      [testPath + '/specs/**/*.js']: ['webpack']
    },

    webpack: webpackTestConfig,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'], // ['PhantomJS', 'Chrome', 'Firefox'],

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
    }
  })
}
