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
  o: {
    alias: 'options',
    type: 'string',
    describe: 'nightwatch options'
  }
}

// unit command function
exports.handler = function (yargs) {
  // Set env variables
  process.env.NODE_ENV = 'testing'
  process.env.ENVIRONMENT = 'testing'
  process.env.SINGLE_RUN = yargs['single-run']

  var path = require('path')
  var chalk = require('chalk')

  // Ouput whats going on
  console.log(chalk.blue('Building src files for tests'))

  // Start karma server
  var Server = require('karma').Server
  new Server({
    configFile: path.join(__dirname, './config/karma.conf.js')
  }).start()
}
