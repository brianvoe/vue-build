<script>
  import npmImg from 'images/npm.png'
  import githubImg from 'images/github.png'

  export default {
    data () {
      return {
        npmImg,
        githubImg
      }
    }
  }
</script>

<style lang="scss">
  @import "~src/assets/css/variables.scss";

  .sidebar {
    .third-party {
      border-bottom: solid 1px $border-color;
      padding: 8px 8px 8px 0;
      margin: 0 0 8px 0;
      text-align: right;

      a {
        margin: 0 !important;
        padding: 0 0 0 4px;
        img {height: 20px;}
      }
    }
  }
</style>

<template>
  <div class="sidebar">
    <div class="third-party">
      <a href="https://www.npmjs.com/package/vue-build" target="_blank">
        <img :src="npmImg" />
      </a>
      <a href="https://github.com/brianvoe/vue-build" target="_blank">
        <img :src="githubImg" />
      </a>
    </div>
    <div class="links">
      <router-link to="/" exact>Home</router-link>
      <router-link to="/getting-started">Getting Started</router-link>
      <router-link to="/development">Development</router-link>
      <router-link to="/production">Production</router-link>
      <router-link to="/unit-testing">Unit Testing</router-link>
      <router-link to="/e2e-testing">E2e Testing</router-link>
      <router-link to="/linting">Linting</router-link>
      <router-link to="/help">Help</router-link>
      <router-link to="/env">Env Config</router-link>
      <router-link to="/webpack">Webpack</router-link>
      <router-link to="/structure">Structure</router-link>
    </div>
  </div>
</template>
