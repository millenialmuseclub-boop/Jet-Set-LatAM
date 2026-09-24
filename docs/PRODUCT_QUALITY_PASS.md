# Product quality pass — 2026-09-24

Baseline: remote main b41f7c1, including the build 13 expansion and Little Jetter polish. Work isolated on codex/product-quality-pass; Android checkout and its untracked files untouched.

## Changes
- Discover: seven intent filters using curated places, four new destination cards, a bounded photo rail with unique images, and Surprise Me. Carnival and existing editorial sections retained.
- Destinations: shortcuts to neighborhoods, tables, stories and practical essentials; three related destinations. Neighborhood disclosures show documented matching places, categories, map and existing trip actions. No guessed distance or proximity claims.
- Planner: two-day trips; visible content coverage for interests; balanced days now use morning, lunch, afternoon and dinner. Existing deterministic scoring adds an area anchor, with saved places taking priority. Family, meal, duplicate and reservation/visited protections retained.
- Itineraries: larger day photographs, real venue thumbnails, daypart labels, concise descriptions and expandable practical notes. Personal notes remain visible.
- Saved and Go: collection totals, city filtering, map shortcuts, capped initial place list with Show more, and travel-day links to local saved places and neighborhoods. Storage keys and schemas unchanged; weekend preferences supported.
- Performance/accessibility: on-trip screen loaded only when needed, precomputed discovery collections, lazy asynchronously decoded images, dimension-preserving accessible fallbacks, fewer repeated photos, 44px controls and focus treatment. Existing shared data chunk remains approximately 619KB (169KB gzip); no new dependencies.

## Validation
Production TypeScript/build, lint, content integrity, product-depth, lifecycle, experience, style, Rallii, release and new discovery checks pass. Content remains 12 destinations, 166 places, 87 guides and 12 templates. Release coverage includes 8,640 plans and 120,960 day adjustments, with two-day trips added.

Production browser checks at 390px and 320px covered intent selection, Surprise Me, neighborhood expansion, family weekend generation, saving/reopening personal notes, city/place saving and the city-filtered library. Crawled the four new destinations plus Cartagena and Rio. No layout overflow or broken loaded images in checked screens; fresh final-build crawl had no console errors. Native date picker could not be verified: the embedded test browser crashed opening that control. Automated date/lifecycle persistence checks pass. Native iOS/device verification remains part of the separate release decision.

No native version bump, signing/metadata changes, deployment or Codemagic/TestFlight trigger. The feature branch can be reviewed before a separate merge/release decision.
