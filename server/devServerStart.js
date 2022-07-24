/* eslint-disable */
const compilerPromise = require('./utils/compilerPromise')
const express = require('express')
const path = require('path')
const nodemon = require('nodemon')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const clientConfig = require('../webpack/client.dev.config')
const serverConfig = require('../webpack/server.dev.config')
/* eslint-enable */

const paths = {
  clientBuild: path.resolve(__dirname, '../build/client'),
  serverBuild: path.resolve(__dirname, '../build/server'),
}

const app = express()

const WEBPACK_PORT = process.env.WEBPACK_PORT || (!isNaN(Number(process.env.SERVER_PORT)) ? Number(process.env.SERVER_PORT) + 1 : 8501)
const DEVSERVER_HOST = process.env.DEVSERVER_HOST || 'http://localhost'

const start = async() => {
  clientConfig.entry = [
    `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry,
  ]

  const multiCompiler = webpack([ clientConfig, serverConfig ])

  const clientCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === 'client',
  )
  const serverCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === 'server',
  )

  const clientPromise = compilerPromise('client', clientCompiler)
  const serverPromise = compilerPromise('server', serverCompiler)

  const watchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats,
  }

  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    return next()
  })

  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats,
      writeToDisk: true,
    }),
  )

  app.use(webpackHotMiddleware(clientCompiler))

  app.use('/static', express.static(paths.clientBuild))

  app.listen(WEBPACK_PORT)

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.error(stats.toString(serverConfig.stats))
      return
    }

    if (error) {
      console.error(error)
    }

    if (stats.hasErrors()) {
      const info = stats.toJson()
      const errors = info.errors[ 0 ].split('\n')
      console.error(errors[ 0 ])
      console.error(errors[ 1 ])
      console.error(errors[ 2 ])
    }
  })

  try {
    await serverPromise
    await clientPromise
  } catch (error) {
    console.error(error)
  }

  const script = nodemon({
    script: `${paths.serverBuild}/main.js`,
    ignore: [ 'src', 'webpack', './*.*', 'build/client', '**/locales', '**/tmp' ],
    delay: 200,
  })

  script.on('restart', () => {
    console.warn('Server side app has been restarted.')
  })

  script.on('quit', () => {
    console.log('Process ended')
    process.exit()
  })

  script.on('error', () => {
    console.error('An error occured. Exiting')
    process.exit(1)
  })
}

start()
