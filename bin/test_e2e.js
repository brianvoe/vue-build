#!/usr/bin/env node

/* eslint-env node */

// Sub options for e2e command
exports.builder = {
  p: {
    alias: 'port',
    type: 'number',
    describe: 'server port to listen on'
  },
  dt: {
    alias: 'devtool',
    type: 'string',
    describe: 'webpack performance build'
  },
  b: {
    alias: 'browser',
    type: 'string',
    describe: 'set which browser to run'
  },
  t: {
    alias: 'tags',
    type: 'string',
    describe: 'run tests with set tags'
  },
  o: {
    alias: 'options',
    type: 'string',
    describe: 'nightwatch options'
  }
}

// e2e command function
exports.handler = function (yargs) {
  // Set env variables
  process.env.NODE_ENV = 'testing'
  process.env.ENVIRONMENT = 'testing'
  process.env.SINGLE_RUN = yargs['single-run']
  process.env.E2E_PORT = yargs.port || 9090
  process.env.DEVTOOL = yargs.devtool || 'eval' // Set devtool to be really fast

  // Start the dev server
  var dev = require('./dev.js').handler(yargs)
  var compiler = dev.compiler
  var server = dev.server
  var path = require('path')

  // Once compiler is done run nightwatch
  compiler.plugin('done', function () {
    // Put together nightwatch options
    var opts = []
    opts = opts.concat(['--config', path.join(__dirname, 'config/nightwatch.conf.js')])

    // set browser type
    if (yargs.browser) {
      opts = opts.concat(['-e', yargs.browser])
    }

    // set tags
    if (yargs.tags) {
      yargs.tags.split(',').forEach(function (item) {
        opts = opts.concat(['--tag', item.trim()])
      })
    }

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
  })
}
