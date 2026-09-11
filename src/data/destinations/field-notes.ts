import type { Destination } from '@/types'

// ---------------------------------------------------------------------------
// FIELD NOTE tier (Pass 12) — smaller, real editorial destinations held back
// only on photography, not on content.
//
// São Paulo graduated out of this file in Pass 12 (same pass) once Jordann
// supplied real trip photography (Beco do Batman) directly — see
// src/data/destinations/sao-paulo.ts. Only Playa del Carmen remains here.
//
// Playa del Carmen was re-searched this pass via the jetsetlatam.com
// (thebrunchmanifesto.blog) WordPress media API. Same result as the prior
// pass (see docs/CONTENT_INVENTORY.md): every candidate photo is explicitly
// stock-credited ("Photo by Willian Justen de Vasconcellos," "Photo by Tim
// Mossholder," two raw pexels-photo-*.jpeg files). No authentic photography
// exists for it yet.
//
// Under this pass's instruction, that doesn't mean "hold out entirely." It
// means: ship the real written content as an honest FIELD NOTE — a smaller
// destination page, PhotoPlaceholder hero instead of a stock photo, and
// only Places that are genuinely named and sourced. Playa del Carmen's
// archive doesn't have confirmed named/bookable Places yet, so none are
// invented here.
// ---------------------------------------------------------------------------

export const fieldNoteDestinations: Destination[] = [
  {
    id: 'playa-del-carmen',
    slug: 'playa-del-carmen',
    city: 'Playa del Carmen',
    country: 'Mexico',
    heroPhoto: '',
    tagline: 'Field Note',
    status: 'field-note',
    content: {
      overview:
        'Source articles consistently frame Playa del Carmen as the "beating heart" of the Riviera Maya, with Xcaret and Tulum as day-trip and experience clusters reachable from it. The archive includes multi-day itineraries, a Cancún-vs-Playa comparison, a cruiser-bike guide, and a dedicated Xcaret hotels guide — rich material, not yet pulled into named, bookable Places, so none are listed here rather than guessed at.',
      whyGo: 'The region’s most-written-about beach town in the archive — held as a field note until either real Places are confirmed from the source articles or authentic, non-stock photography turns up (every current candidate is stock-credited).',
    },
    neighborhoods: [],
    placeIds: [],
    guideIds: [],
    itineraryIds: [],
  },
]
