<template>
  <div>
    <h1>Folder Structure</h1>
    <p>
      The main goal was to create as simplistic of a folder structure as possible,
      but still allow additional flexibility for webpack configuration.
    </p>

    <h3>Minimum Structure</h3>
    <pre v-highlightjs><code class="bash">
    - .eslintrc
    - src
      - app.js - main file
    </code></pre>

    <h3>Full Structure</h3>
    <pre v-highlightjs><code class="bash">
    - .env - optional
    - webpack.config.js - optional see webpack wiki
    - .eslintrc
    - src
      - app.js - main file
    - test
      - server.js - node express server routes
      - unit
        - specs - test go here
        - coverage
        - .eslintrc
        - .index.js - used to require context
      - e2e
        - specs - tests go here
        - commands - see nightwatch commands
        - assertions - see nightwatch assertions
        - page_objects - see nightwatch page_objects
        - globals
          - globals.js - see nightwatch globals path
        - report
        - screenshots - error screenshots
    </code></pre>
  </div>
</template>
