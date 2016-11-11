module.exports = function (yargs) {
  var path = require('path')
  var copy = require('copy')
  let vueBuildRoot = path.join(__dirname, '../')
  var projectRoot = process.cwd()

  var inquirer = require('inquirer')
  inquirer.prompt([
    {type: 'confirm', name: 'envFile', message: 'Create env file?', default: true},
    {type: 'confirm', name: 'eslintFile', message: 'Create eslint file?', default: true},
    {type: 'confirm', name: 'sourceFolder', message: 'Create /src folder?', default: true},
    {type: 'confirm', name: 'testFolder', message: 'Create /test folder?', default: true}
  ])
  .then(function (answers) {
    console.log(answers)
    if (answers.envFile) {
      copy(vueBuildRoot + '.env', projectRoot, function (err, files) {
        if (err) { throw err }
      })
    }
  })
}
