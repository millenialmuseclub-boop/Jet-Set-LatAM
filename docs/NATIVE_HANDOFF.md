# Native Handoff — iOS project exists, TestFlight blocked on macOS/Xcode (Pass 7 snapshot)

This is a record of what actually happened in Pass 7, run in a Linux-only
cloud sandbox with no macOS, no Xcode, no CocoaPods, no iOS Simulator, and no
Apple Developer credential access. Everything Node/Capacitor-CLI-level and
every web-code task is done and verified. Everything that requires opening
Xcode, signing, running on a simulator/device, or uploading to TestFlight is
**not done** — it needs a macOS machine, not more of this pass. See
`docs/IOS_RELEASE_CHECKLIST.md` for the itemized state of each step.

## What's new since Pass 6

- `ios/` now exists — a real Xcode project, created and synced via the
  Capacitor CLI (`npx cap add ios` / `npx cap sync ios`), both of which ran
  cleanly in this Linux sandbox. Capacitor 8's default iOS template uses
  Swift Package Manager (`CapApp-SPM`), not CocoaPods — so the "no
  CocoaPods" blocker anticipated in Pass 6 never actually applied.
- Real app icon and launch screen artwork (see below) — no longer
  placeholder/missing.
- `@capacitor/status-bar` and `@capacitor/browser` installed and wired in.
- `PrivacyInfo.xcprivacy` created and added to the Xcode project's Resources
  build phase by hand-editing `project.pbxproj` — mechanically correct
  (verified brace/paren balance and cross-referenced IDs), but **only Xcode
  opening the project can fully confirm it parses**; that hasn't happened.
- Google Fonts now bundled via `@fontsource` instead of a remote
  `fonts.googleapis.com` `@import` — fixes a real offline bug found this
  pass (see below).
- `TripContext` type + `getTripContext()` helper — ecosystem foundation,
  unused by the app itself.
- "Make It Yours" section on Trip Detail — two coming-soon cards.

## Framework versions

Unchanged from Pass 6: React 19.2.8 + TypeScript + Vite 8, Tailwind CSS v4,
React Router 7.18.3 (`HashRouter`), Framer Motion 13, lucide-react.

## Capacitor

`@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`, `@capacitor/android`
at `^8.5.1`, plus now `@capacitor/status-bar@^8.0.3` and
`@capacitor/browser@^8.0.4`. **`ios/` exists** (`npx cap add ios` has been
run). Android was not added — out of scope for this pass, same as Pass 6.

`npx cap sync ios` runs clean and reports both plugins picked up into
`ios/App/CapApp-SPM`'s `Package.swift` — no CocoaPods step, no `pod install`
failure to route around, because this Capacitor version doesn't use
CocoaPods by default.

## App identity

Unchanged: `appId` `com.jetsetlatam.app`, `appName` `Jet Set LatAm`. Still
not registered in App Store Connect — that's an Apple Developer portal step,
not something this pass could do.

## Build

`npm run build` → `dist/` (3.4MB total). `npx tsc -b` and `npx oxlint .` both
pass clean. `npx cap sync ios` copies `dist/` into
`ios/App/App/public/`. No test script exists in `package.json`.

## Status bar

Configured two ways for redundancy: `capacitor.config.ts`'s
`plugins.StatusBar` block (`style: 'DARK'`, `overlaysWebView: false`) and an
explicit `StatusBar.setStyle({ style: Style.Dark })` call in `main.tsx`,
guarded by `Capacitor.isNativePlatform()` (a no-op on web). Dark content
(dark icons) was chosen because the app's baseline background on every
non-hero screen (Saved, Plan, Trip Detail) is the light parchment tone; hero
photos on Discover/Destination pages sit under their own dark gradient
overlay at the top, which keeps dark icons legible there too. **Not verified
on an actual notched device or simulator** — that verification is blocked
here.

## App icon

