<script>
  export default {
    data: function () {
      return {
        image: require('src/logo.png'),
        title: 'ue-Build',
        message: 'Nice job! Youve made it!',
        environment: process.env.ENVIRONMENT,
        port: process.env.PORT
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
      <div>{{message}}</div>
      <div>Environment: {{environment}}</div>
      <div>Port: {{port}}</div>
    </div>
  </div>
</template>
