/* eslint-disable */
const path = require('path')
/* eslint-enable */

const getConfig = (loaderList) => ({
  module: {
    rules: loaderList,
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      '@': path.join(__dirname, '../src'),
    },
  },
  optimization: {
    splitChunks: { chunks: 'all' },
  },
})

module.exports = getConfig
