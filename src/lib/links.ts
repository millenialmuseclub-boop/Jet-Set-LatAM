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

/** Spread onto an <a> for the same safe behavior when a real anchor tag
 *  (rather than a button + openExternal) is preferable, e.g. for semantic
 *  right-click/long-press support on web. Native taps should still prefer
 *  openExternal() so they route through @capacitor/browser. */
export function externalLinkProps(url: string) {
  return { href: url, target: '_blank', rel: 'noreferrer' } as const
}
