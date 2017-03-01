import Vue from 'vue'
import library from 'src/index.js'

describe('Simple assertion test', function () {
  it('Make sure library runs', function () {
    const vm = library(document.createElement('div'))

    vm.message = 'foo'

    return assert.equal(vm.contextMessage, 'Here\'s a message from outside the library: foo')
  })
})
