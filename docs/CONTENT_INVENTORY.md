# Content Inventory — What's Ready vs. What's Not (Pass 8 update)

Snapshot of what real Jet Set LatAm content/photography exists per
destination, and what's actually been built into the app vs. still gated on
missing verified content or authentic photography.

## Mexico City — LIVE, built out (Pass 1-3)

- 7 real photos in `src/assets/cdmx/`. 18 Places, 4 Guides, a 3-day
  ready-made itinerary, all traced to real article URLs.
- Gaps: no restaurant-category places (café-only "Eat + Drink" coverage).

## Rio de Janeiro — LIVE, built out (Pass 4)

- 5 real photos in `src/assets/rio/`. 18 Places across landmark/museum/
  hotel/restaurant/cafe/nightlife/beach, 4 Guides, a 3-day ready-made
  itinerary. Planner-ready.

## Cartagena — LIVE, built out (Pass 5; media pass added below)

- 5 real photos in `src/assets/cartagena/` (skyline from Muelle de la
  Bodeguita, walled-city street, Palenqueras street scene, Murallas at
  sunset, walled-city courtyard with the Jet Set traveler herself outside
  Museo Histórico). All camera-originated, no stock flags.
- 16 Places across shop/restaurant/cafe/nightlife/landmark/museum/hotel
  categories, 3 Guides (`gd-cartagena-boutiques`, `gd-cartagena-old-town`,
  `gd-cartagena-island`), a 3-day ready-made itinerary
  (`it-cartagena-walled-city-island-3day`) — all traced to real
  jetsetlatam.com articles (see PROVENANCE comment in
  `src/data/destinations/cartagena.ts`).
- Planner-ready: clears the ≥6-places threshold with real category
  variety (shop/restaurant/nightlife/museum/hotel).
- **Media pass (Cartagena video/photo feature):** 3 more real photos in
  `src/assets/cartagena/` (clocktower/Torre del Reloj at sunset, a
  waterfront seafood-stand sunset, an event set up on the fort walls at
  dusk) — Jordann's own phone photography, sent directly, resized/
  recompressed for bundle size only. 2 real video clips in
  `src/assets/cartagena/video/` (a folkloric dance procession in the
  Walled City; an evening on a Getsemaní plaza terrace), transcoded from
  source .mov to H.264 MP4 at 720x1280 with generated poster frames — see
  `src/types/index.ts` (`MediaMoment`), `src/data/media.ts`, and
  `src/components/MediaMoment.tsx`. Surfaced on the Cartagena destination
  page ("Cartagena In Motion") and as a Discover teaser module. This is
  explicitly NOT Rio Carnival footage — the dance clip is undated/
  unconfirmed as any named event and is never labeled "Carnival"; real Rio
  Carnival footage is still pending from Jordann.

## Guadalajara — GUIDE tier, built out (Pass 5)

- 2 real photos in `src/assets/guadalajara/`: the Instituto Cultural
  Cabañas auditorium mural (real visible visitors) and the pink
  "GUADALAJARA" photo-op sign in Plaza de la Liberación with the Cathedral
  towers behind it (real visible crowd). Both visually verified as
  authentic candid travel photography, not stock.
- Confirmed-excluded stock photo: "Photo by Los Muertos Crew" (Guadalajara
  cathedral) — not used.
- 3 verified Places (Instituto Cultural Cabañas, José Cuervo Express,
  Matices Hotel de Barricas, Casa Salles Hotel Boutique — 4 total), 2
  Guides. Source articles: "Hidden Gems of Guadalajara's Colonia
  Americana" (2025-11-27, intentionally atmospheric prose with no named
  businesses — used only for the honest generic neighborhood description,
  not invented Places) and "The José Cuervo Express Travel Guide: From
  Guadalajara to Tequila" (2025-10-20, the source for all 4 Places).
- **Held at GUIDE, not LIVE**: real content supports a genuine destination
  page, but doesn't clear the planner-readiness bar — no verified category
  variety within Guadalajara proper (the 3 Tequila-area Places are a
  single day-trip cluster, not a spread of in-city categories). Not
  planner-enabled this pass; a real page, not a stub.

## Tulum — GUIDE tier, built out (Pass 8)

- 3 real photos in `src/assets/tulum/` — captured via browser screenshot
  from the jetsetlatam.com (THE BRUNCH MANIFESTO-watermarked) media
  archive, watermark cropped out with ImageMagick, resized to 1600px max
  width / quality 85 JPEG, matching the established pipeline: a wooden
  boardwalk to a turquoise beach, the Tulum ruins temple atop the cliff
  over the sea, and the same ruins framed by a foreground palm.
- 8 verified Places confirmed via the jetsetlatam.com WordPress REST API
  this pass: Tulum Archaeological Zone (landmark), three cenotes —
  Cenote Cristalino, Cenote Azul, Jardín del Edén (experience), Nomade
  Tulum (hotel, cited as a walking-route starting point), and three
  wellness/spa names — Yäan Healing Sanctuary, Azulik Spa, Saná Spa
  (experience). No Guides were built: unlike Cartagena/Guadalajara, no
  individual article permalinks were captured this pass for Tulum — only
  the category/tag listing was confirmed via the API — and `Guide.sourceUrl`
  is required, not optional, so attaching an unverified or invented article
  link was avoided entirely rather than guessed at. Every Place's
  `sourceUrl` is likewise left unset for the same reason.
