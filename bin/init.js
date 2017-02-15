module.exports = function (yargs) {
  var path = require('path')
  var fs = require('fs-extra')
  let vueBuildRoot = path.join(__dirname, '../')
  var projectRoot = process.cwd()

  var inquirer = require('inquirer')
  inquirer.prompt([
    {type: 'confirm', name: 'packageFile', message: 'Create/Override package.json file?', default: true},
    {type: 'confirm', name: 'webpackFile', message: 'Create/Override webpack file?', default: true},
    {type: 'confirm', name: 'envFile', message: 'Create/Override env.js file?', default: true},
    {type: 'confirm', name: 'eslintFile', message: 'Create/Override .eslintrc file?', default: true},
    {type: 'confirm', name: 'sourceFolder', message: 'Create/Override /src folder?', default: true},
    {type: 'confirm', name: 'testFolder', message: 'Create/Override /test folder?', default: true}
  ])
  .then(function (answers) {
    console.log() // Console Spacing

    // package.json file
    if (answers.packageFile) {
      console.log('Creating package.json file')
      var packageJson = {
        name: 'app',
        version: '0.1.0',
        dependencies: {
          'vue-build': '^' + require('../package').version
        }
      }
      fs.writeFileSync(
        projectRoot + '/package.json',
        JSON.stringify(packageJson, null, 2)
      )
    }

    // webpack file
    if (answers.webpackFile) {
      console.log('Creating webpack file')
      fs.copy(vueBuildRoot + 'webpack.config.js', projectRoot + '/webpack.config.js', function (err) {
        if (err) { console.error(err); process.exit(1) }
      })
    }

    // .env file
    if (answers.envFile) {
      console.log('Creating env.js file')
      fs.copy(vueBuildRoot + 'default.env.js', projectRoot + 'env.js', function (err) {
        if (err) { console.error(err); process.exit(1) }
      })
    }

    // .eslintrc file
    if (answers.eslintFile) {
      console.log('Creating .eslintrc file')
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
    // test folder
    if (answers.testFolder) {
      console.log('Creating test folder')
      fs.copy(vueBuildRoot + 'test', projectRoot + '/test', function (err) {
        if (err) { console.error(err); process.exit(1) }
      })
    }
  })
}
