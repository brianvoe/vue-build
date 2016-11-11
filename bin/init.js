module.exports = function (yargs) {
  var path = require('path')
  var copy = require('copy')
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
    console.log(answers)
    if (answers.envFile) {
      console.log('Creating env file')
      copy(vueBuildRoot + '.env', projectRoot, function (err, files) {
        if (err) { throw err }
      })
    }
  })
}