- **Held at GUIDE, not LIVE**, for the same reasoning as the Guadalajara
  precedent: the category spread (landmark/experience/hotel) looks similar
  on paper, but there's no verified restaurant/cafe/shop/nightlife content,
  only 3 photos (vs. 5+ at every LIVE destination), and every place
  description is a single verified fact rather than the fuller
  address/price/practical-notes depth LIVE places carry. Real enough for an
  honest destination page; not enough to clear the planner-readiness bar.

## Napa, San Francisco Chinatown — searched this pass, zero real content found

- Both were searched this pass via the jetsetlatam.com WordPress API
  (posts, categories, tags, media library). No named Places, no articles,
  and no candidate photography turned up for either. No stub or Place data
  was created — left fully open rather than guessed at.

## Argentina / Peru / Chile / Costa Rica / Caribbean — HOLD, searched this pass

Same failure pattern as the already-documented São Paulo / Playa del Carmen
holds below: some real written content exists in the archive, but
photography that would clear this project's photography-first bar was not
found. Kept brief and honest rather than padded with specifics that weren't
actually verified:

- **Argentina (Buenos Aires)**: some real written references found in the
  archive search, but no authentic, non-stock photography candidates
  turned up. Held out.
- **Peru**: same pattern — written references exist, no verified authentic
  photography found this pass.
- **Chile**: same pattern — written references exist, no verified authentic
  photography found this pass.
- **Costa Rica**: same pattern — written references exist, no verified
  authentic photography found this pass.
- **Caribbean (non-Colombia/Mexico)**: same pattern — scattered written
  references, no verified authentic photography found this pass.

None of these were built into `coming-soon.ts` stubs this pass — they're
recorded here as an honest research log, not as promises of a specific
future structure, since (per São Paulo/Playa del Carmen below) that
structure is better decided once real photography exists to build against.

## São Paulo — held in `coming-soon`, blocked on photography

- Real, specific written content exists: "Mercado Municipal de São Paulo:
  A Flavorful Landmark in the Heart of the City" (2025-10-20) — opened
  1933, neoclassical façade, stained glass by Conrado Sorgenicht Filho,
  Hocca Bar's mortadella sandwich, Sé Cathedral and Rua 25 de Março nearby.
  Enough for a real Guide and at least one verified Place (Hocca Bar).
- Photography check: only 2 candidates found in the media library.
  `mountain-biking-in-sao-paulo-forested-highlands-cross-country-adventuresv2.jpg`
  is a generic anonymous-mountain-biker image with no identifiable São
  Paulo geography and a filename that exactly mirrors an article slug (not
  a camera export) — visually inspected and judged likely stock/AI. The
  other, a São Paulo staircase street-art shot, is explicitly credited
  "Photo by Caroline Cagnin" — confirmed stock.
- **Decision: held out of the build this pass.** The project's
  photography-first rule (every destination needs an excellent hero plus
  real variety) is treated as a hard gate, not a preference — a
  text-only page using the honest gradient placeholder was considered and
  rejected in favor of waiting for real photography, consistent with the
  "fewer excellent destinations over more shallow ones" instruction.
  Written content is otherwise ready to go the moment authentic photos
  turn up.

## Playa del Carmen / Xcaret — held in `coming-soon`, blocked on photography

- Very rich written archive found by title search: a Cancún-vs-Playa
  comparison, multiple day-count itineraries (4-day, 6-day), "Riviera Maya
  2026" boutique-hotel and destination guides consistently naming *Playa
  del Carmen* as the region's "beating heart," a cruiser-bike guide, and
  "Hoteles Xcaret: Luxury in the Riviera Maya." The repeated framing points
  toward **Playa del Carmen as the primary destination, with Xcaret and
  Tulum treated as day-trip/experience clusters inside it** — this reading
  is well-supported by article titles but article bodies were not yet
  pulled to confirm named, bookable Places.
- Photography check (completed this pass): every candidate in the media
  library search for "playa del carmen" is explicitly stock-credited —
  "Photo by Willian Justen de Vasconcellos" (x2), "Photo by Tim
  Mossholder," plus two raw `pexels-photo-*.jpeg` files. Zero authentic
  candidates found.
- **Decision: held out of the build this pass**, same photography-first
  reasoning as São Paulo — the taxonomy question (Playa-primary vs.
  broader Riviera Maya) can be finalized once real photography exists to
  build against; no point locking in a content structure with stock-only
  imagery.

Note: this Playa del Carmen entry's framing ("Xcaret and Tulum treated as
day-trip/experience clusters inside it") predates Pass 8's Tulum build.
Pass 8 confirmed enough Tulum-specific content via the WordPress API to
build Tulum as its own GUIDE-tier destination (see above) independent of
this still-unresolved Playa del Carmen taxonomy question.

