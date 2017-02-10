<template>
  <div>
    <h1>Running Your App</h1>
    <p>To run your app for development, use the <pre v-highlightjs>vue-build dev</pre> command.</p>

    <pre v-highlightjs><code class="bash">
    vue-build dev
    vue-build dev --port=1324 // Optional - port
    vue-build dev --devtool="eval-source-map" // Optional - default "eval-source-map"
    </code></pre>

    <h3>Error overlay</h3>
    <p>
      During development if there are any linting,
      build syntax errors they will show up as a screen overlay in the browser.
    </p>
  </div>
</template>
