Function.prototype.bind = require('function-bind')

function importAll (r) {
  r.keys().forEach(r)
}

importAll(require.context('./specs', true, /.*\.js$/))
importAll(require.context('../../src', true, /^((?!dev\.js|index\.html|\.ico|\.png|\.jpg).)*$/))
