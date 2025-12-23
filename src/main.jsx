import React from 'react'
import ReactDOM from 'react-dom/client'
import { MiniKit } from '@worldcoin/minikit-js'
import App from './App.jsx'
import './index.css'

console.log('🔧 Installing MiniKit...')

// Install MiniKit with your App ID
// IMPORTANT: Replace with your actual App ID from https://developer.worldcoin.org
MiniKit.install('app_486e187afe7bc69a19456a3fa901a162')

console.log('✅ MiniKit installed')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)