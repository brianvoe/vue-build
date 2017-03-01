<script>
  import logo from 'images/logo.png'

  export default {
    props: {
      message: {
        type: String,
        default: 'You\'ve made it!'
      }
    },

    data: function () {
      return {
        logo,
        title: 'ue-build',
      }
    },

    computed: {
      contextMessage () {
        return `${this.message} Now go build something!`
      }
    },
  }
</script>

<style lang="sass-loader">
  h1 {
    img {
      height: 50px;
    }
  }
</style>

<template>
  <div id="app">
    <div class="content">
      <h1><img :src="logo" />{{title}}</h1>
      <div>{{contextMessage}}</div>
    </div>
  </div>
</template>
