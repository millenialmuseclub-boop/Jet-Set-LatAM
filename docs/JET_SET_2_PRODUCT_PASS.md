# Jet Set 2.0 — local review, September 13, 2026

The existing app remains on codex/editorial-product-pass, based on build 6 (448aa89), with later local editorial, archive, navigation and sister-app changes preserved. No push or TestFlight upload.

## One lifecycle
- Explore: /explore links to Ask, five canonical city Trails, Carnival and Guides.
- Plan: saved Trip Detail includes editable trip dates, relevant Trails and a context-driven constellation. Trail insertion preserves existing stops and avoids duplicate places on the selected day.
- Go: destination-local dates activate Jet Set Now on Home. It shows the actual day, matching neighborhood journal references, unused detours and planned/saved evening options. No GPS. An explicit link opens ordinary Discover.
- Remember: ended trips appear under Saved → Trip Stories. Visits require confirmation; notes persist locally. Archive photos/films are labeled as destination context. Recap PNG uses planned and confirmed counts separately.
- Carnival: sourced 2027 LIESA window controls seasonal visibility. The 2025 archive remains available year-round. No automatic event insertion; native video playback framework preserved.
- Ask: deterministic local corpus search with a swappable provider interface. Destination, neighborhood, category, saved places, active day, Picks, Guides and Trails inform results. Explicit named cities override selected context. Source labels preserve firsthand vs verified vs journal provenance. Missing coverage produces no-match guidance. No external AI or live opening-hour service.

Saved remains under top-navigation More; bottom navigation stays Discover / Destinations / Plan.

## Review and limits
Each phase was implemented and visually checked before the next at 390px and 430px. Screenshots and isolated-browser harnesses: C:/Users/Jordann Lopez/Documents/ChatGPT/Portfolio/jetset20/qa and ../qa-phase1.cjs through ../qa-phase6.cjs. Final smoke checks cover connected pages, mobile overflow, image loading and browser exceptions. Fixtures use isolated storage; user trips are untouched.

Automated checks: check-lifecycle.mjs (dates, destination-local midnight, leap dates, old undated trips, immutable/deduplicated Trail insertion, visited truth, constellation relevance, seasonal boundaries, Ask examples and no-match cases), existing content/planner, style and Rallii checks, TypeScript production build and lint.

Known limits: single-device local storage; Ask matches the existing collection rather than arbitrary travel questions; Trail durations are editorial estimates; no live GPS, availability or reservations. Carnival dates beyond verified seasons require a source update. Build retains the existing large JavaScript chunk warning. iOS assets can be synced on Windows; native execution and TestFlight require Mac review.
