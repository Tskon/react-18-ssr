/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
/* eslint-enable */

module.exports = () => {

  const babel = {
    test: /\.(ts|js)x?$/i,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      },
    },
  }

  const fonts = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  }

  const svg = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [ {
      loader: '@svgr/webpack',
      options: {
        typescript: true,
        dimensions: true,
        svgo: true,
        memo: true,
      },
    } ],
  }

  const cssModulesClient = {
    test: /\.s?css$/,
    exclude: /\.global\.s?css$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: '[name]_[local]__[hash:base64:5]',
          },
        },
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          additionalData: '@import "src/assets/scss/index";',
        },
      },
    ],
  }

  const cssGlobalClient = {
    test: /\.global\.s?css$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: false,
        },
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          additionalData: '@import "src/assets/scss/index";',
        },
      },
    ],
  }

  const cssModulesServer = {
    test: /\.s?css$/,
    exclude: /\.global\.s?css$/i,
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            exportOnlyLocals: true,
            exportLocalsConvention: 'camelCase',
            localIdentName: '[name]_[local]__[hash:base64:5]',
          },
        },
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          additionalData: '@import "src/assets/scss/index";',
        },
      },
    ],
  }

  const cssGlobalServer = {
    test: /\.global\.s?css$/i,
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: false,
        },
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          additionalData: '@import "src/assets/scss/index";',
        },
      },
    ],
  }

  return {
    clientList: [
      babel,
      fonts,
      svg,
      cssModulesClient,
      cssGlobalClient,
    ],

    serverList: [
      babel,
      fonts,
      svg,
      cssModulesServer,
      cssGlobalServer,
    ],
  }
}