## Recommendation for the next content pass

1. Re-run the São Paulo and Playa del Carmen photo searches periodically
   — both are otherwise close to buildable and are blocked purely on
   authentic photography, not on written content.
2. If real São Paulo photography turns up, build it with its own identity
   (Mercado Municipal / food-market angle) rather than "Rio but urban."
3. If Playa del Carmen photography turns up, pull article bodies (the
   "beating heart" piece, one of the day-count itineraries, the Xcaret
   hotel guide) to extract real named Places before deciding final
   structure.
4. Re-run the Argentina/Peru/Chile/Costa Rica/Caribbean photo searches
   periodically — same blocker as São Paulo/Playa del Carmen.
5. Consider elevating Guadalajara and/or Tulum from GUIDE to LIVE if a
   future pass finds verified in-city category variety (restaurant/shop/
   cafe/nightlife) and richer photography beyond what's documented above.
6. If individual Tulum article permalinks turn up (not just the API
   category listing), attach real `sourceUrl`s to the existing Tulum
   Places and build proper Guides — both were deliberately left out this
   pass rather than guessed at.

## Pass 15 — archive-scale reconnaissance + Buenos Aires

Real numbers pulled from the WordPress REST API's own `/categories` and
`/tags` endpoints (`count` field — reliable structured data, unlike bulk
post enumeration, which a tool limitation this pass could not do
exhaustively — see caveat below):

- `Destinations` category: **287 posts**. `Experiences`: 135. Country
  categories: Mexico 63, South America 91 (parent/overlap), Argentina 27,
  Colombia 29, Brazil 18, Caribbean 28, Central America 12, Peru 10,
  Chile 9, Ecuador 9, Costa Rica 7.
- City-level **tag** counts (the real per-destination coverage signal):
  Cartagena 21, Buenos Aires 15, Playa Del Carmen 15, Mexico
  City/CDMX 12+6, Mendoza 7, Rio de Janeiro 7, Guadalajara 5, Cancún 5,
  Tulum 4, São Paulo 4, Patagonia 4, Santiago 3, Oaxaca 3, Punta Cana 2,
  Galápagos 2, Havana 2, Quito 2. Notably absent as real destination
  tags: Bogotá, Medellín, Napa, San Francisco (SF only appears via
  "World Cup San Francisco," a 2026 event tag, not a destination guide —
  consistent with the Pass 8 finding that Napa/SF have no real guide
  content, only passing mentions).
- **Buenos Aires built this pass** (was 0 → now LIVE/PLAN, 12 Places,
  6 neighborhoods, 1 ready-made itinerary) — the single strongest
  untapped destination by tag count. Sourced from 3 real articles found
  via the Buenos Aires tag: a Palermo Soho/Recoleta boutique walking
  tour, a honeymoon guide (hotels/restaurants/museums), and a culture &
  nightlife piece. No firsthand Jordann photography exists for it yet —
  every Place has `photos: []` and renders on the honest placeholder.
- **Tooling caveat, stated plainly**: true bulk post enumeration (fetch
  every one of ~287 posts and read full bodies) is not reliable with the
  tools available this session — `WebFetch` silently truncates/
  summarizes large JSON responses (asked for 20-100 posts per call,
  reliably got 2-8), and direct `curl`/API access is blocked by this
  session's egress policy. The category/tag `count` endpoints are
  reliable (small, structured, no truncation) and are what the numbers
  above come from — but a genuine "scan all 287 Destinations posts and
  extract every named place" pass would take dozens of individual
  WebFetch calls per destination, not one systematic sweep. Playa del
  Carmen (15 tagged posts, only 3 Places currently used) is the clearest
  next candidate to mine deeper with that same per-destination approach
  used for Buenos Aires.

## Cartagena media pass + light mining follow-up (this pass)

- Built the Cartagena video/photo editorial feature described above
  (3 new real photos, 2 real video clips, the generic `MediaMoment` type/
  data/component). See the updated Cartagena entry above for details.
- Checked `thebrunchmanifesto.blog`'s destination archive for anything new
  on Cartagena, Buenos Aires, São Paulo and Guadalajara. Found and mined
  2 genuinely new, real, addressed São Paulo boutiques not previously in
  the dataset — Martha Medeiros (handcrafted Brazilian lace, Rua Melo
  Alves 248, Jardins) and Ara Vartanian (fine jewelry/"inverted diamonds",
  NK Store, Rua Haddock Lobo 1592, Jardins) — added as
  `pl-martha-medeiros` and `pl-ara-vartanian` in
  `src/data/destinations/sao-paulo.ts` (São Paulo: 21 → 23 Places).
  A September 2026 single-boutique Cartagena article
  (`agua-by-agua-bendita-cartagena-resortwear`) covers a place already in
  the dataset (`pl-agua-by-agua-bendita`) — no new Place needed.
  Buenos Aires and Guadalajara turned up nothing new this pass beyond what
  Pass 15/5 already captured. Time-boxed — did not attempt the full
  per-post Playa del Carmen deep-mine flagged as the next candidate above.
