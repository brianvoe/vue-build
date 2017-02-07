import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// Components
import home from './components/home.vue'
import initiation from './components/initiation.vue'
import development from './components/development.vue'

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
      path: '/initiation',
      name: 'initiation',
      component: initiation
    },
    {
      path: '/development',
      name: 'development',
      component: development
    }
  ]
})
