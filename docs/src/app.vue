<script>
  import nav from './components/nav.vue'
  import logo from './assets/images/logo.png'
  export default {
    data: function () {
      return {
        logo
      }
    },
    components: {
      navBar: nav
    },
    methods: {}
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<template>
  <div class="app">
    <div class="header">
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
