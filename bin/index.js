#!/usr/bin/env node

require('resolve')('vue-build/bin/run.js', {
  basedir: process.cwd()
}, function (error, localRun) {
  // If error require relative run.js file
  if (error) {
    require('./run.js')
  } else {
    require(localRun)
  }
})
