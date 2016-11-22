#!/usr/bin/env node

/* eslint-env node */

// process .env file
var pathToEnv = process.cwd() + '/.env'
var fs = require('fs')
try {
  fs.statSync(pathToEnv)
  require('dotenv').config({
    path: pathToEnv
  })
} catch (err) {
  console.error('No .env file. Using defaults')
}

// Initiate yargs scripts
var version = require('../package').version
var yargs = require('yargs')
  // List commands
  .command('init', 'Initiate structure', require('./init.js'))
  .command('dev', 'Start development server', require('./dev.js'))
  .command('prod', 'Production build to dist', require('./prod.js'))
  .command('lint', 'Lint files', require('./lint.js'))
  .command('unit', 'Unit testing', require('./test_unit.js'))
  .command('e2e', 'End to end testing', require('./test_e2e.js'))
  .command('help', 'Show help', function (yargs) { yargs.showHelp() })
  .recommendCommands() // If your close enough recommend the closest command

  // Set port
  .option('p', {
    alias: 'port',
    type: 'number',
    describe: 'dev server port to listen on'
  })

  // Set environment
  .option('e', {
    alias: 'environment',
    type: 'string',
    choices: ['development', 'testing', 'production'],
    describe: 'environment setting'
  })

  .option('dt', {
    alias: 'devtool',
    type: 'string',
    describe: 'Webpack performance builds'
  })

  // Single run
  .option('sr', {
    alias: 'single-run',
    default: true,
    type: 'boolean',
    describe: 'testing single run through'
  })

  // e2e nightwatch options
  .option('o', {
    alias: 'options',
    type: 'string',
    describe: 'e2e nightwatch options'
  })

  // Version
  .alias('v', 'version')
  .version(function () { return version })
  .describe('v', 'show version information')

  // Help
  .alias('h', 'help')
  .help('help')

  // Simple usage
  .usage('Usage: vue-build <command> [options]')
  .epilog('Have questions? Email: brian@webiswhatido.com')
  .showHelpOnFail(false, 'Specify --help for available options')

// If you dont send any commands show help
if (yargs.argv._.length === 0) {
  yargs.showHelp()
}
