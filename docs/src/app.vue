<script>
  import nav from './components/nav.vue'
  import logo from './assets/images/logo.png'
  export default {
    data: function () {
      return {
        logo
      }
    },
    computed: {
      isHome () {
        return this.$route.path === '/'
      }
    },
    components: {
      navBar: nav
    },
    methods: {}
  }
</script>

<template>
  <div class="app">
    <div class="header" :class="{'large': isHome}">
      <div class="logo"><img :src="logo" />ue-build</div>
      <div class="tagline">Taking the frustrating build process and clutter out of your application</div>
    </div>
    <div class="container">
      <navBar />
      <div class="main">
        <transition name="fade" mode="out-in" appear>
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
