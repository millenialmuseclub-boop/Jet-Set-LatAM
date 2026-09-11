# iOS Release Checklist — Jet Set LatAm → TestFlight

Updated with actual Pass 7 results. Checked items were verified by an actual
command or automated test run in this pass, in a Linux-only sandbox with no
macOS, Xcode, simulator, or Apple Developer access. Unchecked items are
blocked on that access and were not attempted beyond what's noted. Do not
submit to App Review from this checklist — TestFlight only.

## 1. Native platform creation

- [x] `npm run build` (produces `dist/`, 3.4MB, `tsc -b` + `oxlint` both clean)
- [x] `npx cap add ios` — ran clean, created `ios/App/App.xcodeproj` using
      Swift Package Manager (`CapApp-SPM`), not CocoaPods
- [x] `npx cap sync ios` — ran clean, both new plugins
      (`@capacitor/status-bar`, `@capacitor/browser`) picked up correctly
- [ ] `npx cap open ios` (opens Xcode) — **blocked, no Xcode in this sandbox**
- [ ] Set the development team and confirm/adjust the bundle identifier in
      Xcode's Signing & Capabilities tab — **blocked, needs Xcode + an Apple
      Developer account**

## 2. Safe areas

- [x] CSS-level safe-area handling confirmed present (from Pass 6):
      `pt-safe` on `App.tsx`'s root wrapper, `pb-safe` on `BottomNav.tsx`,
      both mapping to `env(safe-area-inset-*)` via `src/index.css`
- [ ] Visual confirmation in the iPhone 15/16 Pro simulator (Dynamic Island)
      — **blocked, no simulator here**
- [x] Orientation: the app has no landscape-specific layout anywhere in the
      codebase and is designed portrait-only; locking orientation in Xcode
      (Info.plist `UISupportedInterfaceOrientations`) is a one-setting step
      left for the first real Xcode session — **not set, needs Xcode**

## 3. Status bar

- [x] Status bar style configured: `capacitor.config.ts`
      (`plugins.StatusBar.style: 'DARK'`) plus an explicit
      `StatusBar.setStyle()` call in `main.tsx` guarded by
      `Capacitor.isNativePlatform()`. Dark content chosen because the app's
      baseline background on every non-hero screen is light parchment.
- [ ] Visual confirmation the status bar doesn't overlay content awkwardly
      on hero images — **blocked, no simulator/device here**

## 4. App icon

- [x] Checked for an existing brand mark first — `public/favicon.svg` turned
      out to be a generic placeholder (purple gradient, unrelated to the
      app's actual palette), so a new mark was designed rather than adapted
- [x] Designed and exported a 1024×1024 icon (compass-star mark in the
      app's terracotta/gold/jungle palette), flattened to RGB with no
      transparency
- [x] Placed at `ios/App/App/Assets.xcassets/AppIcon.appiconset/` using the
      single-image Xcode 14+ catalog format — Xcode generates the rest of
      the size set from this one image at archive time
- [ ] Confirm it's assigned and renders correctly in Xcode's asset catalog
      viewer — **blocked, no Xcode here**

## 5. Splash screen

- [x] Designed a launch screen matching the app's brand: the same compass
      mark plus a "JET SET LATAM" wordmark, centered on the jungle-green
      brand gradient, sized so the aspect-fill crop stays within a safe
      center zone across device ratios
- [x] Written into the existing `ios/App/App/Assets.xcassets/Splash.imageset/`
      (all three scale slots) — the imageset/storyboard wiring already
      existed from `cap add ios` and didn't need restructuring
- [ ] Confirm no hang/flash before the WebView loads on-device — **blocked,
      no simulator/device here**
- Known simplification: the wordmark uses a generic system serif (no
  Cormorant Garamond font file was embeddable into a static launch image in
  this sandbox) — cosmetic only, not a functional gap

## 6. Offline launch

- [x] Automated (Playwright, not a real device): loaded four routes
      (`/`, a destination page, Saved, Plan a Trip) with every network
      request except `localhost` blocked — **zero console/network errors**
- [x] Found and fixed a real bug this pass: `src/index.css` loaded fonts via
      a remote `fonts.googleapis.com` `@import`, which would fail on every
      cold launch with no connectivity. Replaced with `@fontsource`-bundled
      Cormorant Garamond + Jost (latin/latin-ext subsets only, 728KB total),
      verified the real font resolves (not a silent fallback) via
      `getComputedStyle` in the same offline test run
- [ ] Force-quit/relaunch in Airplane Mode on an actual device — **blocked,
      no device here; the Playwright network-blocking test above is the
      closest available substitute**

## 7. External links

- [x] Decided: in-app browser via `@capacitor/browser`'s `Browser.open()`
      on native (keeps the user inside the app shell), plain `window.open`
      on web — implemented in `src/lib/links.ts`'s `openExternal()`, with a
      `window.open` fallback if the native call ever rejects
- [x] Routed every remaining raw `target="_blank"` anchor
      (`ItineraryEditor.tsx`'s Map/Website links, `GuideDetail.tsx`'s source
      article link) through the same helper — no inconsistent link handling
      left anywhere in the app
- [ ] Test tapping a Map/Website link on-device — **blocked, no device
      here**

## 8. Privacy manifest / data declarations

- [x] Created `ios/App/App/PrivacyInfo.xcprivacy` — minimal/empty
      declaration (`NSPrivacyTracking: false`, all required-reason/tracking
      arrays empty), matching the app's use of no analytics and no flagged
      APIs
- [x] Added to the Xcode project's Resources build phase by hand-editing
      `project.pbxproj` (file reference + build file + group + build-phase
      entries) — internally consistent (IDs cross-reference correctly,
      braces/parens balance) but **only a real Xcode open can fully confirm
      it parses and appears under the target's file list** — flagged, not
      claimed as verified
- [ ] Fill out the App Store Connect Privacy Nutrition Label — **blocked,
      requires an App Store Connect account**

## 9. Device testing

- [ ] Physical device — **blocked, no device here**
- [x] Full save/plan/use loop — verified via Playwright against the web
      build (not the native shell): save a Place, generate a trip, save it,
      reopen from Saved, add the saved place to a day, reorder, remove,
      reload, confirm persistence. All steps pass (see Pass 6/7 validation
      log). This is the same product logic the native WebView will run;
      what it can't verify is native chrome, touch feel, or real GPU
      performance.
- [ ] SE-class vs. Pro Max layout comparison on-device — **blocked, no
      device here**; web-level responsive testing at 390/834/1440px from
      Pass 6 still stands

## 10. Archive & build

- [ ] Bump build number — **blocked, needs Xcode**
- [ ] Product → Archive — **blocked, needs Xcode**
- [ ] Validate the archive — **blocked, needs Xcode**

## 11. TestFlight

- [ ] Upload — **blocked, needs a validated archive + Apple Developer
      credentials, neither available here**
- [ ] "What to Test" notes, internal testers, install confirmation — all
      **blocked** on the same

**Stop here.** Do not submit for external TestFlight review or App Store
review as part of this checklist — that's a deliberate later decision, not
an automatic next step once internal TestFlight works.

## What a Mac session needs to do next

Everything Node/Capacitor-CLI-level and web-code-level that this pass could
verify is done (sections 1 partial through 9 partial above). Every remaining
unchecked item needs a real Mac with Xcode and an Apple Developer account —
none of it can be completed, simulated, or partially faked from this
environment. The concrete first command on that Mac is `npx cap open ios`.
