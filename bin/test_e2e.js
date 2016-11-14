module.exports = function (yargs) {
  // 1. start the dev server
  process.env.NODE_ENV = 'testing'
  process.env.ENVIRONMENT = 'testing'
  var server = require('./dev.js')(yargs)
  var path = require('path')

  // 2. run the nightwatch test suite against it
  // to run in additional browsers:
  //    1. add an entry in test/e2e/nightwatch.conf.json under "test_settings"
  //    2. add it to the --env flag below
  // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
  // For more information on Nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file
  var opts = []
  opts = opts.concat(['--config', path.join(__dirname, 'config/nightwatch.conf.js')])

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
