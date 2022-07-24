/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {parsed: env} = require('dotenv').config( {
  path: path.join(__dirname, '../.env')
} )
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
/* eslint-enable */

module.exports = (isDev = false) => {
  const definePlugin = new webpack.DefinePlugin({
    'process.env.API_BASE_URL': JSON.stringify(env.API_BASE_URL),
  })

  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: 'src/example.html',
    filename: 'example.html',
    minify: {
      collapseWhitespace: true,
      keepClosingSlash: true,
      removeComments: false,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    },
  })

  const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin({
    async: false,
  })

  const esLintPlugin = new ESLintPlugin({
    extensions: [ 'js', 'jsx', 'ts', 'tsx' ],
  })

  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[id].css',
  })

  const bundleAnalyzerPlugin = new BundleAnalyzerPlugin()

  const cleanWebpackPlugin = new CleanWebpackPlugin()

  const clientLoadablePlugin = new LoadablePlugin({
    filename: 'client-stats.json',
    writeToDisk: true,
  })

  const hmrPlugin = new webpack.HotModuleReplacementPlugin()

  const reactRefreshWebpackPlugin = new ReactRefreshWebpackPlugin({
    overlay: {
      sockIntegration: 'whm',
    },
  })

  return {
    bundleAnalyzerPlugin,
    cleanWebpackPlugin,
    hmrPlugin,
    reactRefreshWebpackPlugin,

    baseClientList: [
      definePlugin,
      htmlWebpackPlugin,
      forkTsCheckerWebpackPlugin,
      esLintPlugin,
      miniCssExtractPlugin,
      clientLoadablePlugin,
    ],

    baseServerList: [
      definePlugin,
      forkTsCheckerWebpackPlugin,
      cleanWebpackPlugin,
    ],
  }
}
