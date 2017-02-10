<template>
  <div>
    <h1>Linting</h1>
    <p>
      By default dev, unit/e2e testing and production run linting that is derived by the .eslintrc file.
      But if you would like to just lint you may do so with the below script.
    </p>

    <p>By default the linting settings is standard but you may make any alterations that you need in that file</p>

    <pre v-highlightjs><code class="bash">
    vue-build lint
    </code></pre>
  </div>
</template>
