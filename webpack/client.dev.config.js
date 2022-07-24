/* eslint-disable */
const getConfig = require('./base.config')
const path = require('path')
const loaders = require('./_loaders')()
const plugins = require('./_plugins')(true)
/* eslint-enable */

const mainConfig = getConfig(loaders.clientList)

const config = {
  ...mainConfig,
  mode: 'development',
  name: 'client',
  entry: [
    './src/entry.client.tsx',
  ],
  output: {
    path: path.resolve(__dirname, '../build/client'),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  plugins: [
    ...plugins.baseClientList,
    plugins.hmrPlugin,
    plugins.reactRefreshWebpackPlugin,
  ],
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
}

module.exports = config
