# 19-city completeness pass — 2026-09-27

## Scope
19 destinations retained. No native, dependency, storage-schema, or planner-algorithm changes. All 238 places, 19 itineraries, guide IDs and original photo assignments retained.

## Editorial
Connected all 11 newly published articles by expanding the corresponding existing planning guides in place. The library remains 138 guides; saved IDs and related places remain valid. Four already-published five-city articles (Lima Meche Correa, Panama two-day, Florianópolis first-timer and Stay) are unchanged. Full import/source-link receipt: COMPLETENESS_ARTICLE_IMPORT.json.

Six other published website reads are surfaced as explicitly online links in the relevant tabs (Antigua Stay, San Juan two-day, Santiago food, Bogotá food, Tulum restaurants, Medellín food). They are not counted as offline imports.

## Discovery and gaps
Stay, Eat, Explore and Shop now surface existing relevant Journal stories as well as places. Cafés count toward Eat. Stay can point to real neighborhoods where no hotel guide exists. Overview connects Plan / Stay / Eat / Explore / Shop / Journal. Three duplicate-title Journal cards are suppressed without deleting their saved routes.

Discovery retains existing components; First Trip and Romantic are added on evidence from existing articles. City carousels no longer stop at four destinations. Collection sizes: Eat 19, Beach 5, Culture 19, Style 17, Nightlife 9, Nature 12, Weekend 19, First Trip 12, Romantic 3.

## Companion tools
Central mapping: src/lib/companionLinks.ts.
- Luxe: verified destination routes and wardrobe-builder parameters; beach itineraries use Beach Week, other trips City Break. Repeated wardrobe prompts reduced. Existing unsupported cities retain the honest general builder fallback.
- Let Them Eat: verified Cookies / Ramen / Noodles / Cake routes; explicit Alfajor record for Buenos Aires and Montevideo food contexts. Guide matching uses title/intro, avoiding incidental body keywords (e.g. a bread article mentioning cake). Saved food places can surface a supported cuisine when their description matches. No speculative Pizza, Tacos, Bread or Donut links.
- Little Jetter: family-only and six verified matching cities (Mexico City, Cartagena, San José Costa Rica, Lima, Buenos Aires, Rio). Receiver has no destination query handler, so copy explicitly says choose the city in the app and opens its existing App Store fallback. No guessed native URLs.
- Rallii: existing El Chepe editorial card now opens its verified route page. Adventure browsing labels it a separate northern-Mexico journey. None of the 19 cities has a verified nearby route connection, so those bridges remain hidden. No invented rail/trail/Snow claims.

Inline links to bundled published articles stay inside Jet Set. Affiliate links and query strings remain external and unchanged.

## Shopping Notes
Existing approved-master importer, evidence gates, revision checks, exact affiliate preservation and walking-route validation all pass. Dry run: zero notes and zero new places. Jardins has no imported businesses, coordinates or route; approved researched master still required. No redundant infrastructure added.

## Photography and performance
No new image downloads, assets or dependencies. All 19 city Journal cover checks pass; discovery place images now avoid the displayed city hero/card images and one another. Existing optimized assets are reused. Eleven expanded article texts add content bytes; production bundle impact recorded in the deployment receipt. No per-screen network requests added.

## Links
214 URLs batch-checked: 203 successful, two legacy AFAR 404 paths, nine blocked/timeout/network results. Two further new endpoints (Alfajor and In Situ official site) returned 200: 216 checked total. All 11 new article URLs returned 200. Legacy source metadata is preserved; the two dead AFAR source buttons offer clearly labeled official In Situ / newer Oaxaca reading alternatives. Nine inconclusive third-party checks are not declared dead; Viator tracking redirected successfully before its destination returned 403. Existing tracking remains intact.

## Validation
Lint, TypeScript/Vite build, content integrity, OTA safety, article, discovery, expansion, five-city, website-refresh, photography and Shopping Notes checks passed. Full planner regression: 8,640 plans and 120,960 adjustments plus legacy Saved/date persistence. New completeness check covers all 19 cities, the 11 stable-ID imports, exact source/affiliate links, relevant vs irrelevant companion contexts, and internal story routing. Mobile browser verification and release confirmation are recorded in the final receipt.

## City audit
| City | Places | Guides | Distinct Journal cards | Stay / Eat / Explore / Shop reading |
|---|---:|---:|---:|---|
| Mexico City | 24 | 15 | 13 | 3 / 2 / 6 / 3 |
| Rio de Janeiro | 18 | 13 | 13 | 0 / 1 / 10 / 1 |
| Cartagena | 17 | 10 | 10 | 0 / 0 / 9 / 3 |
| Guadalajara | 7 | 7 | 6 | 1 / 1 / 4 / 0 |
| Tulum | 9 | 7 | 7 | 1 / 0 + 1 online / 6 / 2 |
| São Paulo | 23 | 6 | 6 | 0 / 1 / 1 / 4 |
| Playa del Carmen | 7 | 10 | 10 | 1 / 1 / 9 / 1 |
| Buenos Aires | 14 | 11 | 11 | 2 / 1 / 5 / 4 |
| Oaxaca de Juárez | 14 | 7 | 7 | 1 / 3 / 3 / 1 |
| Santiago | 12 | 8 | 8 | 2 / 2 + 1 online / 5 / 0 |
| Medellín | 13 | 8 | 8 | 3 / 1 + 1 online / 5 / 0 |
| Bogotá | 11 | 11 | 11 | 3 / 1 + 1 online / 5 / 4 |
| San Juan | 16 | 6 | 6 | 3 / 2 / 2 + 1 online / 0 |
| Antigua Guatemala | 12 | 6 | 6 | 3 + 1 online / 2 / 3 / 1 |
| Lima | 8 | 3 | 3 | 1 / 1 / 1 / 2 |
| Montevideo | 8 | 3 | 3 | 1 / 2 / 2 / 1 |
| Panama City | 8 | 3 | 3 | 1 / 1 / 2 / 1 |
| San José | 9 | 3 | 3 | 1 / 2 / 2 / 2 |
| Florianópolis | 8 | 3 | 3 | 2 / 1 / 1 / 1 |

## Receiving-app evidence
Read-only main-branch source: Let-Them-Eat-Cake/src/App.tsx, pages/cookies/CookiesRoutes.tsx and data/cookies/cookies.json (cookie_alfajor explicitly covers Argentina/Uruguay); Little-Jetter/src/LittleJetterApp.tsx (current destination list and no URL receiver); Rallii/src/data/routes/el-chepe-express.ts and published route page. Luxe contract remains documented in LUXE_JETTER_LINK_AUDIT_2026_09_27.md. Public food site resolved from the existing Netlify site, not a guessed domain.
