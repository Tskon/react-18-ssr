import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/app'

const rootEl = document.getElementById('root')
hydrateRoot(rootEl || document.body, (
  <BrowserRouter>
    <App />
  </BrowserRouter>
))
