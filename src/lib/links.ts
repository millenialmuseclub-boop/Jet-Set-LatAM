import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'

// Shared external-link handling. Centralized so the Capacitor swap (native
// apps should open Maps/Website links via a system-style browser, not by
// navigating the WebView away from the app) stayed a one-file change instead
// of a find-and-replace across every Place card.
//
// Web behavior: a safe new-tab navigation.
// Native (iOS/Android) behavior: Capacitor's in-app SFSafariViewController /
// Custom Tabs via @capacitor/browser — keeps the user inside the app shell
// instead of backgrounding it into Safari, and is the standard pattern for
// Capacitor apps opening Map/Website links from a Place card.
export function openExternal(url?: string) {
  if (!url) return
  if (Capacitor.isNativePlatform()) {
    Browser.open({ url }).catch(() => {
      // Fall back to a plain window.open if the plugin ever fails to load —
      // better a backgrounded app than a dead tap.
      window.open(url, '_blank', 'noopener,noreferrer')
    })
    return
  }
  window.open(url, '_blank', 'noopener,noreferrer')
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
  return { href: url, target: '_blank', rel: 'noreferrer' } as const
}
