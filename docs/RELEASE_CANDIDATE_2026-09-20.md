# Release candidate stabilization — 2026-09-20

Prepared locally: iOS **1.0.1 (12)**, bundle **com.jetsetlatam.app**. No commit, push, remote build, upload or TestFlight trigger performed. Codemagic still triggers publication on a main-branch push; do not push until separately approved.

## Fixed
- Nightlife recommendations appeared at 10:30/15:00. Adult nightlife plans now use the existing 21:00 slot in place of the last exploration slot, preserving pace and ordered times. Generation, swaps and day adjustments reject daytime bars/nightlife. This is a broad daypart rule, not live opening-hour or routing verification.
- Swaps silently discarded notes and retained misleading activity labels. Noted/visited stops are protected; swapping updates non-meal labels. Notes must be cleared explicitly before a swap.
- Destructive confirmations now use the existing accessible drawer: focus containment/restoration, Escape, scroll locking and reduced-motion CSS. Focus initially lands on Close.
- Video autoplay now respects reduced motion. Manual playback remains available.
- Removed structuredClone/Array.at dependencies from day adjustments, undo and template copying; added a randomUUID fallback and a More-menu dialog fallback. Those APIs were unavailable in early iOS 15 despite the declared minimum. Reference: https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/
- Mobile editor inputs use 16px text to avoid iOS focus zoom.

## Evidence
- Production TypeScript/Vite build and lint pass.
- Existing content/integrity (180 plans), product depth (45 scenarios), lifecycle, experience (210 adjustments), style and Rallii checks pass. data_integrity_check.mjs is run through check-content's Vite loader; direct Node execution cannot resolve its source aliases.
- Added `node scripts/check-release.mjs`: 4,320 plans, 60,480 adjustments covering 5 planner destinations, 3–7 days, all companion/budget/pace options and six interest combinations. Checks duplicates, meals, family suitability, chronology/daypart, stop counts, source immutability, note/time/date persistence, 13 recent assets and mocked browser/iOS external-link paths.
- Browser: seven-day family/value/packed trip generated, note/time edits preserved through adjustment/apply/undo/save/reload; swap, reorder and automatic persistence checked. Delete confirmation Escape restores focus without deleting. Date keyboard changes save/reload. Calendar popup opened without reproducing the prior preview-host crash; popup selection and real iOS behavior remain unverified.
- Production: all 8 destination pages checked at 375x667 and 430x932, no horizontal overflow or observed broken loaded images. Four photo drawers retain all images and alt text. Discover mood drawer and More/Saved navigation exercised. No observed console errors in those production checks. Browser emulation does not validate iOS keyboard, safe areas, gestures or GPU behavior.
- Photography: visually reviewed all 13 final-batch images as a contact sheet; unique hashes, max 1440px, 2,212,550 bytes total, each below 450KB. Supplied destination associations retained; no image replacement. Buenos Aires intentionally has no firsthand photos. Existing photo essay composition retained.
- `content/release-link-audit.json`: 20 URLs returned HTTP 200, existing Flights/Hotels hash anchors exist. VRBO redirects with affiliate parameters intact but returned 429 Bot or Not. HTTP 200 does not prove every ShopMy collection's client-rendered contents or attribution credit. Little Jetter remains intentionally unlinked; no URL invented. Actual iOS handoff requires a device.
- Capacitor sync passes with all 3 existing plugins. No native archive/signing validation is possible on this Windows host.

## Build/configuration
- Production uses bundled dist assets, no development server override. Release does not inherit debug.xcconfig. Privacy manifest remains present in Resources; no new collection, permission or SDK introduced.
- 1024x1024 opaque app icon and three opaque 2732x2732 splash assets verified; existing asset/storyboard wiring retained.
- JS approximately 1.17MB total; static startup graph approximately 887KB (265KB gzip using Node gzip). Largest shared data/photo chunk remains approximately 540KB with the pre-existing Vite size warning. Routes remain lazy loaded; closed photo drawers do not mount essays. No new dependency.

## Remaining gates
- Physical iPhone smoke test: calendar selection, keyboard, small-screen safe areas/status bar, orientation, swipes, reduced motion, external app/Safari handoff, startup/offline behavior. No haptics implementation exists to test.
- Mac/Xcode archive and signing validation. Native minimum remains iOS 15; browser fallback source fixes do not certify full rendering on that OS.
- Human VRBO landing check; optional Little Jetter URL only when approved/available. _(Resolved Sept 2026: Little Jetter is live — https://apps.apple.com/us/app/little-jetter/id6810346538.)_

READY FOR TESTFLIGHT: NO — local repository/build preparation is complete, but native validation remains outstanding. Nothing uploaded or triggered.
