# Published website articles — OTA refresh, September 27, 2026

Imports the published September website snapshot through WordPress post 14180. This is a release snapshot; later posts require a subsequent content update.

22 articles across 10 existing destinations; seven new saveable food places (four in San Juan, three in Guadalajara). All 14 destinations audited. Rio, Cartagena, Tulum and Playa del Carmen had no new September destination posts in the checked snapshot. No destinations, native code, dependencies, routes, storage keys or planner algorithms changed.

All 101 existing articles and 190 places retained their IDs and content. Existing 14 itinerary templates and destination planning modes are preserved. New city articles appear first in destination Journal sections. Existing menus, source links, affiliate URLs and disclosures remain in the article body, with related articles and place backlinks integrated into the existing UI.

## Articles

| Destination | Article | Stable ID |
| --- | --- | --- |
| guadalajara | [What to Eat in Guadalajara: Tortas Ahogadas, Birria and a First Food Day](https://thebrunchmanifesto.blog/2026/09/27/guadalajara-food-guide-tortas-birria/) | wp-14180 |
| antigua-guatemala | [Antigua Guatemala Breakfast and Coffee: Fernando’s Kaffee or Café Condesa?](https://thebrunchmanifesto.blog/2026/09/27/antigua-guatemala-breakfast-coffee-guide/) | wp-14176 |
| san-juan | [Where to Eat in Old San Juan: Coffee, Puerto Rican Lunch and a Chocolate Stop](https://thebrunchmanifesto.blog/2026/09/27/old-san-juan-coffee-puerto-rican-lunch-guide/) | wp-14174 |
| oaxaca | [Oaxaca’s Central Markets: Benito Juárez and 20 de Noviembre for First-Timers](https://thebrunchmanifesto.blog/2026/09/25/oaxaca-markets-benito-juarez-20-noviembre/) | wp-14143 |
| medellin | [Where to Stay in Medellín: El Poblado or Laureles?](https://thebrunchmanifesto.blog/2026/09/25/where-to-stay-medellin-poblado-laureles/) | wp-14139 |
| bogota | [Pepa Pombo in Bogotá: The Sculptural Knitwear Shaping Colombian Style](https://thebrunchmanifesto.blog/2026/09/25/pepa-pombo-bogota-colombian-knitwear/) | wp-13322 |
| antigua-guatemala | [Three Days in Antigua Guatemala: A Flexible First-Visit Itinerary](https://thebrunchmanifesto.blog/2026/09/24/three-days-antigua-guatemala-itinerary/) | wp-14097 |
| san-juan | [Where to Stay in San Juan: Old San Juan, Condado or Ocean Park?](https://thebrunchmanifesto.blog/2026/09/24/where-to-stay-san-juan-old-san-juan-condado-ocean-park/) | wp-14095 |
| antigua-guatemala | [Antigua Guatemala: A First-Timer’s Guide](https://thebrunchmanifesto.blog/2026/09/24/antigua-guatemala-first-timers-guide/) | wp-14061 |
| san-juan | [San Juan, Puerto Rico: A First-Timer’s Guide](https://thebrunchmanifesto.blog/2026/09/24/san-juan-puerto-rico-first-timers-guide/) | wp-14060 |
| santiago | [Santiago + Casablanca Valley: A Wine Country Weekend](https://thebrunchmanifesto.blog/2026/09/24/santiago-casablanca-valley-wine-country/) | wp-13567 |
| santiago | [First Timer’s Guide to Santiago](https://thebrunchmanifesto.blog/2026/09/24/first-timers-guide-to-santiago/) | wp-13566 |
| bogota | [La Candelaria: Bogotá’s Historic Heart](https://thebrunchmanifesto.blog/2026/09/24/la-candelaria-bogota/) | wp-13565 |
| bogota | [First Timer’s Guide to Bogotá](https://thebrunchmanifesto.blog/2026/09/24/first-timers-guide-to-bogota/) | wp-13564 |
| medellin | [Comuna 13 & Medellín’s Culture of Transformation](https://thebrunchmanifesto.blog/2026/09/24/comuna-13-medellin-culture/) | wp-13563 |
| medellin | [First Timer’s Guide to Medellín](https://thebrunchmanifesto.blog/2026/09/24/first-timers-guide-to-medellin/) | wp-13562 |
| mexico-city | [Pan de Muerto in Mexico City: A Beautiful Ritual of Memory and Sweetness](https://thebrunchmanifesto.blog/2026/09/24/pan-de-muerto-mexico-city-guide/) | wp-13311 |
| buenos-aires | [Buenos Aires in December: Tango, Style & 3-Day Itinerary](https://thebrunchmanifesto.blog/2026/09/19/buenos-aires-in-december-tango-style-3-day-itinerary/) | wp-13258 |
| mexico-city | [Carla Fernández in Mexico City: The Square-Root Language of Modern Mexican Fashion](https://thebrunchmanifesto.blog/2026/09/17/carla-fernandez-mexico-city-square-root-fashion/) | wp-13048 |
| sao-paulo | [Silvia Furmanovich in São Paulo: Brazilian Marquetry Becomes Fine Jewelry](https://thebrunchmanifesto.blog/2026/09/14/silvia-furmanovich-sao-paulo-brazilian-marquetry-jewelry/) | wp-13038 |
| bogota | [Kika Vargas in Bogotá: Romantic Volume with a Modern Colombian Edge](https://thebrunchmanifesto.blog/2026/09/13/kika-vargas-bogota-colombian-fashion/) | wp-13012 |
| bogota | [Mercedes Salazar in Bogotá: Jewelry with Joy, Magic and Colombian Soul](https://thebrunchmanifesto.blog/2026/09/10/mercedes-salazar-bogota-jewelry/) | wp-12849 |

## Photography and performance

Eight existing images reused. Fourteen additional Commons photographs converted to WebP, at most 960 × 760, each under 160 KB; combined 1,105,414 bytes. Full attribution is in WEBSITE_REFRESH_PHOTOGRAPHY.json and the app. Every city retains unique Journal covers. Context photographs are labeled as such and do not imply photographs of named restaurants or designers. No third-party article HTML, scripts or remote image embeds are mounted; cleaned copy uses the existing safe article renderer.

## Validation

Lint, TypeScript/production build, content integrity, OTA compatibility, release/planner regression, discovery, article rendering, story-photo uniqueness, expansion and website-refresh checks. A saved baseline also compares every existing article body/title/source/cover/place list, every existing place except additive article backlinks, and every itinerary. Mobile browser checks cover San Juan and Antigua food stories, Guadalajara, destination Journal entries and all-destination Journal filters.

The production build retains the existing data-chunk size warning. Article text adds roughly 36 KB compressed JavaScript; photographs are the main additional download.

## Production delivery

Publish the exact main commit using the existing isolated Jet Set production OTA workflow in Let-Them-Eat-Cake (jetset-ota-publish.yml), runtime jetset-ios-v1. The signed/encrypted bundle and public production manifest must match the source commit before success is reported. No native iOS build or App Review is involved.

## Exact files

- src/data/index.ts
- src/data/place-photography.ts
- src/data/website-guides.ts
- src/data/website-guides.json
- src/data/destinations/expansion.ts
- src/data/destinations/guadalajara.ts
- scripts/check-expansion.mjs
- scripts/check-website-refresh.mjs
- docs/WEBSITE_REFRESH_PHOTOGRAPHY.json
- docs/OTA_WEBSITE_REFRESH_2026_09_27.md
- src/assets/website-guides/wp-13322.webp
- src/assets/website-guides/wp-12849.webp
- src/assets/website-guides/wp-13565.webp
- src/assets/website-guides/wp-13564.webp
- src/assets/website-guides/wp-13012.webp
- src/assets/website-guides/wp-13566.webp
- src/assets/website-guides/wp-13567.webp
- src/assets/website-guides/wp-14139.webp
- src/assets/website-guides/wp-13563.webp
- src/assets/website-guides/wp-13311.webp
- src/assets/website-guides/wp-13048.webp
- src/assets/website-guides/wp-14143.webp
- src/assets/website-guides/wp-14060.webp
- src/assets/website-guides/wp-14097.webp
