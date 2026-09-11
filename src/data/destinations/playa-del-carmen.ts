import type { Destination, Place, Neighborhood } from '@/types'
import { playaDelCarmenPhotos } from '@/assets/playa-del-carmen'

// ---------------------------------------------------------------------------
// Playa del Carmen — EXPLORE tier (Pass 12, elevated from FIELD NOTE)
//
// Photography: 3 real photos supplied directly by the creator from Xcaret,
// the eco-archaeological park just south of Playa del Carmen — see
// src/assets/playa-del-carmen/index.ts. This unblocks the photography hold
// documented in docs/CONTENT_INVENTORY.md (every jetsetlatam.com media-
// library candidate for Playa del Carmen was stock-credited).
//
// Written content: source articles consistently frame Playa del Carmen as
// the "beating heart" of the Riviera Maya, with Xcaret as a day-trip/
// experience cluster reachable from it (per the archive's own framing,
// documented in the former field-notes.ts entry this file replaces).
//
// EXPLORE, not PLAN: one verified Place (Xcaret's butterfly sanctuary) —
// real and specific, but the archive's multi-day itineraries and named
// hotels/restaurants haven't been pulled into individual Places yet. Same
// posture as Guadalajara/Tulum/São Paulo: a real destination page, not a
// stub, not planner-enabled yet.
// ---------------------------------------------------------------------------

export const playaDelCarmenNeighborhoods: Neighborhood[] = [
  {
    id: 'nb-xcaret',
    name: 'Xcaret',
    city: 'Playa del Carmen',
    description:
      'An eco-archaeological park just south of town, built around natural lagoons, underground rivers and a butterfly sanctuary — a full day trip in itself, and the Riviera Maya\'s best-known single attraction.',
    heroPhoto: playaDelCarmenPhotos.xcaretLagoonCove,
  },
]

export const playaDelCarmenPlaces: Place[] = [
  {
    id: 'pl-xcaret-butterfly-sanctuary',
    name: 'Xcaret Butterfly Sanctuary',
    country: 'Mexico',
    city: 'Playa del Carmen',
    neighborhood: 'Xcaret',
    category: 'experience',
    description:
      'A walk-through butterfly garden inside Xcaret, with a photo-op arch reading "Your time as a caterpillar has expired, your wings are ready" — one of the park\'s most-photographed spots, in both English and Spanish.',
    photos: [playaDelCarmenPhotos.xcaretButterflySanctuarySign, playaDelCarmenPhotos.xcaretButterflySanctuaryPortrait],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The photo arch alone is worth the stop, but slow down inside — it\'s a real working butterfly garden, not just a backdrop.',
      spend: '$$',
    },
    tags: ['xcaret', 'butterflies', 'photo-op'],
  },
]

export const playaDelCarmenDestination: Destination = {
  id: 'playa-del-carmen',
  slug: 'playa-del-carmen',
  city: 'Playa del Carmen',
  country: 'Mexico',
  heroPhoto: playaDelCarmenPhotos.xcaretLagoonCove,
  tagline: 'The Riviera Maya\'s beating heart, with Xcaret at its doorstep',
  status: 'guide',
  content: {
    overview:
      'Source articles consistently frame Playa del Carmen as the "beating heart" of the Riviera Maya, with Xcaret as a day-trip cluster reachable from it — a park built around natural lagoons, underground rivers, and a walk-through butterfly sanctuary. The archive includes multi-day itineraries, a Cancún-vs-Playa comparison, a cruiser-bike guide, and a dedicated Xcaret hotels guide, not yet pulled into named, bookable Places beyond the butterfly sanctuary.',
    whyGo: 'The region\'s most-written-about beach town in the archive, now with real photography from Xcaret\'s lagoon and butterfly sanctuary to back it up.',
    bestTime: 'November–April: dry season, the best beach and cenote weather — also the busiest and priciest. June–November is hurricane season, hot and humid with real storm risk, heaviest August–October.',
  },
  neighborhoods: playaDelCarmenNeighborhoods,
  placeIds: ['pl-xcaret-butterfly-sanctuary'],
  guideIds: [],
  itineraryIds: [],
}
