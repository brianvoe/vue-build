<script>
  import libraryComponent from './index.vue'
  import logo from 'images/logo.png'

  export default {
    data () {
      return {
        someMessage: 'hello, from the parent app',
        logo
      }
    },

    components: {
      libraryComponent
    }
  }
</script>

<style lang="sass-loader">
  #app {
    .main {
      flex-wrap: wrap;

      .intro {
        flex: 0 1 auto;
      }
      .library-test {
        flex: 1 0 100%;
        border: 1px solid #41B883;
      }
    }
  }
</style>

<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <img :src="logo" />ue-build
      </div>
      <div class="tagline">
        library project
      </div>
    </div>
    <div class="main">
      <p class="intro">
        This is a Vue app containing your library, so that you can use the library
        while you're developing it. This code <strong>will not</strong> be
        included in your distribution builds.
      </p>
      <libraryComponent class="library-test" :message="someMessage"></libraryComponent>
    </div>

  </div>
</template>


  <div id="app">

  </div>
