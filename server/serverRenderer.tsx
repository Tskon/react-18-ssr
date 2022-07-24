import fs from 'fs'
import path from 'path'
import React from 'react'
import * as express from 'express'
import * as ReactDOMServer from 'react-dom/server'
import { discoverProjectStyles, getUsedStyles } from 'used-styles'
import Html from './html'
import getAssets from './utils/getAssets'

const serverRenderer: any = (AppNode: unknown, isDev: boolean) => async(req: express.Request, res: express.Response) => {
  const statsPath = path.resolve(__dirname, '../client/client-stats.json')
  const statsFile = fs.readFileSync(statsPath, { encoding: 'utf8', flag: 'r' })
  const stylesLookup = isDev ? null : discoverProjectStyles(path.resolve(__dirname, '../build/client'))

  const assets = getAssets(statsFile)

  const markup = ReactDOMServer.renderToString(
    <Html
      scripts={assets.scripts}
      css={assets.css}
      state={''}
      meta={{
        title: 'React-ssr-test-app',
        description: 'test description',
      }}
    >
      {/*@ts-ignore*/}
      <AppNode location={req.url} />
    </Html>,
  )

  if (stylesLookup) await stylesLookup

  const usedStyles = stylesLookup ? getUsedStyles(markup, stylesLookup) : []
  const criticalCSS = usedStyles.reduce((result, style) => {
    return result +`<link rel="stylesheet" type="text/css" href="${style}">`
  }, '')

  res.send(markup.replace('__CRITICAL_CSS__', criticalCSS))
}

export default serverRenderer
