<script>
  export default {

  }
</script>

<template>
  <div>
    <h1>Running Your App</h1>
    <p>
      To run your app for development, use the command listed below.
    </p>

    <pre v-highlightjs><code class="bash">
    vue-build dev
    vue-build dev --port=1324
    vue-build dev --devtool="eval-source-map"
    </code></pre>

    <h3>Error overlay</h3>
    <p>
      During development if there are any linting, syntax errors or module import issues,
      they will be displayed as an overlay in the current running browser.
    </p>
    <img width="100%" src="../assets/images/screenshots/error_screen.jpg" />
  </div>
</template>
