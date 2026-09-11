import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import './index.css'
import App from './App.tsx'

// Belt-and-suspenders alongside capacitor.config.ts's `plugins.StatusBar`
// block: explicit calls are more reliable across Capacitor/iOS versions than
// the config-only default, and this is a no-op on web (isNativePlatform()
// guards it, and the import itself is inert in a browser).
if (Capacitor.isNativePlatform()) {
  StatusBar.setStyle({ style: Style.Dark }).catch(() => {})
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
