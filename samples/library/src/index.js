import Vue from 'vue'
import index from 'src/index.vue'

import 'scss/style.scss'

export default (targetElement) => {
  const Component = Vue.extend(index)
  return new Component().$mount(targetElement)
}

