import type { Destination, Place, Neighborhood } from '@/types'
import { saoPauloPhotos } from '@/assets/sao-paulo'

// ---------------------------------------------------------------------------
// São Paulo — EXPLORE tier (Pass 12, elevated from FIELD NOTE)
//
// Photography: 5 real photos supplied directly by the creator from Beco do
// Batman (Batman Alley), Vila Madalena — see src/assets/sao-paulo/index.ts.
// This unblocks São Paulo's photography hold documented in
// docs/CONTENT_INVENTORY.md (every jetsetlatam.com media-library candidate
// for São Paulo was stock-credited or unidentifiable).
//
// Written content: "Mercado Municipal de São Paulo: A Flavorful Landmark in
// the Heart of the City" (jetsetlatam.com, 2025-10-20) — opened 1933,
// neoclassical façade, stained glass by Conrado Sorgenicht Filho, Hocca
// Bar's mortadella sandwich, Sé Cathedral and Rua 25 de Março nearby.
//
// EXPLORE, not PLAN: 2 verified Places across 2 unconnected clusters
// (a food market and a street art alley) — real and specific, but not the
// category spread/depth Plan a Trip needs. Same posture as Guadalajara/
// Tulum: a real destination page, not a stub, not planner-enabled yet.
// ---------------------------------------------------------------------------

export const saoPauloNeighborhoods: Neighborhood[] = [
  {
    id: 'nb-vila-madalena',
    name: 'Vila Madalena',
    city: 'São Paulo',
    description:
      'A hillside neighborhood of narrow cobblestone streets known for Beco do Batman (Batman Alley), an open-air gallery of ever-changing street art and murals, with jewelry and craft vendors set up along the alley.',
    heroPhoto: saoPauloPhotos.becoDoBatmanDragonMural,
  },
]

export const saoPauloPlaces: Place[] = [
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
  {
    id: 'pl-beco-do-batman',
    name: 'Beco do Batman',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Vila Madalena',
    category: 'landmark',
    description:
      'An open-air street art alley in Vila Madalena — murals covering every wall, repainted often enough that no two visits look the same, with local vendors selling jewelry and crafts along the cobblestones.',
    photos: [
      saoPauloPhotos.becoDoBatmanDragonMural,
      saoPauloPhotos.becoDoBatmanMarketAlley,
      saoPauloPhotos.becoDoBatmanGeometricMural,
      saoPauloPhotos.becoDoBatmanButterflyMural,
      saoPauloPhotos.becoDoBatmanBirdMural,
    ],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The murals change often enough that it rewards a return visit — come for the street art, stay to browse the vendor tables set up along the alley.',
      spend: '$',
    },
    tags: ['street-art', 'mural', 'photo-op'],
  },
]

export const saoPauloDestination: Destination = {
  id: 'sao-paulo',
  slug: 'sao-paulo',
  city: 'São Paulo',
  country: 'Brazil',
  heroPhoto: saoPauloPhotos.becoDoBatmanBirdMural,
  tagline: 'Murals, markets and the creative pulse of Brazil’s biggest city',
  status: 'guide',
  content: {
    overview:
      'Mercado Municipal de São Paulo has anchored the city’s downtown since 1933 — a neoclassical market hall with stained glass by Conrado Sorgenicht Filho, still busy with vendors and lunch crowds; Hocca Bar, inside the market, is known for its mortadella sandwich. Across town in Vila Madalena, Beco do Batman is the city’s open-air street art gallery — a narrow alley where murals are repainted often enough that no two visits look the same.',
    whyGo: 'A working food market with real architectural weight and a street art alley that keeps reinventing itself — two very different sides of the same creative city.',
  },
  neighborhoods: saoPauloNeighborhoods,
  placeIds: ['pl-hocca-bar', 'pl-beco-do-batman'],
  guideIds: [],
  itineraryIds: [],
}
