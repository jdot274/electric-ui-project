import 'source-map-support/register'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Root } from './Root'
import { setupDarkModeListenersRenderer } from '@electricui/utility-electron'
import './styles.css'

// Setup dark mode listeners
setupDarkModeListenersRenderer()

// Use the root div from index.html
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

// Create root using React 18 API
const root = createRoot(rootElement)

// Render the app
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
