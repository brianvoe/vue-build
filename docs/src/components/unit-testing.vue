<template>
  <div>
    <h1>Unit Testing</h1>
    <p>
      Unit tests are run using karma, chai, chai as promised and has the ability
      to output code coverage. If you have a server.js file exists in the test folder
      it will also spin that up for a test endpoints.
    </p>

    <pre v-highlightjs><code class="bash">
    vue-build unit
    vue-build unit --single-run // Will run a single time
    vue-build unit --environment="development" // Override default environment type
    vue-build unit --port="5555"
    vue-build unit --files="**/*.js"
    vue-build unit --coverage // Will run coverage reports
    </code></pre>

    <h3>Run Specific Files</h3>
    <p>The files parameter uses karma's usage of glob expressions. See karmas docs on file patterns [config](https://karma-runner.github.io/1.0/config/configuration-file.html)</p>
    <pre v-highlightjs><code class="bash">
    vue-build unit --files="**/*.js"
    vue-build unit --files="**/!(jquery).js"
    vue-build unit --files="**/(foo|bar).js"
    </code></pre>

    <h3>Available Variables</h3>
    <p>
      In many situations you may want to know in your code what kind of testing you are doing.
      So we have added a variable called TESTING_TYPE.
      To retrieve this value in your code just add ```process.env.TESTING_TYPE``` to get the
      type of testing you are running. The two values could either be 'e2e' or 'unit'
    </p>
  </div>
</template>
