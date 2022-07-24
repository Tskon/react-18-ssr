/* eslint-disable */
const getConfig = require('./base.config')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const loaders = require('./_loaders')()
const plugins = require('./_plugins')()
/* eslint-enable */

const mainConfig = getConfig(loaders.serverList)

const config = {
  ...mainConfig,
  mode: 'production',
  entry: './src/entry.server.tsx',
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build/server'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: plugins.baseServerList,
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      allowlist: [ /\.css$/ ],
    }),
  ],
}

module.exports = config
