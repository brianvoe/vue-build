var projectRoot = process.cwd()

var config = {
  output: { publicPath: '/dist/' },
  resolve: {
    // Aliases - Used for pointing to reusable parts of your app
    alias: {
      'src': projectRoot + '/src',
      'images': projectRoot + '/src/assets/images'
    }
  },
  performance: { hints: false }
}

module.exports = config
