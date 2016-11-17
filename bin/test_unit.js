#!/usr/bin/env node

/* eslint-env node */

module.exports = function (yargs) {
  // Set env variables
  process.env.NODE_ENV = 'testing'
  process.env.ENVIRONMENT = 'testing'
  process.env.SINGLE_RUN = yargs.argv['single-run']

  var path = require('path')
  // Start karma server
  var Server = require('karma').Server
  new Server({
    configFile: path.join(__dirname, './config/karma.conf.js')
  }).start()
}
