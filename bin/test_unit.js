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
  }
}

// unit command function
exports.handler = function (yargs) {
  var path = require('path')
  var chalk = require('chalk')
  var projectRoot = process.cwd()

  // if show-coverage argument is passed in open browser to coverage report
  if (yargs['coverage']) {
    var open = require('open')
    open(projectRoot + '/test/unit/coverage/lcov-report/index.html')
    return
  }

  // Set env variables
  process.env.NODE_ENV = 'testing'
  process.env.ENVIRONMENT = 'testing'
  process.env.SINGLE_RUN = yargs['single-run']

  // Ouput whats going on
  console.log(chalk.blue('Building src files for tests'))

  // Start karma server
  var Server = require('karma').Server
  new Server({
    configFile: path.join(__dirname, './config/karma.conf.js')
  }).start()
}
