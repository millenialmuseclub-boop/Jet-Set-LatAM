# Product depth and growth pass — 2026-09-19

## Architecture inspected
React 19 + TypeScript + Vite; HashRouter routes are in src/App.tsx. Canonical Places, Guides, Destinations and Itineraries are assembled by src/data/index.ts from destination modules and the editorial archive. The planner is deterministic and uses this same curated data. ItineraryEditor is shared by generated trips and saved TripDetail. Saved data remains in the existing three `jsl.*.v1` localStorage keys; no migration, new dependencies, accounts or backend were introduced.

Discover, fonts, colors, icon, animation system and photography are unchanged. Real local photo assets remain the source of destination and itinerary images. Existing style briefs, Rallii coverage gating, trail append logic, trip lifecycle, dates and trip stories were inspected and retained.

Capacitor uses dist, the existing iOS project, and AppLauncher/Browser/StatusBar plugins. Outbound booking and ecosystem buttons use the existing openExternal helper. Native handoff uses AppLauncher, then Browser fallback; web uses same-tab navigation. Tren Maya's plain target-blank anchor now uses that same helper.

## Changes
- Tulum: editable two-day ruins/beach/cenote route plus practical preparation notes for four places.
- Playa del Carmen: editable two-day downtown/Xcaret route, traveler-facing overview, four practical place notes and explicit full-day park planning.
- Guadalajara: editable murals/Centro/Colonia Americana day, practical notes for Cabañas and the two Tequila hotels. Tequila hotel records now correctly resolve to their owning destination for Save/Add to Trip.
- All ready-made destination links open independent editable itinerary copies instead of silently starting the quiz. Guide-tier Plan links open their curated short itinerary without pretending these destinations support the full planner.
- Every generated pace now extends through dinner. Budget affects ranking; family generation/swaps exclude bars/nightlife and explicitly adult-oriented tags. Hotels are no longer scheduled as sightseeing activities.
- Activity time and personal notes are editable; practical notes are visible. Reordering keeps time slots in order. Larger editor tap targets and labeled title/close/back controls.
- Saved trips show duration and date guidance. Saving again preserves dates, visit/story data, creation date and status. Same-day duplicate additions are ignored. Partial legacy libraries are normalized without changing the saved keys or dropping unknown IDs.
- Saved confirmation links directly to the saved trip. Editing clears the stale Saved badge. Trip detail remounts when changing trip URLs. The covered hero back link is fixed. Trip actions wrap on narrow screens.
- Empty destination category tabs, empty extra-story rails and empty destination trail sections are hidden. Beach and nightlife records are reachable in Experiences/Drink. Blank neighborhood summaries are hidden.
- Existing flights/hotels/villas booking collection appears on destination Stay tabs and saved trips, with affiliate disclosure. No new partner URLs or fabricated venue offers.
- Let Them Eat is offered alongside actual destination food content. Existing destination-specific Luxe Jetter and verified Rallii connections are preserved; saved short trips also use the existing style brief/constellation. Family planner copy no longer invites users to a nonexistent Little Jetter link.

## Links and measurements
Verified website Plan Your Trip returns 200 and contains both flight-search and hotel-search anchors. Existing Luxe Jetter, Rallii and Let Them Eat App Store pages return 200. Tren Maya official page returns 200. VRBO returns 403 to automated HTTP checks but successfully redirects in the browser to the live VRBO search page with affiliate parameters intact.

Still needed: approved destination/property-specific hotel affiliate URLs; tours/attractions/experience links (including Xcaret, cenotes and José Cuervo Express); transport/transfer/ferry affiliate links; Little Jetter's published URL. No links were invented.

Analytics is absent, not merely unwired: no analytics SDK, event helper or configuration exists in the repository, and the native documentation/privacy manifest explicitly describe no tracking/collected data. No tracking system was added. Destination views, planner starts/completions, trip saves, affiliate clicks and ecosystem clicks therefore remain unmeasured until a real analytics implementation/destination is supplied or separately approved.

## Validation and limits
Build, lint, existing content/integrity checks (180 planner scenarios), lifecycle, style and Rallii tests pass. Added scripts/check-product-depth.mjs covers 45 family/style/pace scenarios, three template reference checks, destination ownership, legacy-library normalization, duplicate insertion and repeat-save metadata preservation. Capacitor iOS sync passes with the same three plugins.

Mobile browser checks at 390px and 320px: template opening, note/time edit, save, reload persistence, destination food connection, and main destination/planner/Saved/Discover/Journal pages. No horizontal overflow or broken loaded images in checked pages; no application console errors. A browser-host crash occurred while using its native date picker; date storage and lifecycle are covered by regression tests, but that particular UI interaction could not be certified here.

Actual iPhone Safari/AppLauncher behavior and a signed native build require macOS/device verification; this Windows pass does not claim those ran. No TestFlight build or public release was triggered for this scope. Existing large-bundle warning remains (~1.1 MB uncompressed JS); splitting the app was intentionally left outside this focused pass. Missing authentic venue photography still uses explicitly labeled destination context instead of fabricated images. Dynamic opening times, pricing and availability remain operator checks, not promises.
