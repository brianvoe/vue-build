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
  .command('build', 'Production build to dist', require('./build.js'))
  .command('lint', 'Lint files', require('./lint.js'))
  .command('unit', 'Unit testing', require('./test_unit.js'))
  .command('e2e', 'End to end testing', require('./test_e2e.js'))
  .command('test', 'Run unit and e2e tests', function (yargs) {
    require('./test_unit.js')(yargs)
    require('./test_e2e.js')(yargs)
  })
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

  // Version
  .alias('v', 'version')
  .version(function () { return version })
  .describe('v', 'show version information')

  // Help
  .alias('h', 'help')
  .help('help')

  // Simple usage
  .usage('Usage: vue-build <command> [options]')
  .epilog('copyright ' + new Date().getFullYear())
  .showHelpOnFail(false, 'Specify --help for available options')

// If you dont send any commands show help
if (yargs.argv._.length === 0) {
  yargs.showHelp()
}
