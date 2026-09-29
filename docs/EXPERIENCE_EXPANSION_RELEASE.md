# Experience + ShopMy release handoff

Status: **production OTA 1790558561 deployed successfully**. Runtime jetset-ios-v1; app com.jetsetlatam.app; source 834dbb1426b5da4b68cf9dee2a5c87dfa0251967. Workflow 36365755699 passed; live manifest and bundle HTTP 200 verified on 2026-09-28. Receipt: visual-qa/experience-ota-receipt.json.

## Delivered

- 26 destinations: original 19 preserved, plus Salvador, Mendoza, Cusco, Punta del Este, Bocas del Toro, Quito and Havana. Quito and Havana were included following the explicit “don't hold anything” instruction.
- 56 sourced places, 21 linked Journal guides (12 published website imports and 9 clearly identified researched app guides), 21 neighborhood/base descriptions and 7 editable two-day starters. New cities are available in Plan through starters; they are not falsely promoted to full personalized-planner eligibility.
- 9 additional published website-reading links for existing cities, surfaced in the Journal. The previously completed 11 article imports remain intact.
- 26 destination-specific ShopMy treatments, each with two different local city photographs and the exact existing collection URLs. Redesigned shared cards cover Discover, destination Overview/Shop, eligible Journal articles, Plan, Saved trip detail and the dedicated Rio/Cartagena stays placements. About's profile link and existing article links remain unchanged.
- Images are explicitly destination inspiration, not product or room previews. No retailer assets, invented products, price claims or new affiliate inventory. Luxe Jetter remains a separate action. Added verified destination matches for Cusco, Salvador and Punta del Este; other cities use the established wardrobe fallback.
- All 26 cities have four different primary hero/atlas/planner/related photos and unique Journal covers within each city. Nine website-reading cards use distinct imagery from the visible Journal row. Buenos Aires has a new Palacio Barolo hero.
- 43 credited local WebP photographs total 2,878,596 bytes. Each is under 160 KB and within 960 × 760. ShopMy adds no separate product-image payload: it reuses bundled destination/editorial photographs, two cards per shelf, lazy loaded. Verified encrypted OTA bundle: 59,308,464 bytes, up 2,922,912 bytes (5.184%) from production 1790553732. The build retains the existing large content-chunk warning; no new dependency or SDK was added.
- Shopping Notes validation still passes; Jardins businesses/routes remain unimported pending the approved master record.

## Validation

- Lint, TypeScript and production build passed.
- Content integrity: 26 cities, 294 places, 159 guides, 26 itineraries; 288 planner scenarios.
- Release regression: 8,640 plans, 120,960 adjustments; legacy Saved content, notes/times and dates preserved.
- OTA compatibility, original-city baseline preservation, photo licensing/dimensions, existing affiliate URLs, article parser, discovery, website refresh and Shopping Notes checks passed.
- Mobile: all 26 destination Shop pages at 390 px; 52 image cards, no horizontal page overflow, no broken loaded images. Rio, Buenos Aires and Cusco carousel controls and imagery checked visually. No local-app console errors observed; a previously visited WordPress admin script error was unrelated.
- New-source audit: 57/60 URLs responded successfully, no 404s. Two official sites blocked automated requests (403); Uruguay's official tourism PDF was readable through web research but failed the direct automated fetch. Earlier published-body link checks found bot/rate-limit restrictions, no new 404s. These restrictions are not described as verified availability.
- Native iOS/Capacitor configuration, package manifests and lockfile are unchanged.

## Changed implementation files

`src/components/DiscoveryCollections.tsx`, `ShopMyEdit.tsx`, `ShopTheLookCard.tsx`, `StyleBridge.tsx`, `WebsiteReading.tsx`; `src/config/luxeDestinations.json`; `src/data/index.ts`, `editorial-links.ts`, `shopmy.ts`, `style.ts`, `next-city-articles.json`, `next-city-photography.ts`, `reading-photography.ts`; `src/data/destinations/buenos-aires.ts`, `next-cities.ts`; `src/lib/discovery.ts`, `destinationPhotography.ts`, `shopmyPresentation.ts`; `src/pages/DestinationDetail.tsx`, `Destinations.tsx`, `Explore.tsx`, `PlanTrip.tsx`; `src/product-quality.css`; the 43 licensed files in `src/assets/next-cities/`.

Validation files: `scripts/check-city-variety.mjs`, `check-shopmy-presentation.mjs`, `check-completeness.mjs`, `check-five-cities.mjs`. Provenance and website prompts are in the adjacent `NEXT_CITIES_*`, `DESTINATION_READING_ADDITIONS.json` and `EXPERIENCE_EDITORIAL_REQUESTS.md` documents.

## Production completion when approval service is available

1. Fetch and inspect current `origin/main` before committing, preserving unrelated untracked user files. Stage only the release files named above and these documents, not `android/`, user photo archives or takeover documents.
2. Reconfirm native compatibility against `jetset-ota-runtime-v1`. Commit and push the reviewed release to `millenialmuseclub-boop/Jet-Set-LatAM` main through the existing branch workflow.
3. Dispatch the existing `jetset-ota-publish.yml` in `millenialmuseclub-boop/Let-Them-Eat-Cake` with the exact full source SHA and `channel=production`. No replacement hosting or native build.
4. Verify workflow success and production manifest fields: `appId=com.jetsetlatam.app`, `runtime=jetset-ios-v1`, `channel=production`, source SHA equals the release commit, version newer than `1790553732`. Verify the encrypted bundle returns HTTP 200. Record public metadata only; do not expose encryption/session data.
5. Record the version and actual bundle-size change here. On iPhone, open the installed App Store app online, allow the OTA download, then close and reopen it to activate. Check Buenos Aires' Palacio Barolo hero, compare Rio/Buenos Aires/Cusco Shop edits, and find all seven new destinations in Plan. Device receipt requires this on-device check and has not been personally verified.
