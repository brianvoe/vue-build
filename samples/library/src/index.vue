<script>
  export default {
    props: ['message'],

    computed: {
      contextMessage () {
        if (!this.message) {
          return '(oops, the parent hasn\'t passed a message yet)'
        }

        return `Here's a message from outside the library: ${this.message}`
      }
    }
  }
</script>

<style lang="sass-loader">
</style>

<template>
  <div class="library-component">
    <h1>My Library Component</h1>

    <p>This is a running instance of your library. This code <strong>will</strong>
    be included in your distribution builds.</p>

    <p>{{contextMessage}}</p>
  </div>
</template>
