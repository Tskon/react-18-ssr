import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import serverInit from '../server'
import App from './app'

interface ServerAppProps {
  location: string
}

function serverApp(props: ServerAppProps) {
  return (
    <StaticRouter location={props.location}>
      <App />
    </StaticRouter>
  )
}

serverInit(serverApp)
