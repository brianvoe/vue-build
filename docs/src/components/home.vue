<style lang="scss">
  @import "~src/assets/css/variables.scss";

  .home-page {
    .first-script {
      width: 300px;
      margin: 0 auto;
      font-size: 18px;
      font-weight: bold;
    }

    .video {
      margin: 0 auto;
      width: 480px;
      padding: 8px 0 8px 0;
    }

    .features-list {
      display: flex;
      flex-direction: row;
      padding: 20px 0 0 0;

      .column {
        flex: 1 0 33%;
        text-align: center;

        .title {
          font-size: 18px;
          font-weight: bold;
          color: $primary;
          padding: 0 0 8px 0;
        }
      }
    }
  }
</style>

<template>
  <div class="home-page">
    <div class="first-script">
    <pre v-highlightjs><code class="bash">
    npm install -g vue-build
    </code></pre>
    </div>

    <p>
      A flexible build tool for VueJS projects with
      <a href="https://webpack.js.org/" target="_blank">Webpack 2</a>,
      <a href="http://sass-lang.com/" target="_blank">Sass</a>,
      <a href="http://eslint.org/" target="_blank">Eslint</a>,
      <a href="https://karma-runner.github.io/" target="_blank">Karma</a> and
      <a href="http://nightwatchjs.org/" target="_blank">Nightwatch</a>.
      Functional out-of-the-box, but easy to customize.
    </p>

    <div class="video">
      <a href="https://youtu.be/foKi4xHXlKw" target="_blank">
        <img src="http://img.youtube.com/vi/foKi4xHXlKw/0.jpg" alt="Vue Build" width="480" height="300" border="0" />
      </a>
    </div>

    <h3>Features</h3>
    <div class="features-list">

      <div class="column">
        <div class="title">Packages</div>
        <div>Vue 2</div>
        <div>Vuex</div>
        <div>Babel</div>
        <div>Es6</div>
        <div>Sass</div>
        <div>Eslint</div>
      </div>

      <div class="column">
        <div class="title">Webpack</div>
        <div>Hot Reloading</div>
        <div>Hot Middleware</div>
        <div>Error Overlay</div>
        <div>.env Processing</div>
        <div>Css Extraction</div>
      </div>

      <div class="column">
        <div class="title">Testing</div>
        <div>Karma</div>
        <div>Mocha</div>
        <div>Chai</div>
        <div>Code Coverage</div>
        <div>Nightwatch</div>
        <div>Selenium</div>
        <div>Chrome Driver</div>
        <div>Gecko(firefox) Driver</div>
        <div>PhantomJs Driver</div>
      </div>

    </div>
  </div>
</template>
