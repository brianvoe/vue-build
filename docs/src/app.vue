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

<template>
  <div class="app">
    <div class="header">
      <div class="logo"><img :src="logo" />ue-build</div>
      <div class="tagline">Taking the frustrating build process and clutter out of your application</div>
    </div>
    <div class="container">
      <div class="sidebar"><navBar /></div>
      <div class="main">Main section</div>
    </div>
  </div>
</template>
