<template>
  <div>
    <h1>Help</h1>
    <p>
      Help basically has two types of scripts you can execute.
    </p>

    <h3 style="border: none;">Main help command</h3>
    <pre v-highlightjs><code class="bash">
    vue-build help
    </code></pre>

    <p></p>

    <h3>Sub command help</h3>
    <p>This will give you a terminal help output for that specific command and its available arguments.</p>
    <pre v-highlightjs><code class="bash">
    vue-build [command] --help
    </code></pre>
  </div>
</template>
