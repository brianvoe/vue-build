#!/usr/bin/env node

/* eslint-env node */

var argv = require('minimist')(process.argv.slice(2))
var commands = argv._

// If no command show them the help output
if (commands.length === 0) {
  require('./help.js')
  process.exit()
}

function direct (name) {
  switch (name) {
    case 'help':
      require('./help.js')
      process.exit()
      break
    case 'version':
      require('./version.js')
      process.exit()
      break
    case 'dev':
      require('./dev.js')
      break
    default:
      require('./help.js')
  }
}
direct(commands[0])
