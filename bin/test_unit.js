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
    alias: 'watch',
    type: 'boolean',
    default: false,
    describe: 'watch for file changes and rerun tests'
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
  },
  j: {
    alias: 'junit',
    type: 'boolean',
    default: false,
    describe: 'output JUnit XML to test/unit/reports'
  }
}

// unit command function
exports.handler = function (yargs) {
  var path = require('path')
  var chalk = require('chalk')
  var fs = require('fs')

  // Check to make sure you have a e2e directory
  try {
    fs.statSync(path.join(process.cwd(), '/test/unit'))
    fs.statSync(path.join(process.cwd(), '/test/unit/specs'))
  } catch (err) {
    console.log(chalk.red('Sorry you do not have a unit/specs folder'))
    return
  }

  // check to make sure the test runner file (index.js) is present
  if (!yargs.files) {
    try {
      fs.statSync(path.join(process.cwd(), '/test/unit/index.js'))
    } catch (err) {
      console.log(chalk.red(`unit/index.js not found. Run vue-build init to generate it (or copy it from the example project in the vue-build repo).`))
      return
    }
  }

  // Set env variables
  process.env.NODE_ENV = 'production'
  process.env.ENVIRONMENT = 'testing'
  process.env.TESTING_TYPE = 'unit'
  process.env.WATCH = yargs['watch']
  process.env.PORT = yargs.port || process.env.PORT || 8080
  process.env.KARMA_PORT = 8765
  process.env.COVERAGE = yargs.coverage || false
  process.env.FILES = yargs.files || ''
  process.env.JUNIT = yargs.junit

  // Ouput whats going on
  console.log(chalk.blue('Building src files for tests'))

  // Start karma server
  var Server = require('karma').Server
  new Server({
    port: process.env.KARMA_PORT,
    configFile: path.join(__dirname, './config/karma.conf.js')
  }).start()
}
