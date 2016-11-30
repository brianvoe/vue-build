#!/usr/bin/env node

/* eslint-env node */

// Sub options for e2e command
exports.builder = {
  p: {
    alias: 'port',
    type: 'number',
    describe: 'server port to listen on'
  }
}

// e2e command function
exports.handler = function (yargs) {
  // Set env variables
  process.env.NODE_ENV = 'testing'
  process.env.ENVIRONMENT = 'testing'
  process.env.SINGLE_RUN = yargs['single-run']
  process.env.E2E_PORT = yargs.port || 9090
  process.env.DEVTOOL = 'eval' // Set devtool to be really fast

  // Start the dev server
  var server = require('./dev.js').handler(yargs)
  var path = require('path')

  // Put together nightwatch options
  var opts = []
  opts = opts.concat(['--config', path.join(__dirname, 'config/nightwatch.conf.js')])
  // additional nightwatch options
  if (yargs.options) {
    opts = opts.concat(yargs.options.split(' '))
  }

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
