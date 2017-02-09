<template>
  <div>
    <h1>Development</h1>
    <p>Lets get you up and running with a development server with hot reloading
    and error overlay</p>

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
