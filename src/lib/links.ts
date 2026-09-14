import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'
import { AppLauncher } from '@capacitor/app-launcher'

/** Avoid popup-dependent navigation: embedded previews may silently discard it.
 * iOS opens the partner in the system browser (or its associated app).
 * The existing in-app browser is a fallback if the OS refuses the handoff. */
export function openExternal(url?: string) {
  if (!url) return
  if (!Capacitor.isNativePlatform()) {
    window.location.assign(url)
    return
  }
  void openNative(url)
}

async function openNative(url: string) {
  try {
    const result = await AppLauncher.openUrl({ url })
    if (result.completed) return
  } catch { /* Try the installed browser plugin next. */ }
  try {
    await Browser.open({ url })
  } catch {
    window.alert(`This link could not open. Please try again, or open this address in Safari:\n\n${url}`)
  }
}

// Extracts a search query from a Google Maps URL (the shape every mapUrl in
// this project's data is authored in — a "/maps/search/?api=1&query=..." or
// "/maps/place/<name>/@lat,lng" link), so a native tap can hand it to Apple
// Maps directly instead of opening an in-app browser tab of Google Maps.
function extractMapQuery(url: string): string | undefined {
  try {
    const u = new URL(url)
    const q = u.searchParams.get('query') ?? u.searchParams.get('q')
    if (q) return q
    // "/maps/place/Some+Place/@19.43,-99.13,17z" — take the place segment.
    const placeMatch = u.pathname.match(/\/maps\/place\/([^/@]+)/)
    if (placeMatch) return decodeURIComponent(placeMatch[1].replace(/\+/g, ' '))
    return undefined
  } catch {
    return undefined
  }
}

/** Opens a Map link the native way: on iOS this hands off to Apple Maps via
 *  its `https://maps.apple.com/?q=...` universal link (opens the Maps app
 *  itself, not an in-app browser tab of Google Maps) when a query can be
 *  extracted from the stored Google Maps URL; otherwise falls back to
 *  openExternal() with the original URL unchanged. Web behavior is
 *  untouched — always the original URL in a new tab. No new Capacitor
 *  plugin: this is a plain URL-scheme substitution. */
export function openMap(url?: string) {
  if (!url) return
  if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios') {
    const query = extractMapQuery(url)
    if (query) {
      openExternal(`https://maps.apple.com/?q=${encodeURIComponent(query)}`)
      return
    }
  }
  openExternal(url)
}

/** Spread onto an <a> for the same safe behavior when a real anchor tag
 *  (rather than a button + openExternal) is preferable, e.g. for semantic
 *  right-click/long-press support on web. Native taps should still prefer
 *  openExternal() so they route through @capacitor/browser. */
export function externalLinkProps(url: string) {
  return { href: url } as const
}