**Done.** No existing brand mark was found in the project — `public/favicon.svg`
turned out to be a generic default template favicon (a purple gradient
shape unrelated to the app's parchment/terracotta/jungle palette), not a
real Jet Set LatAm mark, so a new one was designed rather than adapted. It's
an asymmetric four-point compass star (wayfinding, not literal travel iconography)
in the app's own terracotta/gold/jungle palette, with a thin outer ring and
cardinal ticks. Rendered from `scripts/icon-source.svg` at 1024×1024,
flattened to RGB (no alpha channel — required for App Store icons), and
placed at `ios/App/App/Assets.xcassets/AppIcon.appiconset/` using the
single-image Xcode-14+ asset catalog format (`Contents.json` declares one
`universal`/`1024x1024` entry; Xcode generates the rest at archive time).
Checked legible at 40×40px, not just at full size.

## Splash screen

**Done.** Same compass mark plus a "JET SET LATAM" wordmark, centered on the
brand's jungle-green gradient, built from `scripts/splash-source.svg` at
2732×2732 and written into the existing
`ios/App/App/Assets.xcassets/Splash.imageset/` (all three scale slots — the
imageset and its `Contents.json` already existed from `cap add ios` and
didn't need restructuring). The wordmark uses a generic system serif
(DejaVu Serif, the only serif available in this sandbox) rather than the
app's actual Cormorant Garamond — a native launch image can't load a
webfont, and embedding a custom font file into a static asset pipeline
wasn't attempted this pass. **Known simplification, not a defect**: swapping
in a true Cormorant Garamond-rendered wordmark (e.g. exported once from a
design tool) would be a straightforward polish pass whenever someone has a
few minutes with real font access. No animation, per the checklist.

## Offline launch — one real bug found and fixed

Testing "does this app run cleanly with zero network" (checklist #6)
surfaced an actual issue, not just an unverified checkbox: `src/index.css`
loaded fonts via a remote `@import url("https://fonts.googleapis.com/...")`.
A native WebView on a cold launch with no connectivity would fail that
request every time — silently falling back to system serif/sans-serif
(not a crash), but a real, visible miss for an editorial, typography-led
app whose whole identity leans on Cormorant Garamond.

Fixed by installing `@fontsource/cormorant-garamond` and `@fontsource/jost`
(the same two families, same weights, bundled as regular npm packages) and
importing only the `latin` and `latin-ext` subsets (covers English, Spanish,
and Portuguese with accents — this app never needs Cyrillic/Vietnamese/Greek
glyphs, so those subsets were deliberately left out rather than importing
the full family, which would have added ~600KB of unused font files).
Verified with a Playwright pass that blocks every network request except
`localhost` across four routes (`/`, a destination page, Saved, Plan a
Trip): **zero console/network errors, and the real Cormorant Garamond font
resolves** (checked via `getComputedStyle`, not just "no error thrown").
Font payload: 728KB total across both families/subsets, bundled into
`dist/assets/` like every image.

Bundled image strategy (Pass 6) is unchanged: everything else was already
offline-safe.

## External links

`src/lib/links.ts`'s `openExternal()` is now native-aware: on
`Capacitor.isNativePlatform()`, it opens the URL via `@capacitor/browser`'s
`Browser.open()` (an in-app SFSafariViewController-style view) instead of
`window.open`, with a `window.open` fallback if the plugin call ever
rejects. Web behavior is unchanged. The two remaining raw
`target="_blank"` anchors flagged in the Pass 6 snapshot
(`ItineraryEditor.tsx`'s Map/Website icon-links, `GuideDetail.tsx`'s source
article link) are now routed through `openExternal()` too — no more
inconsistent link handling anywhere in the app. **Not tested on an actual
device** — that verification is blocked here; the code path is exercised by
the existing Playwright suite only up to the `Browser.open()` call boundary
(mocked away since there's no native runtime in this sandbox).

## Privacy manifest

`ios/App/App/PrivacyInfo.xcprivacy` created — a minimal/empty declaration
(`NSPrivacyTracking: false`, all four required arrays empty), consistent
with the app using no analytics, no tracking, and no "required reason" APIs.
Added to the Xcode project by hand-editing `project.pbxproj` (a
`PBXFileReference`, a `PBXBuildFile`, and entries in the `App` group and the
`Resources` build phase) — mechanically sound (IDs cross-reference
correctly, braces/parens balance), but **this needs a first open in real
Xcode to fully confirm** — a hand-edited `.pbxproj` is the one file in this
pass that couldn't be validated by any tool available here.

## Local persistence

Unchanged from Pass 6 — `localStorage` only, via `src/lib/storage.ts`, same
three keys, same try/catch wrapping.

## Ecosystem foundation (Luxe Jetter / Little Jetter)

Added, purely additive, not wired into any UI flow or the planner:

- `TripContext` (in `src/types/index.ts`) — a small interface (`tripId`,
  `destinationId`, `destinationName`, `city`, `country`, optional
  `startDate`/`endDate`, `days`, `companions`, `interests`, `style`, `pace`)
  describing a saved trip in terms a sibling product could consume without
  importing anything else from this app.
- `getTripContext(tripId)` (in `src/lib/tripContext.ts`) — derives a
  `TripContext` on demand from existing storage (`getTrip` +
  `getEffectiveItinerary`). Nothing stores or syncs a `TripContext`
  anywhere; nothing in Jet Set LatAm calls this function. It exists only as
  the smallest possible seam for a future handoff.
- A "Make It Yours" section at the bottom of Trip Detail only: two
  quiet, editorial "coming soon" cards — Luxe Jetter ("What am I wearing?")
  and Little Jetter ("How are the kids joining?") — plainly non-functional,
  no fake interactivity, nothing added anywhere else in the app. Jet Set
  LatAm has no kids'-app functionality and none was added.

## Permissions / analytics

Unchanged: none of either.

## Native project status

`ios/App/App.xcodeproj` exists, with a Swift Package Manager dependency on
Capacitor's core, iOS runtime, and the two new plugins. `npx cap sync ios`
runs clean. Android was not added.

## Known blockers before TestFlight (all require macOS + Xcode)

1. **No macOS/Xcode/simulator in this sandbox** — the project has never
   actually been opened, built, or run. Everything documented above was
   verified at the Node/Capacitor-CLI/web level and by hand-inspecting the
   generated project files; none of it has been confirmed by Xcode itself.
2. Bundle identifier `com.jetsetlatam.app` is not registered in App Store
   Connect — needs a real Apple Developer Team ID and provisioning,
   configured in Xcode's Signing & Capabilities tab.
3. No code signing has been attempted or is possible here — no Apple
   Developer credentials exist in this environment.
4. Safe-area CSS (`pt-safe`/`pb-safe`, already implemented since before
   Pass 6) and the new status bar config are both unverified on a real
   notch/Dynamic-Island device or simulator.
5. `PrivacyInfo.xcprivacy`'s inclusion in the Xcode project was done by hand
   and should be double-checked by opening the project once in Xcode.
6. No device or simulator testing of any kind has occurred — no simulator
   exists in this sandbox.
7. No archive has been attempted — Xcode's Product → Archive requires
   Xcode.
8. No TestFlight upload has been attempted — requires a validated archive
   and Apple Developer credentials, neither available here.

## Recommended next steps (on a real Mac)

```bash
npx cap open ios   # opens Xcode
```

Then in Xcode: set the development team and confirm the bundle identifier,
verify `PrivacyInfo.xcprivacy` shows up under the App target's file list,
run on the iPhone 15/16 Pro simulator to check safe areas and the status
bar, run on at least one physical device, then Product → Archive → Validate
→ upload via Organizer. See `docs/IOS_RELEASE_CHECKLIST.md` for the full
step-by-step — it's now updated to reflect exactly what's done vs. pending.

## Ecosystem — Pass 8 update

Pass 8 built the "wow factor and ecosystem" pass on top of this foundation.
See `docs/CONTENT_INVENTORY.md` for the Tulum destination this pass added.

- `src/config/appFamily.ts` — a typed registry of all four Jet Set apps
  (Jet Set LatAm, Luxe Jetter, Little Jetter, Rallii) with name/description/
  icon/status. No invented URLs: Jet Set LatAm is the only `status: 'live'`
  entry; the other three are `status: 'coming-soon'` with every
  `webURL`/`iOSURL`/`deepLinkScheme` left `undefined`. Update this file the
  moment a real URL is verified — never before.
- `TripContext.selectedPlaces` — a new optional field (deduped place ids
  from the itinerary's day activities), populated by `getTripContext()`.
  Still purely additive/derived — nothing stores or syncs it.
- `Destination.railiiConnection` — an optional field, populated ONLY where
  a genuine, already-documented connection exists. As of this pass, that's
  Guadalajara's José Cuervo Express (a real scenic train, already a Place
  in `guadalajara.ts` since Pass 5) — no other destination got this field.
- "Make It Yours" on Trip Detail is now contextual instead of two static
  cards: Luxe Jetter always shows (still an inert "coming soon" card, no
  real URL), Little Jetter only shows when the trip's companions is
  `'family'`, and a Rallii card only shows when the destination has a real
  `railiiConnection`. A matching Rallii card also appears on
  `DestinationDetail`'s overview tab for destinations with the field, and a
  small Little Jetter mention appears on the Plan a Trip result screen for
  family trips.
- Real affiliate infrastructure wired in for the first time: two ShopMy
  collection URLs (`https://shopmy.us/collections/embed/2799513` — hotel,
  `https://shopmy.us/collections/embed/2687505` — clothing), found
  associated with Copacabana Palace content and consistent with the real
  creator's own ShopMy platform. Rendered via a new `ShopTheLookCard`
  (Luxe Jetter-flavored, not a generic per-Place booking button — no such
  per-place affiliate infra exists) on Rio's Copacabana Palace place card,
  with a small reusable `AffiliateDisclosure` component next to it. These
  are the only two affiliate URLs anywhere in the app.
- `PostcardGallery` — a new varied-layout photo-essay component (large
  landscape → two portraits → caption → full-width, repeating), used on
  Mexico City's destination page (richest verified photo count) and as a
  condensed teaser on Discover.
- Discover gained Art + Design, Postcards From Mexico City, Weekend
  Somewhere (the GUIDE-tier destinations), and a small non-dominant "Our
  World" app-family section. Destinations.tsx now uses friendly copy
  ("Plan-ready" / "Explore" / "Coming soon") instead of raw tier labels.
- Little Jetter and Rallii remain **not built** as real products — only
  contextual, inert mentions exist, same "ecosystem foundation, not a
  feature" posture as Pass 7.
  _(Superseded Sept 2026: all five Jordypop apps, including Little Jetter,
  are live on the App Store and linked from `src/config/appFamily.ts`.)_

## Explicitly not done (by instruction)

- No OTA update mechanism.
- No accounts, subscriptions, or cloud sync.
- Nothing has been submitted, archived, signed, or uploaded to TestFlight —
  all blocked on macOS/Xcode/Apple Developer access this sandbox doesn't
  have, not skipped by choice.
- Luxe Jetter and Little Jetter are not built — only the `TripContext` seam
  and a coming-soon teaser exist.
  _(Superseded Sept 2026: all five Jordypop apps, including Little Jetter,
  are live on the App Store and linked from `src/config/appFamily.ts`.)_
