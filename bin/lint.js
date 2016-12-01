#!/usr/bin/env node

/* eslint-env node */

module.exports = function (yargs) {
  var spawn = require('cross-spawn')
  var projectRoot = process.cwd()

  var opts = [
    '--config', projectRoot + '/.eslintrc', // Config
    '--ext', '.js,.vue', // Extensions
    projectRoot + '/src',
    projectRoot + '/test/unit/spec',
    projectRoot + '/test/e2e/spec'
  ]

  // Lint src folder
  var opts = [
    '--config', projectRoot + '/.eslintrc', // Config
    '--ext', '.js,.vue', // Extensions
    projectRoot + '/src'
  ]
  spawn('./node_modules/.bin/eslint', opts, { stdio: 'inherit' })

  // Lint unit test folder
  opts = [
    '--config', projectRoot + '/.eslintrc', // Config
    '--ext', '.js,.vue', // Extensions
    projectRoot + '/src'
  ]
  spawn('./node_modules/.bin/eslint', opts, { stdio: 'inherit' })

  // Lint e2e test folder
}
