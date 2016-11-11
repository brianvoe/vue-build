module.exports = function (yargs) {
  var path = require('path')
  var fs = require('fs-extra')
  let vueBuildRoot = path.join(__dirname, '../')
  var projectRoot = process.cwd()

  var inquirer = require('inquirer')
  inquirer.prompt([
    {type: 'confirm', name: 'webpackFile', message: 'Create/Override webpack file?', default: true},
    {type: 'confirm', name: 'envFile', message: 'Create/Override env file?', default: true},
    {type: 'confirm', name: 'eslintFile', message: 'Create/Override eslint file?', default: true},
    {type: 'confirm', name: 'sourceFolder', message: 'Create/Override /src folder?', default: true},
    {type: 'confirm', name: 'testFolder', message: 'Create/Override /test folder?', default: true}
  ])
  .then(function (answers) {
    console.log() // Console Spacing

    // webpack file
    if (answers.webpackFile) {
      console.log('Creating webpack file')
      fs.copy(vueBuildRoot + 'webpack.config.js', projectRoot + '/webpack.config.js', function (err) {
        if (err) { console.error(err); process.exit(1) }
      })
    }

    // .env file
    if (answers.envFile) {
      console.log('Creating env file')
      fs.copy(vueBuildRoot + '.env', projectRoot + '/.env', function (err) {
        if (err) { console.error(err); process.exit(1) }
      })
    }

    // eslint file
    if (answers.eslintFile) {
      console.log('Creating eslint file')
      fs.copy(vueBuildRoot + '.eslintrc', projectRoot + '/.eslintrc', function (err) {
        if (err) { console.error(err); process.exit(1) }
      })
    }

    // source file
    if (answers.sourceFolder) {
      console.log('Creating source folder')
      fs.copy(vueBuildRoot + 'src', projectRoot + '/src', function (err) {
        if (err) { console.error(err); process.exit(1) }
      })
    }
    // source file
    if (answers.testFolder) {
      console.log('Creating test folder')
      fs.copy(vueBuildRoot + 'test', projectRoot + '/test', function (err) {
        if (err) { console.error(err); process.exit(1) }
      })
    }
  })
}
