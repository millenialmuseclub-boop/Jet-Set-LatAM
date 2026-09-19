import { finalTravelPhotos } from '../final-travel-photos'
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
// EXPLORE, not PLAN: real, named Places pulled from the archive's "Perfect
// Four Day Itinerary" post (restaurants, a beach club, a café, a landmark
// plaza and a rooftop) plus the Xcaret butterfly sanctuary. Still not
// planner-enabled — same posture as Guadalajara/Tulum: a real destination
// page, not a stub.
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
  {
    id: 'nb-quinta-avenida',
    name: 'Quinta Avenida',
    city: 'Playa del Carmen',
    description: 'The pedestrian spine of downtown Playa — restaurants, artisan shops and street life running roughly parallel to the beach.',
  },
  {
    id: 'nb-centro-pdc',
    name: 'Centro',
    city: 'Playa del Carmen',
    description: 'The town center around Parque Fundadores and the waterfront — plazas, churches and the ferry terminal to Cozumel.',
  },
  {
    id: 'nb-coco-beach',
    name: 'Coco Beach',
    city: 'Playa del Carmen',
    description: 'A quieter stretch of beach north of downtown — calmer water, beach clubs and rooftop pools with fewer crowds than Quinta Avenida.',
  },
]

export const playaDelCarmenPlaces: Place[] = [
  {
    id: 'pl-la-cueva-del-chango',
    practicalNotes: 'Use this as the breakfast anchor of a downtown day. Allow a flexible arrival rather than a tightly timed transfer afterward.',
    name: 'La Cueva del Chango',
    country: 'Mexico',
    city: 'Playa del Carmen',
    neighborhood: 'Quinta Avenida',
    category: 'restaurant',
    description: 'A garden-set breakfast and brunch spot just off Quinta Avenida — chilaquiles and fresh juices in a leafy, jungle-like setting that feels far from the main strip.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=La+Cueva+del+Chango+Playa+del+Carmen',
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/01/30/playa-del-carmen-perfect-four-day-itinerary/',
    tags: ['breakfast', 'brunch', 'garden'],
  },
  {
    id: 'pl-el-fogon',
    practicalNotes: 'A casual dinner stop for your downtown day. Check which branch works best with the rest of your route.',
    name: 'El Fogón',
    country: 'Mexico',
    city: 'Playa del Carmen',
    neighborhood: 'Quinta Avenida',
    category: 'restaurant',
    description: 'A casual, no-frills taco spot known for its al pastor — the kind of dinner that has nothing to prove and doesn\'t need to.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=El+Fogon+Playa+del+Carmen',
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/01/30/playa-del-carmen-perfect-four-day-itinerary/',
    tags: ['tacos', 'al pastor', 'casual'],
  },
  {
    id: 'pl-ah-cacao',
    practicalNotes: 'An easy pause between other stops; choose the branch closest to your route.',
    name: 'Ah Cacao',
    country: 'Mexico',
    city: 'Playa del Carmen',
    neighborhood: 'Centro',
    category: 'cafe',
    description: 'A Mexican chocolate café chain built on fair-trade cacao from family farms — thick hot chocolate, coffee and pastries, a reliable stop between museum visits and beach time.',
    photos: [],
    website: 'https://ahcacao.com/en',
    isJetSetPick: false,
    priceLevel: '$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ah+Cacao+Playa+del+Carmen',
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/01/30/playa-del-carmen-perfect-four-day-itinerary/',
    tags: ['chocolate', 'coffee', 'cafe'],
  },
  {
    id: 'pl-parque-fundadores',
    name: 'Parque Fundadores',
    country: 'Mexico',
    city: 'Playa del Carmen',
    neighborhood: 'Centro',
    category: 'landmark',
    description: 'The waterfront square at the foot of Quinta Avenida, anchored by the Portal Maya sculpture — live performances, artisan vendors and people-watching, best around sunset.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Los+Fundadores+Playa+del+Carmen',
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/01/30/playa-del-carmen-perfect-four-day-itinerary/',
    tags: ['plaza', 'waterfront', 'sunset'],
  },
  {
    id: 'pl-mandarino-beach-club',
    name: 'Mandarino Beach Club',
    country: 'Mexico',
    city: 'Playa del Carmen',
    neighborhood: 'Coco Beach',
    category: 'beach',
    description: 'A calmer stretch of sand north of the main strip in Coco Beach — fewer crowds, loungers and calm water, a good half-day alternative to Quinta Avenida\'s beach clubs.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mandarino+Beach+Club+Playa+del+Carmen',
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/01/30/playa-del-carmen-perfect-four-day-itinerary/',
    tags: ['beach club', 'coco beach', 'quiet'],
  },
  {
    id: 'pl-the-palm-at-playa',
    name: 'The Palm at Playa',
    country: 'Mexico',
    city: 'Playa del Carmen',
    neighborhood: 'Coco Beach',
    category: 'nightlife',
    description: 'A lively, adults-oriented rooftop pool scene in North Playa — strong cocktails and a see-and-be-seen crowd once the sun goes down.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Palm+at+Playa+Playa+del+Carmen',
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/01/30/playa-del-carmen-perfect-four-day-itinerary/',
    tags: ['rooftop', 'pool', 'nightlife'],
  },
  {
    id: 'pl-xcaret-butterfly-sanctuary',
    practicalNotes: 'Inside Xcaret: plan admission and transport for the wider park. Leave a full day rather than treating the sanctuary as a quick downtown stop.',
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
  heroPhoto: finalTravelPhotos["playa-del-carmen"][0].src,
  tagline: 'The Riviera Maya\'s beating heart, with Xcaret at its doorstep',
  status: 'guide',
  content: {
    overview:
      'Make downtown Playa one day and Xcaret another. Start with a garden breakfast, pause for chocolate, and finish around the waterfront Parque Fundadores. Keep a separate day for the park’s lagoons and butterfly sanctuary so transfers and a long afternoon never compete with a dinner reservation.',
    whyGo: 'For a trip that moves between garden tables, the waterfront and a full park day at Xcaret. Use the short itinerary as a starting point, then save the places you want to return to.',
    bestTime: 'November–April: dry season, the best beach and cenote weather — also the busiest and priciest. June–November is hurricane season, hot and humid with real storm risk, heaviest August–October.',
  },
  neighborhoods: playaDelCarmenNeighborhoods,
  placeIds: playaDelCarmenPlaces.map((p) => p.id),
  guideIds: [],
  itineraryIds: [],
}
