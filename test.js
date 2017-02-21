var fs = require('fs-extra')
var path = require('path')
var readline = require('readline')
var exec = require('child_process').exec
var spawn = require('child_process').spawn
var processRoot = process.cwd()
var testFolder = path.join(processRoot, '/test')

process.chdir(processRoot)
fs.ensureDir(testFolder, function (err) {
  if (err) { console.error(err) }

  process.chdir(testFolder)

  var ls = spawn('vue-build', ['init'])
  ls.stdout.on('data', (data) => {
    console.log(`${data}`)
    // rl.write(null, {name: 'l'})
  })
  setTimeout(function () {
    ls.stdin.write('\n')
  }, 5000)

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`)
  })

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })

  // var cmd = exec('vue-build init', function (error, stdout, stderr) {
  //   console.log(error)
  //   console.log(stdout)
  //   console.log(stderr)
  // })
  // cmd.stdout.on('data', (data) => {
  //   console.log(`${data}`)
  // })
})
