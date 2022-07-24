/* eslint-disable */
const getConfig = require('./base.config')
const path = require('path')
const loaders = require('./_loaders')()
const plugins = require('./_plugins')()
/* eslint-enable */

const mainConfig = getConfig(loaders.clientList)

const config = {
  ...mainConfig,
  mode: 'production',
  entry: './src/entry.client.tsx',
  output: {
    path: path.resolve(__dirname, '../build/client'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  plugins: [ ...plugins.baseClientList, plugins.cleanWebpackPlugin ],
}

module.exports = config
