// Sub options for init command
exports.builder = {
  s: {
    alias: 'selection',
    type: 'string',
    choices: ['simple', 'full', 'custom'],
    describe: 'environment setting'
  }
}

// init command function
exports.handler = function (yargs) {
  var path = require('path')
  var fs = require('fs-extra')
  var chalk = require('chalk')
  var inquirer = require('inquirer')
  var samplesRoot = path.join(__dirname, '../samples')
  var projectRoot = process.cwd()
  var selection = yargs.selection

  // If selection parameter is passed in lets call the function directly
  if (selection) {
    if (selection === 'simple') { simple() }
    if (selection === 'full') { full() }
    if (selection === 'custom') { custom(true) }
    return
  }

  function simple () {
    fs.copy(path.join(samplesRoot, 'simple'), projectRoot, function (err) {
      if (err) { console.error(err); process.exit(1) }
    })

    // Create package.json
    fs.writeFileSync(
      path.join(projectRoot, 'package.json'),
      JSON.stringify({
        name: 'simple',
        description: 'Simple Vue Build Application',
        version: '0.1.0',
        dependencies: {
          'vue-build': '^' + require('../package').version
        }
      }, null, 2)
    )
    console.log(chalk.green('Created simple application!'))
  }

  function full () {
    fs.copy(path.join(samplesRoot, 'full'), projectRoot, function (err) {
      if (err) { console.error(err); process.exit(1) }
    })

    // Create package.json
    fs.writeFileSync(
      path.join(projectRoot, 'package.json'),
      JSON.stringify({
        name: 'app',
        description: 'Full Vue Build Application',
        version: '0.1.0',
        dependencies: {
          'vue-build': '^' + require('../package').version
        }
      }, null, 2)
    )
    console.log(chalk.green('Created full application!'))
  }

  function custom (answers) {
    var customPath = path.join(samplesRoot, 'custom')

    // package.json file
    if (answers === true || answers.packageFile) {
      console.log('Creating package.json file')
      fs.writeFileSync(
        path.join(projectRoot, 'package.json'),
        JSON.stringify({
          name: 'app',
          description: 'Custom Vue Build Application',
          version: '0.1.0',
          dependencies: {
            'vue-build': '^' + require('../package').version
          }
        }, null, 2)
      )
    }

    // webpack file
    if (answers === true || answers.webpackFile) {
      console.log('Creating webpack file')
      fs.copy(
        path.join(customPath, 'webpack.config.js'),
        path.join(projectRoot, '/webpack.config.js'), function (err) {
          if (err) { console.error(err); process.exit(1) }
        })
    }

    // env.js file
    if (answers === true || answers.envFile) {
      console.log('Creating env.js file')
      fs.copy(
        path.join(customPath, 'env.js'),
        path.join(projectRoot, '/env.js'), function (err) {
          if (err) { console.error(err); process.exit(1) }
        })
    }

    // .eslintrc file
    if (answers === true || answers.eslintFile) {
      console.log('Creating .eslintrc file')
      fs.copy(
        path.join(customPath, '.eslintrc'),
        path.join(projectRoot, '/.eslintrc'), function (err) {
          if (err) { console.error(err); process.exit(1) }
        })
    }

    // source file
    if (answers === true || answers.sourceFolder) {
      console.log('Creating source folder')
      fs.copy(
        path.join(customPath, 'src'),
        path.join(projectRoot, '/src'), function (err) {
          if (err) { console.error(err); process.exit(1) }
        })
    }
    // test folder
    if (answers === true || answers.testFolder) {
      console.log('Creating test folder')
      fs.copy(
        path.join(customPath, 'test'),
        path.join(projectRoot, '/test'), function (err) {
          if (err) { console.error(err); process.exit(1) }
        })
    }
  }

  inquirer.prompt({
    type: 'list',
    name: 'select',
    message: 'What kind of project would you like to initiate?',
    choices: ['Simple', 'Full', 'Custom', 'Cancel']
  }).then(function (answers) {
    var type = answers.select
    if (type === 'Cancel') { return }
    console.log() // Console Spacing

    // Simple installation
    if (type === 'Simple') { simple() }

    // Full installation
    if (type === 'Full') { full() }

    // Custom installation
    if (type === 'Custom') {
      inquirer.prompt([
        {type: 'confirm', name: 'packageFile', message: 'Create/Override package.json file?', default: true},
        {type: 'confirm', name: 'webpackFile', message: 'Create/Override webpack file?', default: true},
        {type: 'confirm', name: 'envFile', message: 'Create/Override env.js file?', default: true},
        {type: 'confirm', name: 'eslintFile', message: 'Create/Override .eslintrc file?', default: true},
        {type: 'confirm', name: 'sourceFolder', message: 'Create/Override /src folder?', default: true},
        {type: 'confirm', name: 'testFolder', message: 'Create/Override /test folder?', default: true}
      ])
      .then(function (answers) {
        custom(answers)
      })
    }
  })
}
