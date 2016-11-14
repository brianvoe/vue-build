require('babel-register')
var projectRoot = process.cwd()

// http://nightwatchjs.org/guide#settings-file
module.exports = {
  'src_folders': [projectRoot + '/test/e2e/spec'],
  'output_folder': projectRoot + '/test/e2e/reports',
  'selenium': {
    'start_process': true,
    // If you get an error saying unable to access jarfile. make sure to update jar path here
    'server_path': 'node_modules/selenium-server/lib/runner/selenium-server-standalone-3.0.1.jar',
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': require('chromedriver').path,
      'webdriver.gecko.driver': require('geckodriver').path
    }
  },

  'test_settings': {
    'default': {
      'launch_url': 'http://localhost:' + process.env.PORT,
      'selenium_port': 4444,
      'selenium_host': 'localhost',
      'silent': true,
      'globals': {
        'devServerURL': 'http://localhost:' + process.env.PORT
      }
    },

    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },

    'firefox': {
      'desiredCapabilities': {
        'browserName': 'firefox',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    }
  }
}
