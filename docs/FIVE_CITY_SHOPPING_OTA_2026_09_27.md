# Five-city, Shopping Notes and wardrobe OTA update

## Included content

| Destination | Places | Journal articles | Starter |
| --- | ---: | ---: | --- |
| Lima, Peru | 8 | 3 | 2 days |
| Montevideo, Uruguay | 8 | 3 | 2 days |
| Panama City, Panama | 8 | 3 | 2 days |
| San José, Costa Rica | 9 | 3 | 2 days |
| Florianópolis, Brazil | 8 | 3 | 2 days |

Totals: **19 destinations, 238 places, 138 guides, 19 itineraries**. The additions are 41 researched places, 15 articles, five editable starters and 25 licensed optimized photos. The four website articles retain their WordPress IDs: `wp-13338` (Meche Correa in Lima), `wp-14141` (two days in Panama City), `wp-14058` (Florianópolis first visit) and `wp-14089` (where to stay in Florianópolis). Their source prose and useful external/tracking links are retained. The remaining 11 are explicitly researched app planning guides, not claims of personal visits or new website publications.

Each new city is in Discover, the destination carousel groups, Journal filters/search, related-city links and Plan. Existing behavior is retained: the new cities use copied curated starters and **do not enter automatic meal selection**. Related-city pairs connect Lima/Santiago, Montevideo/Buenos Aires, Panama City/Cartagena, San José/Antigua Guatemala and Florianópolis/Rio in both directions.

## Photography and performance

`docs/FIVE_CITY_PHOTOGRAPHY.json` records every source, author, license, caption and byte size. Five relevant photos per city cover a distinct hero, card and three Journal covers; neighborhood/place imagery reuses the same local assets with accurate context. The app's existing 14-city content is preserved. All 19 cities pass the distinct Journal-cover check.

New image bytes: **2,029,692** total, average about 81 KB, maximum 205,642 bytes, at most 960 × 760 pixels, WebP. Existing lazy loading remains in place. No new runtime dependency, map SDK, CMS, weather call or WordPress startup fetch was added. The content chunk is about **242.13 KB gzip**, compared with 223.39 KB before (+18.74 KB). The existing large-content-chunk build advisory remains; it is not a build failure.

## Shopping Notes and Luxe

The importer, revision/evidence checks, bundled adapter, numbered shopping/café stops, save/planner actions, verified pedestrian directions and conditional Journal category are implemented. **Zero approved masters were supplied, so zero Shopping Notes or dummy stops were imported.** The existing Jardins article remains intact. See `content/shopping-notes/README.md` for the approved-master contract and `docs/LUXE_JETTER_LINK_AUDIT_2026_09_27.md` for contextual links and reciprocal opportunities.

Luxe links use verified public destination IDs for 14 Jet Set destinations; five unsupported cities open the general wardrobe builder. Planner and Saved now offer **Pack for This Trip**. Existing App Store and affiliate URLs are preserved. Live browser verification confirmed Lima is selected in the receiving wardrobe builder. Luxe currently receives destination/intent only; dates, duration and private notes are not silently transferred. The local copyable trip brief remains available. The Luxe repository was inspected read-only and not modified.

## Validation and release boundary

- Production build and lint passed.
- Existing content, OTA isolation, article rendering, photography, discovery, expansion and website-refresh checks passed.
- Release regression: 8,640 plans and 120,960 adjustments, including legacy saved trips, dates, notes and native-link fallbacks.
- New tests: five-city completeness, all 19 Plan entries, template copy isolation, licensed image limits, Luxe destination/fallback mapping, importer approval gates, IDs/duplicates, evidence, routes, exact affiliate strings and repeat-import revisions.
- Local pre-change comparison confirmed all 14 original destinations, 197 places, 123 guides and 14 itineraries are unchanged.
- Mobile browser: new destinations/Journal/planner and Saved → Luxe flow checked; no horizontal page overflow or app console errors in checked pages. Browser verification does not prove receipt on a physical iPhone.
- Native iOS, Capacitor configuration, plugins, signing, permissions, dependencies and lockfile remain unchanged from `jetset-ota-runtime-v1`. Existing unrelated local files are excluded from the release.

The live `.github/workflows/jetset-ota-publish.yml` in **Let-Them-Eat-Cake** was inspected: shared infrastructure is intentional. It checks out **Jet-Set-LatAM** at the specified full SHA, verifies native compatibility, builds the web bundle and publishes **`com.jetsetlatam.app` / `jetset-ios-v1` / `production`** under **`updates/jetset-latam/jetset-ios-v1/production`**. It does not publish this content to Let Them Eat's app channel. The actual successful run, SHA, manifest version and final bundle size are reported after deployment; implementation/build completion alone is not deployment confirmation.

## Website articles still requested

1. Lima first-timer, neighborhoods and where-to-stay guide.
2. Lima food, markets and restaurants.
3. Montevideo first-timer and where-to-stay guide.
4. Montevideo food, markets and local shopping.
5. Montevideo two-day itinerary.
6. Panama City first-timer and neighborhood guide.
7. Panama City food, local designers and craft shopping.
8. San José Costa Rica first-timer and where-to-stay guide.
9. San José coffee, restaurants, markets and shopping.
10. San José two-day itinerary.
11. Florianópolis restaurants, seafood, markets and local craft shopping.

These can enrich the researched app starters after publication. Do not duplicate the four existing website articles listed above. Jardins needs an approved, currently verified master record rather than a duplicate article or speculative route.
