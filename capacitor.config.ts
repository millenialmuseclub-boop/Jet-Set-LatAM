import type { CapacitorConfig } from '@capacitor/cli'

// Native platforms exist under ios/ (Android not added yet). Status bar is
// set to dark content (dark icons) because the app's baseline background is
// the light parchment tone used on every non-hero screen (Saved, Plan,
// Trip Detail); hero photos on Discover/Destination pages sit under their
// own dark gradient overlay, which keeps dark icons legible there too.
const config: CapacitorConfig = {
  appId: 'com.jetsetlatam.app',
  appName: 'Jet Set LatAm',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      style: 'DARK',
      overlaysWebView: false,
    },
  },
}

export default config
