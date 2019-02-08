module.exports = {
  publicPath: './',
  assetsDir: './',
  lintOnSave: false,
  devServer: {
    proxy: 'http://localhost:3000'
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  }
}
