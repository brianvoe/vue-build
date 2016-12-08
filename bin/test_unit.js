#!/usr/bin/env node

/* eslint-env node */

// Sub options for unit command
exports.builder = {
  e: {
    alias: 'environment',
    type: 'string',
    choices: ['development', 'testing', 'production'],
    describe: 'environment setting'
  },
  p: {
    alias: 'port',
    type: 'number',
    describe: 'server port to listen on'
  },
  s: {
    alias: 'single-run',
    type: 'boolean',
    default: false,
    describe: 'run unit test once'
  },
  c: {
    alias: 'coverage',
    type: 'boolean',
    describe: 'show last code coverage report'
  },
  f: {
    alias: 'files',
    type: 'string',
    describe: 'set the file(s) you want to test'
  }
}

// unit command function
exports.handler = function (yargs) {
  var path = require('path')
  var chalk = require('chalk')
  var fs = require('fs')

  // Check to make sure you have a e2e directory
  try {
    fs.statSync(process.cwd() + '/test/unit')
    fs.statSync(process.cwd() + '/test/unit/specs')
  } catch (err) {
    console.log(chalk.red('Sorry you do not have a unit/specs folder'))
    return
  }

  // Set env variables
  process.env.NODE_ENV = 'testing'
  process.env.ENVIRONMENT = 'testing'
  process.env.SINGLE_RUN = yargs['single-run']
  process.env.PORT = yargs.port || process.env.PORT || 8080
  process.env.KARMA_PORT = 8765
  process.env.COVERAGE = yargs.coverage || false
  process.env.FILES = yargs.files || ''

  // Ouput whats going on
  console.log(chalk.blue('Building src files for tests'))

  // Start karma server
  var Server = require('karma').Server
  new Server({
    port: process.env.KARMA_PORT,
    configFile: path.join(__dirname, './config/karma.conf.js')
  }).start()
}
