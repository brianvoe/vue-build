import Vue from 'vue'
import app from 'src/app.vue'

describe('Simple assertion test', function () {
  it('Make sure test runs', function () {
    const vm = new Vue(app).$mount()

    // Method call to update Message
    vm.updateMessage('foo')

    // Via return promise make sure message equals what it should
    return assert.equal(vm.message, 'foo Now go build something!', 'message doesnt equal foo')
  })

  it('Make server request', function () {
    return fetch('http://localhost:' + process.env.PORT + '/ok')
    .then(function (response) {
      return response.text()
    }).then(function (text) {
      assert.equal(text, 'ok', 'response from server does not match')
    }).catch(function (err) {
      throw new Error(err.message)
    })
  })
})
