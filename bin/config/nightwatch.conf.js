require('babel-register')
var fs = require('fs')
var projectRoot = process.cwd()
// Grab from .env file otherwise default is 9090
var port = process.env.E2E_PORT
var parallel = process.env.PARALLEL

// Setting
var defaultSettings = {
  'launch_url': 'http://localhost:' + port,
  'selenium_port': 4444,
  'selenium_host': '127.0.0.1',
  'silent': true,
  'screenshots': {
    'enabled': true,
    'on_failure': true,
    'on_error': true,
    'path': projectRoot + '/test/e2e/screenshots'
  }
}
var chromeSettings = Object.assign({}, defaultSettings, {
  'desiredCapabilities': {
    'browserName': 'chrome',
    'javascriptEnabled': true,
    'acceptSslCerts': true,
    'chromeOptions': {
      'args': ['--no-sandbox']
    }
  }
})
var firefoxSettings = Object.assign({}, defaultSettings, {
  'desiredCapabilities': {
    'browserName': 'firefox',
    'javascriptEnabled': true,
    'acceptSslCerts': true
  }
})

var nightwatchConfig = {
  'src_folders': [projectRoot + '/test/e2e/specs'],
  'output_folder': projectRoot + '/test/e2e/reports',
  'selenium': {
    'start_process': true,
    // If you get an error saying unable to access jarfile. make sure to update jar path here
    'server_path': 'node_modules/selenium-server/lib/runner/selenium-server-standalone-3.7.1.jar',
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': require('chromedriver').path,
      'webdriver.gecko.driver': require('geckodriver').path
    }
  },

  'test_settings': {
    // default is chrome
    'default': chromeSettings,
    'chrome': chromeSettings,
    'firefox': firefoxSettings
  }
}

if (parallel) {
  nightwatchConfig.test_workers = true

  // regular test output looks noisy when multiple tests run at once, this gives
  // a more compact representation while still showing errors on failure
  nightwatchConfig.detailed_output = false
}

// If folder exists for custom_commands_path
try {
  var commandPath = projectRoot + '/test/e2e/commands'
  fs.statSync(commandPath)
  nightwatchConfig.custom_commands_path = commandPath
} catch (err) {}

// If folder exists for custom_assertions_path
try {
  var assertionPath = projectRoot + '/test/e2e/assertions'
  fs.statSync(assertionPath)
  nightwatchConfig.custom_assertions_path = assertionPath
} catch (err) {}

// If folder exists for page_objects_path
try {
  var pageObjectsPath = projectRoot + '/test/e2e/page_objects'
  fs.statSync(pageObjectsPath)
  nightwatchConfig.page_objects_path = pageObjectsPath
} catch (err) {}

// If file exists for globals_path
try {
  var globalsPath = projectRoot + '/test/e2e/globals/globals.js'
  fs.statSync(globalsPath)
  nightwatchConfig.globals_path = globalsPath
} catch (err) {}

module.exports = nightwatchConfig
