import type { Destination } from '@/types'

// Stub entries proving the Country → City architecture scales beyond the
// built destinations without inventing content for them. No Places/Guides
// attached — these render as "coming soon" in Discover/Destinations until
// real jetsetlatam.com content is migrated in. Rio de Janeiro graduated out
// of this file in Pass 4; Cartagena and Guadalajara graduated out in Pass 5
// — see src/data/destinations/rio-de-janeiro.ts, cartagena.ts and
// guadalajara.ts. São Paulo has real, specific written source content
// (Mercado Municipal / Hocca Bar) but is held here deliberately: no
// authentic, non-stock photography was found for it this pass (see
// docs/CONTENT_INVENTORY.md) and the project's photography-first rule
// treats that as disqualifying rather than shipping a text-only page.
// Playa del Carmen research (rich article archive found) is documented in
// docs/CONTENT_INVENTORY.md and resolved as a photography hold, same as
// São Paulo.
//
// Pass 9 note: both entries below have their `content.overview`/`whyGo`
// filled in from the real, specific written source material CONTENT_INVENTORY.md
// already verified (Mercado Municipal / Hocca Bar for São Paulo; the
// "beating heart of the Riviera Maya" framing for Playa del Carmen) —
// nothing new was researched. `status` stays `'coming-soon'` and `heroPhoto`
// stays empty on purpose: these fields are NOT rendered anywhere while
// status is 'coming-soon' (Destinations.tsx and Discover.tsx render these
// as unclickable placeholder cards, never the overview text), so filling
// them in is a zero-risk way to make the data layer "trivial to flip" the
// moment real, non-stock photography turns up — a future pass only needs to
// add verified Place entries, attach real photo imports, and change
// `status` to `'guide'` or `'live'`. No photography was added or forced.
export const comingSoonDestinations: Destination[] = [
  {
    id: 'sao-paulo',
    slug: 'sao-paulo',
    city: 'São Paulo',
    country: 'Brazil',
    heroPhoto: '',
    tagline: 'Coming soon',
    status: 'coming-soon',
    content: {
      overview: 'Mercado Municipal de São Paulo has anchored the city\'s downtown since 1933 — a neoclassical market hall with stained glass by Conrado Sorgenicht Filho, still busy with vendors and lunch crowds. Hocca Bar, inside the market, is known for its mortadella sandwich. Sé Cathedral and the Rua 25 de Março shopping strip are both close by.',
      whyGo: 'A working food market with real architectural weight, in a city Jet Set LatAm hasn\'t built a page for yet.',
    },
    neighborhoods: [],
    placeIds: [],
    guideIds: [],
    itineraryIds: [],
  },
  {
    id: 'playa-del-carmen',
    slug: 'playa-del-carmen',
    city: 'Playa del Carmen',
    country: 'Mexico',
    heroPhoto: '',
    tagline: 'Coming soon',
    status: 'coming-soon',
    content: {
      overview: 'Source articles consistently frame Playa del Carmen as the "beating heart" of the Riviera Maya, with Xcaret and Tulum as day-trip and experience clusters reachable from it. The archive includes multi-day itineraries, a Cancún-vs-Playa comparison, a cruiser-bike guide, and a dedicated Xcaret hotels guide — rich material, not yet pulled into named, bookable Places.',
      whyGo: 'The region\'s most-written-about beach town in the archive, once real, non-stock photography exists to build against.',
    },
    neighborhoods: [],
    placeIds: [],
    guideIds: [],
    itineraryIds: [],
  },
]
