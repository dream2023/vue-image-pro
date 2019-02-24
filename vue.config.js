const path = require('path')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  outputDir: path.resolve(__dirname, './doc/'),
  css: { extract: isDevelopment },
  configureWebpack: {
    entry: './documentation/main.js',
    output: {
      libraryExport: 'default'
    }
  }
}
