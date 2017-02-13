<template>
  <div>
    <h1>Folder Structure</h1>
    <p>vue-build tries to keep as much <strong>out</strong> of your project
    repo as possible -- if you're not using it (or overriding it), you
    should be able to delete it.</p>

    <p>In that spirit, here's the absolute minimum project structure that
    will work with vue-build:</p>

    <pre v-highlightjs><code class="bash">
    - .eslintrc
    - package.json
    - src
      - app.js - main file
    </code></pre>

    <p><code>app.js</code> is used as your project's entry point.</p>

    <p>A more specialized app (with tests and a custom build configuration)
    will look more like this:</p>

    <pre v-highlightjs><code class="bash">
    - .eslintrc
    - .env - optional
    - package.json
    - webpack.config.js - optional see webpack wiki
    - src
      - app.js - main file
    - test
      - server.js - node express server routes
      - unit
        - specs - test go here
        - coverage
        - reports
        - .eslintrc
        - .index.js - used to require context
      - e2e
        - specs - tests go here
        - commands - see nightwatch commands
        - assertions - see nightwatch assertions
        - page_objects - see nightwatch page_objects
        - globals
          - globals.js - see nightwatch globals path
        - reports
        - screenshots - error screenshots
    </code></pre>
  </div>
</template>
