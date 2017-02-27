var projectRoot = process.cwd()

// Overriding default base webpack config
module.exports = {
  resolve: {
    // Aliases - Used for pointing to reusable parts of your app
    alias: {
      'src': projectRoot + '/src',
      'images': projectRoot + '/src/assets/images',
      'scss': projectRoot + '/src/assets/scss'
    }
  }
}
