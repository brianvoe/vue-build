// Karma configuration
module.exports = function (config) {
  var webpack = require('webpack')
  var merge = require('webpack-merge')
  var projectRoot = process.cwd()
  var testPath = projectRoot + '/test/unit'
  var webpackConfig = require(projectRoot + '/webpack.config.js')

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

  // Set karma configuration
  var singleRun = Boolean(process.env.SINGLE_RUN === String(undefined) ? false : process.env.SINGLE_RUN)
  var autoWatch = Boolean(singleRun !== true)
  config.set({
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
    }
  })
}
