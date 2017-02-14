<h1 align="center"><a href="http://vue-build.com"><img width="100"src="https://vuejs.org/images/logo.png" /></a>ue-build</h1>

[![Build Status](https://travis-ci.org/brianvoe/vue-build.svg?branch=master)](https://travis-ci.org/brianvoe/vue-build)
[![NPM Downloads](https://img.shields.io/npm/dt/vue-build.svg)](https://www.npmjs.com/package/vue-build)

The build process is one of the ***most frustrating*** things about front end development and cluttering up your app with a bunch of config and packages you rarely ever need to think about doesn't help either.

Vue-build takes those frustrations and hopefully eliminates them with a set of popular use cases. Vue, Webpack 2, .env, Sass, Eslint(Standard), Karma, Mocha, Chai, Nightwatch

See the [docs](http://vue-build.com) for more details

## Features
- Command Line Scripts
- Webpack 2
  - Babel
  - Hot Reloading
  - Hot Middleware
  - Error Overlay
  - .env Processing
  - production css extraction
- Sass
- Eslint - Standard
- Unit Testing
  - Karma
  - Mocha
  - Chai
  - Code Coverage
- E2e Testing
  - Nightwatch
  - Selenium
  - Chrome Driver
  - Gecko(firefox) Driver

## Installation
```javascript
npm install -g vue-build
```

## Scripts
```javascript
// Initiate files/folders
vue-build init

// Run dev server
vue-build dev

// Production build to dist folder
vue-build prod

// Unit testing
vue-build unit

// E2e testing
vue-build e2e

// Linting
vue-build lint

// Help
vue-build help
```
See the [docs](http://vue-build.com) for more details

## Roadmap
  - Junit testing xml output for both unit and e2e testing
  - Possibly webpack dashboard? https://github.com/FormidableLabs/webpack-dashboard
  - Impliment port checking before build. https://www.npmjs.com/package/tcp-port-used
