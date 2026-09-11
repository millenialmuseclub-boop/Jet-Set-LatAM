import type { Destination, Place } from '@/types'

// ---------------------------------------------------------------------------
// FIELD NOTE tier (Pass 12) — smaller, real editorial destinations held back
// only on photography, not on content.
//
// São Paulo and Playa del Carmen were re-searched this pass via the
// jetsetlatam.com (thebrunchmanifesto.blog) WordPress media API. Same
// result as the prior pass (see docs/CONTENT_INVENTORY.md): every
// candidate photo for both is explicitly stock-credited ("Photo by
// Caroline Cagnin," "Photo by Willian Justen de Vasconcellos," "Photo by
// Tim Mossholder," two raw pexels-photo-*.jpeg files) or has a filename
// mirroring an article slug with no identifiable geography — this
// project's established stock/AI heuristic. No authentic photography
// exists for either yet.
//
// Under this pass's instruction, that no longer means "hold out entirely."
// It means: ship the real written content as an honest FIELD NOTE — a
// smaller destination page, PhotoPlaceholder hero instead of a stock
// photo, and only the Places that are genuinely named and sourced. Nothing
// here is invented; anything not explicitly verified in
// docs/CONTENT_INVENTORY.md is left out rather than guessed at.
// ---------------------------------------------------------------------------

export const fieldNotePlaces: Place[] = [
  {
    id: 'pl-hocca-bar',
    name: 'Hocca Bar',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Centro',
    category: 'restaurant',
    description:
      'A counter inside Mercado Municipal de São Paulo, known for one thing above all: the mortadella sandwich, stacked thick, that regulars line up for at lunch.',
    photos: [],
    isJetSetPick: false,
    tags: ['market', 'sandwich', 'lunch'],
  },
]

export const fieldNoteDestinations: Destination[] = [
  {
    id: 'sao-paulo',
    slug: 'sao-paulo',
    city: 'São Paulo',
    country: 'Brazil',
    heroPhoto: '',
    tagline: 'Field Note',
    status: 'field-note',
    content: {
      overview:
        'Mercado Municipal de São Paulo has anchored the city’s downtown since 1933 — a neoclassical market hall with stained glass by Conrado Sorgenicht Filho, still busy with vendors and lunch crowds. Hocca Bar, inside the market, is known for its mortadella sandwich. Sé Cathedral and the Rua 25 de Março shopping strip are both close by.',
      whyGo: 'A working food market with real architectural weight, in a city Jet Set LatAm hasn’t built a full page for yet — no authentic photography exists for São Paulo yet, so this stays a written field note rather than a photo essay.',
    },
    neighborhoods: [],
    placeIds: ['pl-hocca-bar'],
    guideIds: [],
    itineraryIds: [],
  },
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
