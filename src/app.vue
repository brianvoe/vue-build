<script>
  export default {
    data: function () {
      return {
        title: 'Vue-Build',
        message: 'Nice job! Youve made it!',
        environment: process.env.ENVIRONMENT,
        port: process.env.PORT
      }
    }
  }
</script>

<style>
</style>

<template>
  <div id="app">
    <div class="content">
      <h1>{{title}}</h1>
      <div>{{message}}</div>
      <div>Environment: {{environment}}</div>
      <div>Port: {{port}}</div>
    </div>
  </div>
</template>
