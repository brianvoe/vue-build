module.exports = function (yargs) {
  var path = require('path')
  var fs = require('fs-extra')
  let vueBuildRoot = path.join(__dirname, '../')
  var projectRoot = process.cwd()

  console.log('vueRoot', vueBuildRoot + '.env')
  console.log('projectRoot', projectRoot)

  var inquirer = require('inquirer')
  inquirer.prompt([
    {type: 'confirm', name: 'envFile', message: 'Create env file?', default: true},
    {type: 'confirm', name: 'eslintFile', message: 'Create eslint file?', default: true},
    {type: 'confirm', name: 'sourceFolder', message: 'Create /src folder?', default: true},
    {type: 'confirm', name: 'testFolder', message: 'Create /test folder?', default: true}
  ])
  .then(function (answers) {
    console.log() // Console Spacing
    if (answers.envFile) {
      console.log('Creating env file')
      fs.copy(vueBuildRoot + '.env', projectRoot + '/.env', function (err) {
        if (err) {
          console.error(err)
          process.exit(1)
        }

        console.log('success')
      })
    }
  })
}
