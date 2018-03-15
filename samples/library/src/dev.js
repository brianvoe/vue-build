import Vue from 'vue'
import dev from 'src/dev.vue'

// note that these styles will not be included in your distribution builds
// (since they're only intended to be part of the test application)
import 'scss/dev-style.scss'

new Vue({
  render: (h) => h(dev)
}).$mount('#app')
