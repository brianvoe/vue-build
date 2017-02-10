<template>
  <div>
    <h1>Getting Started</h1>
    <p>
      Getting a vue application up and running with vue-build is extremely simple.
      First we need to globally install vue-build so that way we can easily run
      vue-build commands.
    </p>
    <pre v-highlightjs><code class="bash">
    npm install -g vue-build
    </code></pre>

    <h3>Creating a new application</h3>
    <p>
      By typing in the terminal the script below you will be asked a variation
      of questions that will help you setup your application files and folders
    </p>
    <pre v-highlightjs><code class="bash">
    vue-build init
    </code></pre>
    <p>
      <strong>Note:</strong> See <router-link to="/structure">folder structure</router-link> for more details
      on the minimum and maximum amount of files and folders needed to create an application.
    </p>
  </div>
</template>
