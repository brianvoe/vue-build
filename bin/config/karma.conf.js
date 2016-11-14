// Karma configuration
module.exports = function (config) {
  config.set({
    singleRun: process.env.SINGLE_RUN || true,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // list of files / patterns to load in the browser
    files: [
      // Test files
      'node_modules/whatwg-fetch/fetch.js', // fetch polyfill
      'node_modules/babel-polyfill/dist/polyfill.js', // other polyfill. Ex: Promise, etc...
      {pattern: process.cwd() + '/test/unit/**/*.js', watched: false}
    ],

    preprocessors: {
      // add webpack as preprocessor
      'test/unit/**/*.js': ['webpack']
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      // webpack configuration
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'], // ['PhantomJS', 'Chrome', 'Firefox'],

    // Webpack middleware config
    webpackMiddleware: {
      stats: 'errors-only'
    }
  })
}
