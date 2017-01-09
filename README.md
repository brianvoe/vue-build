<h1 align="center"><a href="https://vuejs.org"><img width="100"src="https://vuejs.org/images/logo.png" /></a>ue-build</h1>

[![Build Status](https://travis-ci.org/brianvoe/vue-build.svg?branch=master)](https://travis-ci.org/brianvoe/vue-build)

The build process is one of the ***most frustrating*** things about front end development and cluttering up your app with a bunch of config and packages you rarely ever need to think about doesn't help either.

Vue-build takes those frustrations and hopefully eliminates them with a set of popular use cases. Vue, Webpack 2, .env, Sass, Eslint(Standard), Karma, Mocha, Chai, Nightwatch

See the [wiki](https://github.com/brianvoe/vue-build/wiki) for more detailed information

Note: As we get closer to the release of webpack 2 primary functionality may change.

## Features
- Command Line Scripts
- Webpack 2
  - Hot Reloading
  - Hot Middleware
  - Error Overlay
  - .env Processing
- Sass
- Babel
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
See the [wiki](https://github.com/brianvoe/vue-build/wiki) for more detailed information

## Roadmap
  - Chunk Extracting
