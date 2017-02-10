<template>
  <div>
    <h1>Unit Testing</h1>
    <p>
      You can run your project's unit tests using the <code class="bash">vue-build unit</code>
      command. The testing suite uses karma, chai, and chai as promised. It also supports code coverage via istanbul.
    </p>

    <h2>Writing tests</h2>

    <p>Every javascript file in the <code>[project root]/test/unit/specs</code> directory will
    execute in the browser when you run <code class="bash">vue-build unit</code>. Inside those files, you can write standard Mocha tests, e.g.</p>

    <pre v-highlightjs><code class="javascript">
    import MyComponent from 'src/components/my-component.vue'

    let vm
    describe('my component', function() {
      beforeEach(function() {
        vm = new MyComponent()
      })

      it('should exist', function() {
        assert.ok(vm)
      })
    })
    </code></pre>

    <p>Mocha and Chai are included as globals. For more information, refer to
    the <a href="https://mochajs.org/">Mocha docs</a> and
    <a href="http://chaijs.com/">Chai docs</a>. For information on unit testing
    Vue applications specifically, try the <a href="https://vuejs.org/v2/guide/unit-testing.html">official docs</a>.</p>

    <h2>Code coverage</h2>

    <p>If you run <code class="bash">vue-build unit</code> with the
    <code>--coverage</code> option, the tests will output a code coverage
    report to <code>[project root]/test/unit/coverage</code>, with both an
    <code>lcov.info</code> file and an HTML coverage report in the
    <code>lcov-report</code> subdirectory.</p>

    <h2>Running in continuous integration</h2>

    <p>By default, unit tests run in "watch" mode, running repeatedly on every
    file change until you terminate the process. For continuous integration environments, use the <code>--single-run</code> option to run the tests only one time. The process will exit with a success or failure code so
    that your CI server knows if your tests passed.</p>

    <h2>Running only some of your tests</h2>

    <p>Mocha's <a href="https://mochajs.org/#exclusive-tests">.only()</a>
    feature is a good way to run a few tests in isolation (and you don't have
    to restart the test runner to do it!). If you need to exclude a test by
    leaving it out of the build entirely, though, you can do that with
    the <code>--files</code> option:</p>

    <pre v-highlightjs><code class="bash">
    vue-build unit --files="**/*.js"
    vue-build unit --files="**/!(jquery).js"
    vue-build unit --files="**/(foo|bar).js"
    </code></pre>

    <p>Arguments to <code>--files</code> are automatically scoped to
    <code>[project root]/unit/specs</code>, so you don't need to include it.
    For information about the pattern-matching syntax, see the <a href="http://karma-runner.github.io/1.0/config/files.html">Karma
    docs</a>.</p>

    <h2>Determining what testing environment you're in</h2>

    <p>Hopefully you won't have to do this too often, but if you need to limit
    some behavior to <em>only</em> unit tests (or only e2e tests), you can access <code>process.env.TESTING_TYPE</code>
    from your code. Its value will be either <code>'e2e'</code> or <code>'unit'</code>.</p>

  </div>
</template>
