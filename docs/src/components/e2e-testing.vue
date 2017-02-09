<template>
  <div>
    <h1>E2e Testing</h1>
    <p>
      End to end tests start a working dev environment then run nightwach(selenium) to test against.
      If you have a server.js file exists in the test folder it will also spin that up for a test endpoints.
    </p>

    <pre v-highlightjs><code class="bash">
    vue-build e2e
    vue-build e2e --port=9090 // Set alternative port
    vue-build e2e --devtool="eval" // Optional - default "eval"
    </code></pre>

    <h3>Browsers</h3>
    <p>
      Currently vue-build supports chrome, firefox and phantomjs. Default is chrome.
    </p>
    <pre v-highlightjs><code class="bash">
    vue-build e2e --browser="firefox"
    vue-build e2e --browser="chrome,firefox" // Run multiple browsers
    </code></pre>

    <h3>Test Port</h3>
    <p>If you want to do e2e tests against a port that is already running.</p>

    <strong>Note: You may want to run a specific environment for this; make sure to run vue-build dev --environment="testing"</strong>
    <pre v-highlightjs><code class="bash">
    vue-build e2e --test-port="8080"
    </code></pre>

    <h3>Tags</h3>
    <p>
      Tags is an easy way to test groups of tests.
      See <a href="http://nightwatchjs.org/guide#test-tags" target="_blank">nightwatch</a> for more info.
    <pre v-highlightjs><code class="bash">
    vue-build e2e --tags="login"
    vue-build e2e --tags="login,sanity" // multiple tags
    </code></pre>
    <p></p>
    <pre v-highlightjs><code class="javascript">
    module.exports = {
      '@tags': ['login', 'sanity'],
      'demo login test': function (client) {
         // test code
      }
    }
    </code></pre>

    <h3>Available Variables</h3>
    <p>
      In many situations you may want to know in your code what kind of testing you are doing.
      So we have added a variable called TESTING_TYPE.
      To retrieve this value in your code just add ```process.env.TESTING_TYPE``` to get the
      type of testing you are running. The two values could be either 'e2e' or 'unit'
    </p>

  </div>
</template>
