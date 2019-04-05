const path = require('path')
const isDevelopment = process.env.NODE_ENV === 'development'
const isE2E = process.env.IS_E2E === 'true'

module.exports = {
  publicPath: isDevelopment || isE2E ? '/' : '/vue-image-pro/',
  outputDir: path.resolve(__dirname, './docs/'),
  css: { extract: isDevelopment },
  configureWebpack: {
    entry: './documentation/main.js',
    output: {
      libraryExport: 'default'
    }
  }
}
