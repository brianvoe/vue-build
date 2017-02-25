<script>
  export default {
    data: function () {
      return {
        image: require('images/logo.png'),
        title: 'ue-Build',
        message: 'Nice job! Youve made it!'
      }
    },
    methods: {
      updateMessage: function (message) {
        let newMessage = message + ' Now go build something!'
        this.message = newMessage
      }
    }
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
      <h1><img :src="image" />{{title}}</h1>
      <div v-on:click="updateMessage(message)">{{message}}</div>
    </div>
  </div>
</template>
