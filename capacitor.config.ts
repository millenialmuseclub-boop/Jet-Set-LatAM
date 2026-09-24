import { execFileSync } from 'node:child_process'
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
    CapacitorUpdater: {
      autoUpdate: false,
      statsUrl: '',
      publicKey: '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEA0TnpGNshjZhpvuwuJ1dGINYNwvbTYGblK+ryNQ8UrvQsxzg8UhDb\no9oibq1hhPy8tU0PrnuHJY6GLhCzeCzLvR9cF3GQexWXTctqMXape3yv1YxTz3/G\n8CsXNVwFEOtC1pqLXlB3sMjOdpTEn9CWgJFMcKg40Egdsd1ZqkJmqoJSJqiCNX7u\nANcdN14fBpl2K22MHBQzAXEBUm7UX5cB9A2LlrPMgDXs7YaRrNSeZiy8HorAXzPj\nGOP/MS1/Y73LuR4Xt/qvE7CPRIsbQxfAGwgEfoZHlKcHwJGg5eSmyNrr3DZfywPC\nwDSoZDS4ag/Gr1yzK9bN4RTSUAj6Z94BhwIDAQAB\n-----END RSA PUBLIC KEY-----\n',
      version: process.env.APP_BUILD_VERSION || execFileSync('git', ['log', '-1', '--format=%ct'], { encoding: 'utf8' }).trim(),
    },
    StatusBar: {
      style: 'DARK',
      overlaysWebView: false,
    },
  },
}

export default config
