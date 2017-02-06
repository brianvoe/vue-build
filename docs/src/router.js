import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// Components
import home from './components/home.vue'
import gettingStarted from './components/getting-started.vue'
import installation from './components/installation.vue'

export default new VueRouter({
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/getting-started',
      name: 'getting-started',
      component: gettingStarted
    },
    {
      path: '/installation',
      name: 'installation',
      component: installation
    }
  ]
})
