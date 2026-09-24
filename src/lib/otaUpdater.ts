import { Capacitor } from '@capacitor/core'
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { OTA_CHANNEL, OTA_MANIFEST_URL, OTA_PREFIX, OTA_RUNTIME } from './otaConfig'

interface Manifest {
  appId: string
  runtime: string
  channel: string
  version: string
  sha: string
  url: string
  checksum: string
  sessionKey: string
}

export function validManifest(value: unknown): value is Manifest {
  if (!value || typeof value !== 'object') return false
  const m = value as Partial<Manifest>
  return m.appId === 'com.jetsetlatam.app' && m.runtime === OTA_RUNTIME &&
    m.channel === OTA_CHANNEL && typeof m.version === 'string' && /^\d+$/.test(m.version) &&
    Number.isSafeInteger(Number(m.version)) && Number(m.version) > 0 &&
    typeof m.sha === 'string' && /^[a-f0-9]{40}$/.test(m.sha) &&
    m.url === `${OTA_PREFIX}/bundles/${m.sha}.zip` &&
    typeof m.checksum === 'string' && m.checksum.length > 0 &&
    typeof m.sessionKey === 'string' && m.sessionKey.length > 0
}

let pending: Promise<boolean> | undefined

export async function markAppReady(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return
  try { await CapacitorUpdater.notifyAppReady() } catch { /* Keep startup working. */ }
}

export function checkForOtaUpdate(): Promise<boolean> {
  if (!pending) pending = check().finally(() => { pending = undefined })
  return pending
}

async function check(): Promise<boolean> {
  if (!Capacitor.isNativePlatform() || !navigator.onLine) return false
  try {
    const response = await fetch(OTA_MANIFEST_URL, { cache: 'no-store', signal: AbortSignal.timeout(15000) })
    if (!response.ok) return false
    const manifest: unknown = await response.json()
    if (!validManifest(manifest)) return false
    const { bundle } = await CapacitorUpdater.current()
    const current = Number(bundle.version)
    // Unknown native versions fail closed; native CI always embeds a timestamp.
    if (!Number.isSafeInteger(current) || Number(manifest.version) <= current) return false
    const next = await CapacitorUpdater.getNextBundle()
    if (next?.version === manifest.version) return false
    const downloaded = await CapacitorUpdater.download({
      url: manifest.url, version: manifest.version,
      checksum: manifest.checksum, sessionKey: manifest.sessionKey,
    })
    await CapacitorUpdater.next({ id: downloaded.id })
    return true
  } catch { return false }
}
