import Vue from 'vue'
import app from 'src/app.vue'
import router from './router.js'
import hljs from 'highlightjs'

import './assets/css/style.scss'

Vue.directive('highlightjs', {
  deep: true,
  bind: function (el, binding) {
    // on first bind, highlight all targets
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      // if a value is directly assigned to the directive, use this
      // instead of the element content.
      if (binding.value) {
        target.innerHTML = binding.value
      }
      hljs.highlightBlock(target)
    })
  },
  componentUpdated: function (el, binding) {
    // after an update, re-fill the content and then highlight
    let targets = el.querySelectorAll('code')
    targets.forEach((target) => {
      if (binding.value) {
        target.innerHTML = binding.value
        hljs.highlightBlock(target)
      }
    })
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: (h) => h(app)
})
