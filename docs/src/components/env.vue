<template>
  <div>
    <h1>Environment Configuration</h1>
    <p>If you add a standard <code>.env</code> file to the project, its
    variables will be included in <code>process.env</code>, <strong>both
    during the build step and in your application code</strong>.</p>

    <p>For instance, the following <code>.env</code> file...</p>

    <pre v-highlightjs><code class="bash">
    ENVIRONMENT=development
    CUSTOMURL=http://customurl.com
    </code></pre>

    <p>...would allow you to do this during your
        <router-link to="/webpack">webpack configuration</router-link>...</p>

    <pre v-highlightjs><code class="javascript">
      // in [project root/webpack.config.js:

      if (process.env.ENVIRONMENT === 'development') {
        module.exports.someSetting = 'use this in development'
      }
    </code></pre>

    <p>...and this in your application itself:</p>

    <pre v-highlightjs><code class="javascript">
      data () {
        return {
           currentEnvironment: process.env.ENVIRONMENT // this will equal 'development'
        }
      }
    </code></pre>
  </div>
</template>
