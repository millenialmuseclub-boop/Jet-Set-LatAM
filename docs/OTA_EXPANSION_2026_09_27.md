# Destination photography, carousels and planning coverage

## Content

- Added San Juan and Antigua Guatemala: 12 sourced places, three neighborhoods, three Journal guides and an editable two-day itinerary each.
- Added two planning articles each for Bogotá, Medellín, Santiago and Oaxaca. Total library: 14 destinations, 190 places, 101 guides and 14 ready-made itineraries.
- New cities open curated starter trips. Their current dining coverage is not offered to the automatic trip generator. All 14 destinations are visible on Plan; existing personalized planning remains unchanged.
- Existing 166 place records, 87 article bodies/source links, 12 itinerary contents, affiliate URLs and saved-data schemas are preserved. New guide backlinks are additive.

## Articles added

| Destination | Articles |
| --- | --- |
| San Juan | A First Weekend in San Juan; Where to Stay: Old San Juan, Condado or Santurce?; San Juan: Coffee, a Special Dinner and a Night Out |
| Antigua Guatemala | Antigua Guatemala: Your First Two Days; Antigua at the Table: Coffee, Courtyards and Rooftops; Where to Stay and What to Bring Home from Antigua |
| Bogotá | Your First Weekend in Bogotá; Where to Stay in Bogotá for Museum Days and Good Dinners |
| Medellín | Medellín in a Weekend: Choose Three Anchors; Medellín: Choosing a Base and Planning the Journey |
| Santiago | Where to Stay in Santiago: Plan by Neighborhood; A Santiago Weekend: Markets, Culture and a View |
| Oaxaca | Buying Craft in Oaxaca: Ask About the Maker; A First Oaxaca Weekend: City Days or a Textile Detour? |

These are researched planning guides, labeled separately from the firsthand archive. Tourism and venue sources are linked in each article/place. Photo provenance and licensing are recorded in EXPANSION_PHOTOGRAPHY.json and displayed in the app.

## Photography and layout

- Replaced the shared city-header fallback for place cards with a cached, varied selection of existing destination photography, favoring relevant neighborhood/category scenes and less-used images. City-context photos are labeled; verified venue photos retain priority.
- Reused the existing Café Tortoni, Teatro Colón and Chapultepec photos for those named places. Buenos Aires's four featured picks now have four distinct images.
- All 14 destinations have distinct article covers within their own destination/Journal list.
- Added 10 local WebP photos totaling **862,984 bytes** (0.86 MB); each is below 150 KB, with dimensions at most 1000 × 800. Existing image loading remains lazy except priority heroes. No dependency added.
- Destination collections, neighborhood/place cards, discovery collections and Journal results use swipeable carousels. Removed the older CSS rule that changed non-home photo rails into grids. Search, filters, pagination and navigation remain available.
- New article/place/itinerary cross-links use the existing save and Add to Trip controls. Explicit related-guide links now affect recommendations. San Juan and Antigua use the existing Luxe Jetter handoff and the existing Beach Guide/Quiet Luxury Layering ShopMy collections with disclosure.

## Checks

- Lint, TypeScript/production build, OTA validation, content integrity, discovery, articles and story photography checks passed.
- Release checks: 8,640 generated plans and 120,960 adjustments; legacy saved trips, dates, notes and times; external/native link behavior.
- New expansion check: photo variety and licenses, source-backed articles, all 14 planning entries, independent editable template copies.
- Browser: all 14 destination routes checked at 320px without horizontal page overflow or console errors; carousel controls, Journal filtering, and Oaxaca/Antigua starter-trip flows verified at phone widths.
- The existing Vite warning about a data chunk larger than 500 KB remains. Final data chunk is about 187 KB gzip.
- No native iOS/Capacitor files, plugins, permissions, signing, package metadata or lockfile changed.

## Production OTA and iPhone verification

Release uses the existing **Publish Jet Set OTA** workflow documented in OTA_UPDATES.md, with the exact Jet Set main commit and the production channel. The workflow checks compatibility with `jetset-ota-runtime-v1` and publishes only the Jet Set namespace. The deployment run, production version and verified manifest commit are reported in the conversation after publishing.

On the installed OTA-capable App Store app, launch online and allow the update download to finish. Background/close the app and reopen it; activation occurs on a subsequent launch or background transition. Check Destinations for the swipeable collections and San Juan/Antigua, Journal for the new articles, Buenos Aires for the varied Jet Set List images, and Plan for **14 destinations**. Verify saved trips remain in Saved. No reinstall or new App Store build is needed.

## Files changed

- `docs/EXPANSION_PHOTOGRAPHY.json`
- `docs/OTA_EXPANSION_2026_09_27.md`
- `scripts/check-expansion.mjs`
- `src/assets/expansion/ag-arch.webp`
- `src/assets/expansion/ag-capuchinas.webp`
- `src/assets/expansion/ag-merced.webp`
- `src/assets/expansion/ag-plaza.webp`
- `src/assets/expansion/ag-street.webp`
- `src/assets/expansion/sj-blue.webp`
- `src/assets/expansion/sj-condado.webp`
- `src/assets/expansion/sj-morro.webp`
- `src/assets/expansion/sj-placita.webp`
- `src/assets/expansion/sj-street.webp`
- `src/components/Carousel.tsx`
- `src/components/DiscoveryCollections.tsx`
- `src/components/JetSetPickCard.tsx`
- `src/components/NeighborhoodExplorer.tsx`
- `src/data/destinations/expansion.ts`
- `src/data/expansion-photography.ts`
- `src/data/index.ts`
- `src/data/place-photography.ts`
- `src/data/planning-guides.ts`
- `src/data/shopmy.ts`
- `src/data/style.ts`
- `src/lib/discovery.ts`
- `src/lib/planningDestinations.ts`
- `src/motion.css`
- `src/pages/DestinationDetail.tsx`
- `src/pages/Destinations.tsx`
- `src/pages/Explore.tsx`
- `src/pages/GuideDetail.tsx`
- `src/pages/PlanTrip.tsx`
- `src/product-quality.css`
- `src/types/index.ts`
