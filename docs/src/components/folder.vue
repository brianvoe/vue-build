<template>
  <div>
    <h1>Folder Structure</h1>
    <p>
      The main goal was to create as simplistic of a folder structure as possible,
      but still allow additional flexibility for webpack configuration.
    </p>

    <h3>Minimum Structure</h3>
    <pre v-highlightjs><code class="bash">
    - :page_facing_up: .eslintrc
    - :file_folder: src
      - :page_facing_up: app.js - main file
    </code></pre>

    <h3>Full Structure</h3>
    <pre v-highlightjs><code class="bash">
    - :page_facing_up: .env - optional
    - :page_facing_up: webpack.config.js - optional see webpack wiki
    - :page_facing_up: .eslintrc
    - :file_folder: src
      - :page_facing_up: app.js - main file
    - :file_folder: test
      - :file_folder: unit
        - :file_folder: specs - test go here
        - :file_folder: coverage
      - :file_folder: e2e
        - :file_folder: specs - tests go here
        - :file_folder: commands - see nightwatch commands
        - :file_folder: assertions - see nightwatch assertions
        - :file_folder: page_objects - see nightwatch page_objects
        - :file_folder: globals
          - :page_facing_up: globals.js - see nightwatch globals path
        - :file_folder: report
        - :file_folder: screenshots - error screenshots
    </code></pre>
  </div>
</template>
