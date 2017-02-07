<style lang="scss">
  .home-page {
    p { margin: 8px 0 10px 0; }
  }
</style>

<template>
  <div class="home-page">
    <h2><router-link to="/initiation">Initiation</router-link></h2>
    <p>Initiation will run a script that will create files and folders for your application</p>

    <h2><router-link to="/development">Development</router-link></h2>
    <p>Development is the process of running a hot reloading development server</p>

    <h2><router-link to="/production">Production</router-link></h2>
    <p>Production will build minfied files to the ```dist``` folder</p>

    <h2><router-link to="/unit-testing">Unit Testing</router-link></h2>
    <p>Unit testing will test files in the ```test/unit/specs``` folder</p>

    <h2><router-link to="/e2e-testing">E2e Testing</router-link></h2>
    <p>E2e testing will test files in the ```test/e2e/specs``` folder</p>

    <h2><router-link to="/linting">Linting</router-link></h2>
    <p>Linting will lint files in the ```src``` ```test/unit/specs``` ```test/e2e/specs``` folders</p>

    <h2 style="border: none;">
      <router-link to="/help">Help</router-link>
    </h2>

    <h2 style="border: none;">
      <router-link to="/env">Environment Config</router-link>
    </h2>

    <h2 style="border: none;">
      <router-link to="/env">Webpack Config</router-link>
    </h2>

    <h2 style="border: none;">
      <router-link to="/folder-structure">Folder Structure</router-link>
    </h2>
  </div>
</template>
