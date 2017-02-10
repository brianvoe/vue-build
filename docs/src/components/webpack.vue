<template>
  <div>
    <h1>Webpack</h1>
    <p>
      By default, vue-build projects inherit their webpack configuration from
      vue-build itself. The base configuration includes:
    </p>
    <ul>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li>SASS support</li>
      <li>Hot module reloading in development</li>
      <li>Minification and CSS extraction for production builds</li>
    </ul>

    <p>If these features are all you need, then your project doesn't need a
    webpack configuration file at all.</p>

    <h2>Overriding default Webpack settings</h2>

    <p>To customize your Webpack settings, <strong>create a <code>webpack.config.js</code>
    file in the root of your project</strong>. Whatever settings hash you export from
    that file will be merged into vue-build's base configuration using the
    <a href="https://github.com/survivejs/webpack-merge#standard-merging" target="_blank">
    default merge strategy of webpack-merge</a>.</p>

    <p>So if you wanted to add LESS support, for instance, your <code>webpack.config.js</code>
    might look like this:</p>

    <pre v-highlightjs><code class="js">
      module.exports = {
        loaders: [
          {
            test: /\.(less)$/,
            loader: ['style-loader', 'css-loader?sourceMap', 'resolve-url-loader', 'less-loader?sourceMap']
          },
        ]
      }
    </code></pre>

    <p>For reference, you can find vue-build's base webpack configuration
    <a href="https://github.com/brianvoe/vue-build/blob/master/bin/config/webpack.base.config.js">here</a>, along with settings specific to
    <a href="https://github.com/brianvoe/vue-build/blob/master/bin/config/webpack.dev.config.js">development</a> and
    <a href="https://github.com/brianvoe/vue-build/blob/master/bin/config/webpack.prod.config.js">production</a>.</p>
  </div>
</template>
