# Jet Set LatAM OTA

Build 14 is the source baseline: 12 live destinations, Isla Barú coverage inside
Cartagena, the newer planner and all 87 Journal article bodies are preserved.

Build 15 is the one-time iOS bootstrap. Build 14 and older cannot receive OTA:
they do not contain a native updater. Install build 15 through TestFlight or the
App Store once it is available. Compatible future web updates do not need another
native build. Native plugins, permissions, signing-key changes or native runtime
changes still require a new native release.

## Infrastructure

Uses Let Them Eat's existing Cloudflare R2 bucket and signing key, without a Capgo
subscription or new hosting service. Existing R2 usage/billing still applies.
No private credentials are copied or exposed. The public key is embedded in iOS.

Jet Set's independent namespace is
`updates/jetset-latam/jetset-ios-v1/{staging|production}/`.
Let Them Eat's manifests are never changed by this publisher.

The manual **Publish Jet Set OTA** workflow lives in the
`millenialmuseclub-boop/Let-Them-Eat-Cake` repository so its existing secrets can
stay there. Its source is also recorded in `ops/jetset-ota-publish.yml` here.
It checks out an exact Jet Set commit, validates it, encrypts the bundle, uploads
the bundle first, then publishes the manifest. It refuses older/equal releases.

## Publish

1. Commit and push compatible web changes to Jet Set's main branch.
2. In Let-Them-Eat-Cake → Actions → Publish Jet Set OTA, enter the full Jet Set
   commit SHA and choose the channel. Production iOS builds use production;
   staging requires a native build whose web assets use VITE_OTA_CHANNEL=staging.
3. Verify the workflow succeeds and the manifest points to that commit.
4. On a device with build 15, launch online to download. The update is scheduled
   for a subsequent launch/background transition; it never forces a mid-session
   reload. Verify the changed screen and existing saved trips on the device.

The native compatibility tag `jetset-ota-runtime-v1` records the bootstrap source.
Publishing refuses changes to native files, package metadata/lockfile or native
configuration compared with that tag. Review dependencies before establishing a
new runtime; never move the existing compatibility tag to bypass this check.

## Native releases

Codemagic runs on explicit `ios-*` tags, not ordinary main pushes. The bootstrap
tag is `ios-1.0.1-build-15`. Its existing signing/TestFlight publishing remains.
The build embeds its commit timestamp so an older OTA cannot replace a newer
native bundle. The updater acknowledges readiness after the first route commits
inside Suspense. A failure before readiness can trigger the native watchdog;
later functional problems require an explicit corrective update.

## Recovery and verification

For a bad OTA, restore the good web code in a NEW commit and publish that newer
commit. Restoring an old manifest cannot downgrade devices that already updated.
Offline, invalid manifests, incompatible runtimes and signature/download failures
leave the current bundle in place. No saved-data schema or storage keys changed.

Checks: `npm run check:ota`, `npm run lint`, `npm run build`,
`node scripts/check-release.mjs`, `node scripts/check-discovery.mjs`, and
`node scripts/check-articles.mjs`. Native activation still needs a real device.
