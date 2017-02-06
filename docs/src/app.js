import Vue from 'vue'
import app from 'src/app.vue'
import router from './router.js'

import 'src/assets/css/style.scss'

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: (h) => h(app)
})
