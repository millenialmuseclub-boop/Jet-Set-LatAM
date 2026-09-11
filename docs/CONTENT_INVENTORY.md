# Content Inventory — What's Ready vs. What's Not (Pass 5 update)

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

## Cartagena — LIVE, built out (Pass 5)

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

## Napa, San Francisco Chinatown

- Not searched this pass (Pass 5 priority order stopped at Playa del
  Carmen per the user's explicit list). No stub exists yet — still fully
  open, no assumptions made.

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
4. Run the still-open Napa / San Francisco Chinatown searches.
5. Consider elevating Guadalajara from GUIDE to LIVE if a future pass
   finds verified in-city Places (restaurant/shop/cafe) beyond the
   Tequila day-trip cluster.
