<template>
  <div>
    <h1>Environment Configuration</h1>
    <p>
      If .env(optional) file is added to the project each variable will be passed and processed in the application build.
      In order to access variables in .env file just call process.env.[VARIABLE]
    </p>

    <pre v-highlightjs><code class="javascript">
    // config.js
    var config = {
       env: process.env.ENVIRONMENT,
       custom_url: process.env.CUSTOMURL
    }
    // Will output to
    var config = {
       env: 'development',
       custom_url: 'http://customurl.com'
    }
    </code></pre>

    <p>Example .env file</p>
    <pre v-highlightjs><code class="bash">
    ENVIRONMENT=development
    CUSTOMURL=http://customurl.com
    </code></pre>
  </div>
</template>
