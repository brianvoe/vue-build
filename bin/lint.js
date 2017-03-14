#!/usr/bin/env node

/* eslint-env node */

module.exports = function (yargs) {
  var spawn = require('cross-spawn')
  var projectRoot = process.cwd()
  var chalk = require('chalk')

  // Lint src folder
  console.log(chalk.blue('Linting src folder'))
  var srcOpts = [
    '--config', projectRoot + '/.eslintrc', // Config
    '--ext', '.js,.vue', // Extensions
    projectRoot + '/src'
  ]
  spawn.sync('eslint', srcOpts, { stdio: 'inherit' })

  // Lint unit test folder
  console.log(chalk.blue('Linting unit test folder'))
  var unitOpts = [
    '--config', projectRoot + '/.eslintrc', // Config
    '--ext', '.js,.vue', // Extensions
    projectRoot + '/test/unit/spec'
  ]
  spawn.sync('eslint', unitOpts, { stdio: 'inherit' })

  // Lint e2e test folder
  console.log(chalk.blue('Linting e2e test folder'))
  var e2eOpts = [
    '--config', projectRoot + '/.eslintrc', // Config
    '--ext', '.js,.vue', // Extensions
    projectRoot + '/test/e2e/spec'
  ]
  spawn.sync('eslint', e2eOpts, { stdio: 'inherit' })
}
