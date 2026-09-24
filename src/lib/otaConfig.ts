// Separate app/runtime namespace: never consumes another app's updates.
export const OTA_RUNTIME = 'jetset-ios-v1'
export const OTA_CHANNEL = import.meta.env.VITE_OTA_CHANNEL === 'staging' ? 'staging' : 'production'
export const OTA_BASE = 'https://pub-9fa41a6ec38e4064b998f30a35df2cb0.r2.dev'
export const OTA_PREFIX = `${OTA_BASE}/updates/jetset-latam/${OTA_RUNTIME}/${OTA_CHANNEL}`
export const OTA_MANIFEST_URL = `${OTA_PREFIX}/manifest.json`
