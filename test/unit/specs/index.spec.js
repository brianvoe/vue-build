import Vue from 'vue'
import app from 'src/app.vue'

describe('Simple assertion test', function () {
  it('Make sure test runs', function (done) {
    const vm = new Vue(app).$mount()

    let five = 6
    if (five === 5) {
      console.log('hello')
    }

    vm.message = 'foo'
    // wait a "tick" after state change before asserting DOM updates
    Vue.nextTick(() => {
      assert.equal(vm.message, 'foo', 'message doesnt equal foo')
      done()
    })
  })
})
