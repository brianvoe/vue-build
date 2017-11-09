var fs = require('fs-extra')
var path = require('path')
var spawn = require('child_process').spawn
var processRoot = process.cwd()
var testFolder = path.join(processRoot, '/test')

function installSample (type) {
  return new Promise(function (resolve, reject) {
    console.log('installing sample')
    var install = spawn('vue-build', ['init', `-s=${type}`], { stdio: 'inherit' })

    install.on('close', (code) => {
      console.log(`finished installing sample`)
      resolve()
    })
  })
}

function installPackages () {
  return new Promise(function (resolve, reject) {
    console.log('package installation')
    var install = spawn('npm', ['install'], { stdio: 'inherit' })

    install.on('close', (code) => {
      if (code !== 0) {
        reject(code)
      }

      console.log(`finished installing packages`)
      resolve()
    })
  })
}

function production () {
  return new Promise(function (resolve, reject) {
    console.log('building dist')
    var prod = spawn('vue-build', ['prod'], { stdio: 'inherit' })

    prod.on('close', (code) => {
      if (code !== 0) {
        reject(code)
      }

      console.log(`finished building dist`)
      resolve()
    })
  })
}

function test (type) {
  return new Promise(function (resolve, reject) {
    console.log('testing app')
    var prod = spawn('vue-build', [type], { stdio: 'inherit' })

    prod.on('close', (code) => {
      if (code !== 0) {
        reject(code)
      }

      console.log(`finished testing app`)
      resolve()
    })
  })
}

function simple () {
  return new Promise(function (resolve, reject) {
    process.chdir(processRoot)
    fs.emptyDir(testFolder, function (err) {
      if (err) { console.error(err) }

      process.chdir(testFolder)

      installSample('simple')
        .then(installPackages)
        .then(production)
        .then(resolve)
        .catch((err) => { reject(err) })
    })
  })
}

function full () {
  return new Promise(function (resolve, reject) {
    process.chdir(processRoot)
    fs.emptyDir(testFolder, function (err) {
      if (err) { console.error(err) }

      process.chdir(testFolder)

      installSample('full')
        .then(installPackages)
        .then(production)
        .then(() => test('unit'))
        .then(() => test('e2e'))
        .then(resolve)
        .catch((err) => { reject(err) })
    })
  })
}

function library () {
  return new Promise(function (resolve, reject) {
    process.chdir(processRoot)
    fs.emptyDir(testFolder, function (err) {
      if (err) { console.error(err) }

      process.chdir(testFolder)

      installSample('library')
        .then(installPackages)
        .then(production)
        .then(() => test('unit'))
        .then(resolve)
        .catch((err) => { reject(err) })
    })
  })
}

// Run samples one at a time
simple()
  .then(full)
  .then(library)
  .catch((error) => {
    console.log('Tests failed: ', error)
  })
