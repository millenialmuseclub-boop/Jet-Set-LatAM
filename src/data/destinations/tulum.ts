import type { Destination, Place } from '@/types'
import { tulumPhotos } from '@/assets/tulum'

// ---------------------------------------------------------------------------
// Tulum — GUIDE-tier destination (Pass 8)
//
// PROVENANCE: named Places below were confirmed real via the jetsetlatam.com
// WordPress REST API (categories/tags for Tulum) this pass — the Archaeological
// Zone, three cenotes (Cristalino, Azul, Jardín del Edén), Nomade Tulum (cited
// as a walking-route starting point), and three wellness/spa names (Yäan
// Healing Sanctuary, Azulik Spa, Saná Spa). Unlike Cartagena/Guadalajara,
// no individual article permalinks were captured for these this pass — only
// the category listing was confirmed — so `sourceUrl` is deliberately left
// off every Place here rather than attaching an unverified or invented
// article link. No Guides are built for the same reason (Guide.sourceUrl is
// required, not optional). See docs/CONTENT_INVENTORY.md.
//
// Photography: 3 real photos captured via browser screenshot from the
// WordPress media library (THE BRUNCH MANIFESTO-watermarked source images,
// cropped clean — see src/assets/tulum/index.ts): a boardwalk to a turquoise
// beach, and two shots of the Tulum ruins (temple atop the cliff over the
// sea; the same ruins framed by a foreground palm). All three are scenic/
// establishing shots, not tied to specific named businesses beyond the
// Archaeological Zone itself.
//
// GUIDE tier, not LIVE: the category spread here (landmark/experience/hotel)
// looks similar to Guadalajara's, and for the same reason Guadalajara was
// held at GUIDE — Tulum has no verified restaurant/cafe/shop/nightlife
// content, only 3 photos (vs. 5+ at every LIVE destination), and every
// place description is a single verified fact rather than the fuller
// address/price/practical-notes depth LIVE places carry. Real enough for an
// honest destination page; not enough to clear the planner-readiness bar.
// ---------------------------------------------------------------------------

export const tulumPlaces: Place[] = [
  {
    id: 'pl-tulum-ruins',
    name: 'Tulum Archaeological Zone',
    country: 'Mexico',
    city: 'Tulum',
    category: 'landmark',
    description:
      'The walled Maya city perched dramatically above the Caribbean — the only major Maya ruin site built directly on a coastal cliff, with the temple looking straight out over turquoise water.',
    photos: [tulumPhotos.tulumRuinsCliff, tulumPhotos.tulumRuinsPalm],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The single view every Tulum trip is built around — Maya ruins on a cliff, ocean on three sides.',
    },
    tags: ['ruins', 'landmark', 'maya', 'cliff'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tulum+Archaeological+Zone',
  },
  {
    id: 'pl-cenote-cristalino',
    name: 'Cenote Cristalino',
    country: 'Mexico',
    city: 'Tulum',
    category: 'experience',
    description: 'One of the cenotes just outside town — clear, swimmable freshwater in a limestone sinkhole.',
    photos: [],
    isJetSetPick: false,
    tags: ['cenote', 'swimming'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cenote+Cristalino+Tulum',
  },
  {
    id: 'pl-cenote-azul',
    name: 'Cenote Azul',
    country: 'Mexico',
    city: 'Tulum',
    category: 'experience',
    description: 'A popular open cenote near Tulum, known for its clarity and easy access into the water.',
    photos: [],
    isJetSetPick: false,
    tags: ['cenote', 'swimming'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cenote+Azul+Tulum',
  },
  {
    id: 'pl-jardin-del-eden',
    name: 'Jardín del Edén',
    country: 'Mexico',
    city: 'Tulum',
    category: 'experience',
    description: 'A deeper, more dramatic cenote favored for cliff-jumping and diving alongside the swim.',
    photos: [],
    isJetSetPick: false,
    tags: ['cenote', 'diving', 'swimming'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jardin+del+Eden+Cenote+Tulum',
  },
  {
    id: 'pl-nomade-tulum',
    name: 'Nomade Tulum',
    country: 'Mexico',
    city: 'Tulum',
    category: 'hotel',
    description:
      'A jungle-meets-beach boutique hotel used as the starting point for a classic Tulum walking route — cited rather than reviewed in depth here.',
    photos: [],
    isJetSetPick: false,
    tags: ['hotel', 'boutique', 'walking route'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Nomade+Tulum',
  },
  {
    id: 'pl-yaan-healing-sanctuary',
    name: 'Yäan Healing Sanctuary',
    country: 'Mexico',
    city: 'Tulum',
    category: 'experience',
    description: 'A wellness sanctuary built around a private cenote, temazcal ceremonies and spa treatments.',
    photos: [],
    isJetSetPick: false,
    tags: ['wellness', 'spa', 'cenote'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Yaan+Wellness+Energy+Spa+Tulum',
  },
  {
    id: 'pl-azulik-spa',
    name: 'Azulik Spa',
    country: 'Mexico',
    city: 'Tulum',
    category: 'experience',
    description: 'The spa at Tulum\'s striking treehouse-style Azulik resort — treatments in an architecturally dramatic jungle setting.',
    photos: [],
    isJetSetPick: false,
    tags: ['wellness', 'spa'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Azulik+Spa+Tulum',
  },
  {
    id: 'pl-sana-spa',
    name: 'Saná Spa',
    country: 'Mexico',
    city: 'Tulum',
    category: 'experience',
    description: 'A Tulum spa offering traditional and holistic treatments — part of the town\'s broader wellness-tourism identity.',
    photos: [],
    isJetSetPick: false,
    tags: ['wellness', 'spa'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sana+Spa+Tulum',
  },
]

export const tulumDestination: Destination = {
  id: 'tulum',
  slug: 'tulum',
  city: 'Tulum',
  country: 'Mexico',
  heroPhoto: tulumPhotos.tulumBoardwalkBeach,
  tagline: 'Ruins above the Caribbean, cenotes inland, and a wellness scene built for slowing down.',
  status: 'guide',
  content: {
    overview:
      'Tulum layers three real identities on top of each other: the walled Maya city on its cliff above the Caribbean, a ring of freshwater cenotes just inland (Cristalino, Azul, Jardín del Edén), and one of Mexico\'s most concentrated wellness scenes, from temazcal ceremonies at Yäan to spa treatments at Azulik and Saná. Nomade Tulum anchors a well-known walking route through the hotel zone.',
    whyGo:
      'For the single postcard view — Maya ruins on a cliff over turquoise water — and for a wellness/cenote scene with real depth beyond the beach clubs.',
    bestTime: 'December–April: dry, sunny and the best cenote/beach weather — also the busiest and most expensive. May is a good shoulder month. June–November is hurricane season — hot, humid, with real storm risk, especially August–October.',
  },
  neighborhoods: [],
  placeIds: tulumPlaces.map((p) => p.id),
  guideIds: [],
  itineraryIds: [],
}
