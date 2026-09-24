import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'

const prefix = 'https://example.test/updates/jetset-latam/jetset-ios-v1/production'
const good = { appId: 'com.jetsetlatam.app', runtime: 'jetset-ios-v1', channel: 'production', version: '200', sha: 'a'.repeat(40), url: `${prefix}/bundles/${'a'.repeat(40)}.zip`, checksum: 'signed-checksum', sessionKey: 'encrypted-key' }
let native = true, online = true, current = '100', manifest = good, failure = false, queued = null
const calls = []
const updater = {
  notifyAppReady: async () => { calls.push('ready') },
  current: async () => ({ bundle: { version: current } }),
  getNextBundle: async () => queued,
  download: async options => { calls.push(options); if (failure) throw Error('bad signature'); return { id: 'download' } },
  next: async options => { calls.push(options) },
}
const exports = {}
const code = ts.transpileModule(readFileSync('src/lib/otaUpdater.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
vm.runInNewContext(code, {
  exports, AbortSignal,
  navigator: { get onLine() { return online } },
  fetch: async () => ({ ok: true, json: async () => manifest }),
  require: id => id === '@capacitor/core' ? { Capacitor: { isNativePlatform: () => native } }
    : id === '@capgo/capacitor-updater' ? { CapacitorUpdater: updater }
    : { OTA_CHANNEL: 'production', OTA_RUNTIME: 'jetset-ios-v1', OTA_PREFIX: prefix, OTA_MANIFEST_URL: `${prefix}/manifest.json` },
})
for (const bad of [null, {}, {...good, appId:'other'}, {...good, runtime:'v2'}, {...good, channel:'staging'}, {...good, url:'https://other.test/a.zip'}, {...good, checksum:''}, {...good, version:'NaN'}]) assert.equal(exports.validManifest(bad), false)
assert(exports.validManifest(good))
await exports.markAppReady()
assert.equal(calls.shift(), 'ready')
assert.equal(await exports.checkForOtaUpdate(), true)
assert.equal(calls.length, 2)
assert.equal(calls[1].id, 'download')
calls.length = 0
for (const version of ['200', '300', 'builtin']) { current = version; assert.equal(await exports.checkForOtaUpdate(), false) }
current = '100'; online = false
assert.equal(await exports.checkForOtaUpdate(), false)
online = true; native = false
assert.equal(await exports.checkForOtaUpdate(), false)
native = true; queued = {version:'200'}
assert.equal(await exports.checkForOtaUpdate(), false)
queued = null; manifest = {...good, runtime:'old'}
assert.equal(await exports.checkForOtaUpdate(), false)
assert.equal(calls.length, 0)
manifest = good; failure = true
assert.equal(await exports.checkForOtaUpdate(), false)
assert.equal(calls.length, 1, 'Failed download must never schedule activation')
failure = false; calls.length = 0
const first = exports.checkForOtaUpdate(), second = exports.checkForOtaUpdate()
assert.equal(first, second)
await first
assert.equal(calls.length, 2)
console.log('OTA: manifest isolation, upgrade ordering, offline/web skips, queued update, failure safety and concurrent checks passed.')
