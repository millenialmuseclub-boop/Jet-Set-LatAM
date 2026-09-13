# Jet Set LatAm — motion + sparkle pass

Local review · September 13, 2026 · codex/editorial-product-pass

## Motion system
Shared timing/easing in `src/lib/motion.ts` and `src/motion.css`: 180ms tactile feedback, 420ms editorial reveals, 55ms light stagger, 760ms hero settle. Existing Framer Motion continues to handle planner selections and itinerary layout. Native Web Animations progressively enhance visible content. No new animation package.

`gold-glint`, `gold-rule-reveal`, `soft-shimmer` and save feedback use the existing gold palette. Entrance effects finish and settle; no continuous particle effects. Route reveals target headings and individual cards rather than compositing long page layers.

## Home
The photograph settles from 1.03×, followed by the eyebrow, headline and CTA, in under one second. Section headings and editorial cards reveal lightly on entry. Header background becomes solid/blurred on scroll and the logo contracts slightly; its measured height remains unchanged. Home content and length are unchanged.

## Planner
Restrained press feedback and checkmark responses; existing step transition and progress flow retained/refined. The rotating compass has been replaced by a 900ms photographic curation sequence with a traveling gold line and brief editorial phrases. No additional artificial wait was added.

## Itinerary
Day cards reveal with a small stagger; timeline accents draw once. Existing Framer layout motion keeps neighboring rows moving when reordered. Focus adds a soft lift shadow. Bookmark state remains real; saves receive one brief gold sweep.

## Saved
Saved-trip hero and metadata settle into place, followed by day cards. Confirmation sheets and deletion behavior are preserved. The bottom navigation remains Discover / Destinations / Plan; Saved remains inside More.

## App family
The constellation anchor connects visually to relevant extensions, which reveal once. Luxe Jetter uses a single wardrobe-CTA light sweep. Rallii has a directional/path treatment, with no fashion glitter. Existing verified-coverage gating stays intact: no invented Rallii destination matches were added merely to demonstrate animation.

## Carnival
One 820ms burst of seven tiny gold/rose marks plus a 900ms warm wash on entry. Nothing repeats after settling. Real photos retain their captions and archive identity. Posters and play controls remain first; sound stays muted until requested, and existing single-video playback is preserved. Photo essays get slight scroll-linked image drift where the browser supports it, with reveal fallback elsewhere.

## Accessibility
Reduced motion disables transforms, parallax, particles, animation and transitions. The curation state keeps readable static text. Taps stay available throughout. The main mobile test passed with a deliberately non-firing IntersectionObserver and the Web Animations method removed; story content remained visible. Animation never determines whether content renders.

## Performance
Production payload change relative to the preceding product pass: JavaScript +3.61kB minified / +1.33kB gzip; CSS +7.84kB / +1.75kB gzip. No dependency added. The pre-existing >500kB JavaScript bundle warning remains.

Initial separate cold runs showed scheduling outliers. After closing this task's completed automation browsers, an alternating static-control/motion comparison in one browser measured identical 8.3ms median and 8.5ms p95 frame intervals, with zero >50ms frames and zero long tasks in each of three runs per mode. This is a local Chromium benchmark, not a physical-iPhone 60fps certification. Raw measurements are retained in the workspace's `jetset20/motion-*.json` files.

## Mobile QA
Playwright recorded both 390×844 and 430×844 flows: Home entrance, header scroll, Explore, planner selections, curation, itinerary reveal/reorder/save, Saved, Trip Detail, constellation, Jet Set Now, Trail detail, Carnival and Ask. Checked no horizontal overflow, no page errors, real save/reorder outcomes, fixed header geometry, settled Carnival effects, reduced motion and observer failure. Recorded frames were extracted and visually inspected.

Artifacts: `C:/Users/Jordann Lopez/Documents/ChatGPT/Portfolio/jetset20/motion-qa/`. Build, lint, lifecycle, style and Rallii checks pass. Existing user storage and source photographs remain untouched; QA uses isolated browser contexts.

## Next build
Local only. Production assets are synced into the existing iOS project after verification. No push, build-number change or TestFlight upload. Native iOS motion and hardware performance still need the normal Mac/iPhone review.
