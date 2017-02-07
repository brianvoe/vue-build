import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// Components
import home from './components/home.vue'
import initiation from './components/initiation.vue'
import development from './components/development.vue'
import production from './components/production.vue'
import unit from './components/unit-testing.vue'
import e2e from './components/e2e-testing.vue'
import linting from './components/linting.vue'
import help from './components/help.vue'
import env from './components/env.vue'
import webpack from './components/webpack.vue'
import folder from './components/folder.vue'

export default new VueRouter({
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  routes: [
    { path: '/', component: home },
    { path: '/initiation', component: initiation },
    { path: '/development', component: development },
    { path: '/production', component: production },
    { path: '/unit-testing', component: unit },
    { path: '/e2e-testing', component: e2e },
    { path: '/linting', component: linting },
    { path: '/help', component: help },
    { path: '/env', component: env },
    { path: '/webpack', component: webpack },
    { path: '/folder', component: folder }
  ]
})
