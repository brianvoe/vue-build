#!/usr/bin/env node

/* eslint-env node */

module.exports = function (yargs) {
  var spawn = require('cross-spawn')
  var opts = [
    '--config', process.cwd() + '/.eslintrc', // Config
    '--ext', '.js,.vue', // Extensions
    process.cwd() + '/src',
    process.cwd() + '/test/unit',
    process.cwd() + '/test/e2e/spec'
  ]

  spawn('./node_modules/.bin/eslint', opts, { stdio: 'inherit' })
}
