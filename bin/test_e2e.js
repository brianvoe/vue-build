#!/usr/bin/env node

/* eslint-env node */

module.exports = function (yargs) {
  // Set env variables
  process.env.NODE_ENV = 'testing'
  process.env.ENVIRONMENT = 'testing'
  process.env.SINGLE_RUN = yargs.argv['single-run']

  // Start the dev server
  var server = require('./dev.js')(yargs)
  var path = require('path')

  // Put together nightwatch options
  var opts = []
  opts = opts.concat(['--config', path.join(__dirname, 'config/nightwatch.conf.js')])

  // Run nightwatch
  var spawn = require('cross-spawn')
  var runner = spawn('./node_modules/.bin/nightwatch', opts, { stdio: 'inherit' })

  // If runner exits or has an error close dev server
  runner.on('exit', function (code) {
    server.close()
    process.exit(code)
  })
  runner.on('error', function (err) {
    server.close()
    throw err
  })
}
