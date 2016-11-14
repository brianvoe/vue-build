#!/usr/bin/env node

/* eslint-env node */

module.exports = function (yargs) {
  var path = require('path')
  console.log()
  // Start karma server
  var Server = require('karma').Server
  new Server({
    configFile: path.join(__dirname, './config/karma.conf.js')
  }).start()
}
