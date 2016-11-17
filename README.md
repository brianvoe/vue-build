<h1 align="center"><a href="https://vuejs.org"><img width="100"src="https://vuejs.org/images/logo.png" /></a>ue-build</h1>

The build process is one of the ***most frustrating*** things about front end development and cluttering up your app with a bunch of config and packages you rarely ever need to think about doesn't help either.

Vue-build takes those frustrations and hopefully eliminates them with a set of popular use cases. Vue, Webpack 2, .env, Sass, Eslint(Standard), Karma, Mocha, Chai, Nightwatch

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

## Initiation
```javascript
// Initiate files/folders
vue-build init
```
See structure for more details

## Scripts
```javascript
// Run dev server
vue-build dev
vue-build dev --port=1324 // Optional - port

// Build
vue-build build

// Unit testing
vue-build unit
vue-build unit --single-run // Will run one time

// E2e testing
vue-build e2e

// Linting
vue-build lint

// Help
vue-build help
```

## Structure
The main goal was to create as simplistic of a folder structure as possible, but still allow additional flexibility for webpack configuration.
- :file_folder: app
  - :page_facing_up: .env - main environment config
  - :page_facing_up: webpack.config.js
  - :file_folder: src
    - :page_facing_up: app.js - main file
  - :file_folder: test
    - :file_folder: unit
      - :file_folder: specs - test go here
      - :file_folder: coverage
    - :file_folder: e2e
      - :file_folder: specs - tests go here
      - :file_folder: report
      - :file_folder: screenshots - error screenshots

## Roadmap
  - Chunk Extracting
  - Express server endpoint adding
  - Code coverage
  - More expressive console output
