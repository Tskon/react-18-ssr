import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import serverRenderer from './serverRenderer'

const protocol = 'http'
const host = 'localhost'
const port = process.env.SERVER_PORT || 3333

dotenv.config()
const isDev = process.env.NODE_ENV === 'development'

export default (AppNode: unknown) => {
  const app = express()

  app.use(express.static('build/client', { index: false }))
  app.use(express.static('static'))
  app.use(bodyParser.json())
  app.use(express.urlencoded())

  app.use(serverRenderer(AppNode, isDev))

  app.listen(port, () => {
    console.log(`React-ssr-test-app web server at ${protocol}://${host}:${port}`)
  })
}
