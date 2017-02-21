module.exports = function (yargs) {
  var path = require('path')
  var fs = require('fs-extra')
  var chalk = require('chalk')
  var inquirer = require('inquirer')
  var samplesRoot = path.join(__dirname, '../samples')
  var projectRoot = process.cwd()

  inquirer.prompt({
    type: 'list',
    name: 'select',
    message: 'What kind of project would you like to initiate?',
    choices: ['Simple', 'Full', 'Custom', 'Cancel']
  }).then(function (answers, yep) {
    var type = answers.select
    if (type === 'Cancel') { return }
    console.log() // Console Spacing

    // Simple installation
    if (type === 'Simple') {
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

    // Full installation
    if (type === 'Full') {
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

    // Custom installation
    if (type === 'Custom') {
      var customPath = path.join(samplesRoot, 'custom')
      inquirer.prompt([
        {type: 'confirm', name: 'packageFile', message: 'Create/Override package.json file?', default: true},
        {type: 'confirm', name: 'webpackFile', message: 'Create/Override webpack file?', default: true},
        {type: 'confirm', name: 'envFile', message: 'Create/Override env.js file?', default: true},
        {type: 'confirm', name: 'eslintFile', message: 'Create/Override .eslintrc file?', default: true},
        {type: 'confirm', name: 'sourceFolder', message: 'Create/Override /src folder?', default: true},
        {type: 'confirm', name: 'testFolder', message: 'Create/Override /test folder?', default: true}
      ])
      .then(function (answers) {
        // package.json file
        if (answers.packageFile) {
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
        if (answers.webpackFile) {
          console.log('Creating webpack file')
          fs.copy(path.join(customPath, 'webpack.config.js'), projectRoot + '/webpack.config.js', function (err) {
            if (err) { console.error(err); process.exit(1) }
          })
        }

        // .env file
        if (answers.envFile) {
          console.log('Creating env.js file')
          fs.copy(path.join(customPath, 'default.env.js'), projectRoot + '/env.js', function (err) {
            if (err) { console.error(err); process.exit(1) }
          })
        }

        // .eslintrc file
        if (answers.eslintFile) {
          console.log('Creating .eslintrc file')
          fs.copy(path.join(customPath, '.eslintrc'), projectRoot + '/.eslintrc', function (err) {
            if (err) { console.error(err); process.exit(1) }
          })
        }

        // source file
        if (answers.sourceFolder) {
          console.log('Creating source folder')
          fs.copy(path.join(customPath, 'src'), projectRoot + '/src', function (err) {
            if (err) { console.error(err); process.exit(1) }
          })
        }
        // test folder
        if (answers.testFolder) {
          console.log('Creating test folder')
          fs.copy(path.join(customPath, 'test'), projectRoot + '/test', function (err) {
            if (err) { console.error(err); process.exit(1) }
          })
        }
      })
    }
  })
}
