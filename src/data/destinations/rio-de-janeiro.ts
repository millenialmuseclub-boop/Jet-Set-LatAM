import type { Destination, Neighborhood, Place, Guide, Itinerary } from '@/types'
import { rioPhotos } from '@/assets/rio'

// ---------------------------------------------------------------------------
// Rio de Janeiro — second real destination (Pass 4)
//
// PROVENANCE: content below is adapted from real, published jetsetlatam.com
// (thebrunchmanifesto.blog) articles:
//   - "A Chic Guide to Rio de Janeiro's Beachfront Neighborhoods" (2025-11-27)
//   - "Cultural Etiquette & Nightlife in Rio de Janeiro" (2025-11-17)
//   - "Discover Olympic Boulevard in Rio de Janeiro" (2025-10-20)
//   - "Santa Teresa, Rio de Janeiro — Where Time Slows and Color Lingers" (2026-01-01)
// Every Place/Guide below is traceable to one of these. Photography is all
// authentic travel-archive photography (camera/phone filenames, no stock
// credits) sourced from the WordPress media library — see
// src/assets/rio/index.ts and docs/CONTENT_INVENTORY.md. Categories with no
// verified source content (museums beyond Museu do Amanhã, additional
// hotels/shops) are intentionally left thin rather than invented.
// ---------------------------------------------------------------------------

export const rioNeighborhoods: Neighborhood[] = [
  {
    id: 'nb-copacabana',
    name: 'Copacabana',
    city: 'Rio de Janeiro',
    description:
      'The most traditional and classic of the beachfront bairros — heritage intertwined with elegance, hotels lining the beach’s graceful curve, and the Barracas doting the sand with their own colorful flags and rented chairs.',
  },
  {
    id: 'nb-ipanema',
    name: 'Ipanema',
    city: 'Rio de Janeiro',
    description:
      'A softer, more refined version of beachfront living — design-forward hotels, boutiques and cafés a few minutes off the sand. Posto 9 is the social heart of the beach; Rua Farme de Amoedo is the LGBTQ+-friendly nightlife strip nearby.',
  },
  {
    id: 'nb-leblon',
    name: 'Leblon',
    city: 'Rio de Janeiro',
    description:
      'Rio’s quiet luxury haven — fewer tourists, a residential feel, some of the city’s best restaurants and coastal walks, and excellent shopping.',
  },
  {
    id: 'nb-santa-teresa',
    name: 'Santa Teresa',
    city: 'Rio de Janeiro',
    description:
      'Perched above the rush of Rio — cobbled streets, pastel homes, bougainvillea over balconies, and a yellow bonde tram still rattling uphill past artists’ ateliers. No itinerary here, just wandering.',
    heroPhoto: rioPhotos.santaTeresaTram,
  },
  {
    id: 'nb-lapa',
    name: 'Lapa',
    city: 'Rio de Janeiro',
    description: 'The heart of Rio’s live music scene — samba halls spilling onto the street after dark.',
  },
]

export const rioPlaces: Place[] = [
  // --- Landmark ---------------------------------------------------------
  {
    id: 'pl-christ-redeemer',
    name: 'Christ the Redeemer',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Corcovado',
    category: 'landmark',
    description:
      'Rio’s defining silhouette, arms open over the city from the top of Corcovado Mountain — one of the New Seven Wonders of the World, and unmissable at golden hour when the statue turns to shadow against the sky.',
    photos: [rioPhotos.christRedeemer, rioPhotos.christRedeemerSunset],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The view from the top — Guanabara Bay, Sugarloaf and the whole city laid out below.',
      orderOrDo: 'Go for sunset if you can time it; the statue turns to pure silhouette against the sky.',
      spend: '$$',
    },
    priceLevel: '$$',
    tags: ['landmark', 'must-see', 'Corcovado'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Christ+the+Redeemer+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-olympic-boulevard'],
    sourceUrl: 'https://thebrunchmanifesto.blog/',
  },
  {
    id: 'pl-sugarloaf-view',
    name: 'Sugarloaf Mountain View',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Urca',
    category: 'landmark',
    description:
      'The cable-car ride up Pão de Açúcar frames the whole bay — Botafogo’s curve, the city skyline and the ocean beyond, best caught in the soft light of late afternoon.',
    photos: [rioPhotos.sugarloafPanorama],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['landmark', 'views', 'cable car'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sugarloaf+Mountain+Rio+de+Janeiro',
    sourceUrl: 'https://thebrunchmanifesto.blog/',
  },

  // --- Olympic Boulevard / Porto Maravilha -------------------------------
  {
    id: 'pl-kobra-mural',
    name: 'Kobra’s "Etnias" Mural',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Porto Maravilha',
    category: 'landmark',
    description:
      'Eduardo Kobra’s 190-meter street art masterpiece along Olympic Boulevard, depicting five indigenous faces from different continents in vivid geometric color — one of Rio’s most photographed pieces of public art.',
    photos: [rioPhotos.kobraMural],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The mural at morning or golden hour, when the colors read best.',
      orderOrDo: 'Stand across the tram tracks for the full panoramic shot.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['street art', 'Porto Maravilha', 'photography'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kobra+Etnias+Mural+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-olympic-boulevard'],
    pairWithPlaceId: 'pl-museu-do-amanha',
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/10/20/explore-olympic-boulevard-in-rio-de-janeiro/',
  },
  {
    id: 'pl-museu-do-amanha',
    name: 'Museu do Amanhã (Museum of Tomorrow)',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Porto Maravilha',
    category: 'museum',
    address: 'Porto Maravilha district, Rio de Janeiro',
    description:
      'A futuristic Santiago Calatrava building extending dramatically over Guanabara Bay, with immersive exhibits on sustainability, biodiversity and the shared future of humanity. Visit early for soft light and shorter lines.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['museum', 'architecture', 'Porto Maravilha'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Museu+do+Amanha+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-olympic-boulevard'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/10/20/explore-olympic-boulevard-in-rio-de-janeiro/',
  },

  // --- Hotels -------------------------------------------------------------
  {
    id: 'pl-copacabana-palace',
    name: 'Copacabana Palace, A Belmond Hotel',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Copacabana',
    category: 'hotel',
    description:
      'The classic Art Deco hotel at the center of Copacabana beach, host to a century of legends — royalty, the Rolling Stones, Madonna, Janis Joplin, Marlene Dietrich, Orson Welles, Brigitte Bardot. Old-world glamour and impeccable service.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Old-world Rio glamour — the rooftop pool and a century of legendary guests.',
      spend: '$$$$',
    },
    priceLevel: '$$$$',
    tags: ['hotel', 'Art Deco', 'iconic', 'Copacabana'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Copacabana+Palace+Belmond+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-etiquette-nightlife', 'gd-rio-beachfront-neighborhoods'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/27/a-luxury-guide-to-rio-de-janeiros-beachfront-hotels/',
  },
  {
    id: 'pl-hotel-fasano',
    name: 'Hotel Fasano Rio de Janeiro',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Ipanema',
    category: 'hotel',
    description:
      'An iconic Ipanema address with a legendary rooftop pool — clean-lined design, natural light and polished wood, minutes from Ipanema’s boutiques and cafés.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The rooftop pool and Ipanema’s slightly more upscale, slower energy.',
      spend: '$$$$',
    },
    priceLevel: '$$$$',
    tags: ['hotel', 'design', 'rooftop pool', 'Ipanema'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Fasano+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-etiquette-nightlife', 'gd-rio-beachfront-neighborhoods'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/17/cultural-etiquette-nightlife-in-rio-de-janeiro/',
  },
  {
    id: 'pl-santa-teresa-hotel',
    name: 'Santa Teresa Hotel RJ – MGallery',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Santa Teresa',
    category: 'hotel',
    description:
      'Artistic, serene, and perfect for a romantic escape — a boutique stay tucked into Santa Teresa’s cobbled hillside, above the rush of the city.',
    photos: [rioPhotos.santaTeresaTram],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'A quieter, artistic base above the city — pair with a wander through Santa Teresa’s ateliers.',
      spend: '$$$',
    },
    priceLevel: '$$$',
    tags: ['hotel', 'boutique', 'Santa Teresa', 'romantic'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Santa+Teresa+Hotel+RJ+MGallery',
    relatedGuideIds: ['gd-rio-etiquette-nightlife', 'gd-rio-santa-teresa'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/01/01/santa-teresa-rio-de-janeiro-where-time-slows-and-color-lingers/',
  },

  // --- Restaurants & cafés --------------------------------------------
  {
    id: 'pl-joaquina',
    name: 'Joaquina',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Leme (Copacabana)',
    category: 'restaurant',
    description:
      'Traditional Brazilian dishes with a creative twist, served on a covered patio with a tropical vibe — technically in Leme, the beach bordering Copacabana to the northwest.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$',
    tags: ['Brazilian', 'patio dining'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Joaquina+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-beachfront-neighborhoods'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/27/a-luxury-guide-to-rio-de-janeiros-beachfront-hotels/',
  },
  {
    id: 'pl-amir',
    name: 'Amir',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Copacabana',
    category: 'restaurant',
    description: 'Middle Eastern cuisine in the heart of Copacabana — a reliable, well-loved neighborhood staple.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['Middle Eastern', 'Copacabana'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Amir+Restaurant+Copacabana+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-beachfront-neighborhoods'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/27/a-luxury-guide-to-rio-de-janeiros-beachfront-hotels/',
  },
  {
    id: 'pl-cafe-do-forte',
    name: 'Café do Forte',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Copacabana',
    category: 'cafe',
    address: 'Fort at the southwest tip of Copacabana beach',
    description:
      'Breakfast, lunch and brunch served from the historic fort at the southwest tip of Copacabana beach — an amazing view of Rio to go with your coffee.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Brunch with a view — the fort setting overlooks the whole curve of Copacabana beach.',
      spend: '$$',
    },
    priceLevel: '$$',
    tags: ['café', 'brunch', 'views'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cafe+do+Forte+Copacabana',
    relatedGuideIds: ['gd-rio-beachfront-neighborhoods'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/27/a-luxury-guide-to-rio-de-janeiros-beachfront-hotels/',
  },
  {
    id: 'pl-gajos-douro',
    name: 'GAJOS D’OURO',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Ipanema/Leblon',
    category: 'restaurant',
    description: 'Portuguese cuisine in the upscale blocks just west of the Canal do Jardim de Alah.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$',
    tags: ['Portuguese', 'upscale'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gajos+Douro+Ipanema+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-beachfront-neighborhoods'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/27/a-luxury-guide-to-rio-de-janeiros-beachfront-hotels/',
  },
  {
    id: 'pl-artigiano',
    name: 'Artigiano',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Ipanema/Leblon',
    category: 'restaurant',
    description: 'Italian cuisine in the same upscale stretch west of the Canal do Jardim de Alah.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$',
    tags: ['Italian', 'upscale'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Artigiano+Ipanema+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-beachfront-neighborhoods'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/27/a-luxury-guide-to-rio-de-janeiros-beachfront-hotels/',
  },

  // --- Nightlife --------------------------------------------------------
  {
    id: 'pl-bar-bip-bip',
    name: 'Bar Bip Bip',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Copacabana',
    category: 'nightlife',
    description:
      'A very (very) informal local hangout that often hosts choro and samba musicians wandering in and out — hours are flexible, and figuring out the unwritten rules is part of the fun.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Live choro and samba in the most unpretentious room in Copacabana.',
      skipIf: 'You want a polished, reservations-required night out.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['samba', 'choro', 'dive bar', 'live music'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bar+Bip+Bip+Copacabana',
    relatedGuideIds: ['gd-rio-etiquette-nightlife'],
    pairWithPlaceId: 'pl-blue-note-rio',
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/27/a-luxury-guide-to-rio-de-janeiros-beachfront-hotels/',
  },
  {
    id: 'pl-blue-note-rio',
    name: 'The Blue Note',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Copacabana',
    category: 'nightlife',
    description: 'An excellent room to watch Bossa Nova, jazz and other live shows in Copacabana.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['jazz', 'bossa nova', 'live music'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Blue+Note+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-etiquette-nightlife'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/27/a-luxury-guide-to-rio-de-janeiros-beachfront-hotels/',
  },
  {
    id: 'pl-theatro-municipal',
    name: 'Theatro Municipal',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Centro',
    category: 'landmark',
    description: 'An opulent Belle Époque setting for ballet, opera or concerts in the heart of Centro.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['opera house', 'architecture', 'culture'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Theatro+Municipal+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-etiquette-nightlife'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/17/cultural-etiquette-nightlife-in-rio-de-janeiro/',
  },

  // --- Beach & experience -------------------------------------------------
  {
    id: 'pl-posto-9',
    name: 'Posto 9, Ipanema Beach',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Ipanema',
    category: 'beach',
    description:
      'The lifeguard post marked by rainbow flags that has long served as Ipanema’s social hub — sunbathing, socializing and impromptu parties, with the Feira Hippie Sunday market and Rua Farme de Amoedo’s nightlife close by.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The best people-watching stretch of Ipanema beach, plus the Sunday Feira Hippie craft market nearby.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['beach', 'Ipanema', 'social'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Posto+9+Ipanema+Beach',
    relatedGuideIds: ['gd-rio-beachfront-neighborhoods'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/27/a-luxury-guide-to-rio-de-janeiros-beachfront-hotels/',
  },
  {
    id: 'pl-arpoador',
    name: 'Pedra do Arpoador',
    country: 'Brazil',
    city: 'Rio de Janeiro',
    neighborhood: 'Ipanema',
    category: 'landmark',
    description:
      'A rock outcropping at the northeast tip of Ipanema beach where locals gather nightly to clap as the sun dips below the horizon — one of Rio’s best free sunset rituals.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['sunset', 'viewpoint', 'free'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pedra+do+Arpoador+Rio+de+Janeiro',
    relatedGuideIds: ['gd-rio-etiquette-nightlife'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/17/cultural-etiquette-nightlife-in-rio-de-janeiro/',
  },
]

export const rioGuides: Guide[] = [
  {
    id: 'gd-rio-beachfront-neighborhoods',
    title: 'A Chic Guide to Rio de Janeiro’s Beachfront Neighborhoods',
    destinationId: 'rio-de-janeiro',
    section: 'stay',
    dek: 'Copacabana’s classic energy, Ipanema’s stylish calm, Leblon’s quiet luxury — three bairros, one Atlantic backdrop.',
    heroPhoto: rioPhotos.sugarloafPanorama,
    body:
      'Rio de Janeiro’s beachfront neighborhoods each tell a different story. Copacabana is the most traditional and classic — the Copacabana Palace has hosted royalty and legends for a century, and the Barracas along the sand rent chairs, parasols and towels. Ipanema offers a softer, more refined version of beachfront living: design-forward hotels, boutiques and cafés minutes from Posto 9, the beach’s social hub. Leblon, further south, is Rio’s quiet luxury haven — fewer tourists, a residential feel, and some of the city’s best restaurants. For food, a beachside quiosque covers lunch, or venture inland to Joaquina, Amir, Café do Forte, GAJOS D’OURO or Artigiano.',
    placeIds: [
      'pl-copacabana-palace', 'pl-hotel-fasano', 'pl-joaquina', 'pl-amir',
      'pl-cafe-do-forte', 'pl-gajos-douro', 'pl-artigiano', 'pl-posto-9',
    ],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/27/a-luxury-guide-to-rio-de-janeiros-beachfront-hotels/',
    publishedAt: '2025-11-27',
  },
  {
    id: 'gd-rio-etiquette-nightlife',
    title: 'Cultural Etiquette & Nightlife in Rio de Janeiro',
    destinationId: 'rio-de-janeiro',
    section: 'nightlife',
    dek: 'From morning beach rituals on Ipanema to samba-fueled nights in Lapa — tuning into Rio’s local rhythm.',
    body:
      'Rio moves to its own rhythm. Warm greetings matter here — a light hug or one-sided cheek kiss is common, and punctuality is flexible. Nightlife starts late, around 10–11pm: samba in Lapa, rooftop bars in Ipanema and Copacabana, opera or ballet at the opulent Theatro Municipal, or the nightly ritual of clapping as the sun sets at Pedra do Arpoador. For an unpretentious night, Bar Bip Bip in Copacabana hosts choro and samba musicians who wander in and out; for something more polished, The Blue Note covers Bossa Nova and jazz. Stay at the Copacabana Palace for old-world glamour, Hotel Fasano for Ipanema’s rooftop pool, or the Santa Teresa Hotel for an artistic, romantic escape above the city.',
    placeIds: [
      'pl-bar-bip-bip', 'pl-blue-note-rio', 'pl-theatro-municipal', 'pl-arpoador',
      'pl-copacabana-palace', 'pl-hotel-fasano', 'pl-santa-teresa-hotel',
    ],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/11/17/cultural-etiquette-nightlife-in-rio-de-janeiro/',
    publishedAt: '2025-11-17',
  },
  {
    id: 'gd-rio-olympic-boulevard',
    title: 'Discover Olympic Boulevard in Rio de Janeiro',
    destinationId: 'rio-de-janeiro',
    section: 'see',
    dek: 'Street art, waterfront strolls and cultural highlights along Porto Maravilha — modern Rio beyond the beaches.',
    heroPhoto: rioPhotos.kobraMural,
    body:
      'Developed for the 2016 Summer Olympics, Olympic Boulevard blends futuristic architecture, world-class street art and cultural landmarks along Guanabara Bay. Start at the Museu do Amanhã, Santiago Calatrava’s dramatic building extending over the bay, then walk to Eduardo Kobra’s 190-meter "Etnias" mural — five indigenous faces from different continents in vivid geometric color, best photographed in morning or golden-hour light from across the tram tracks. The VLT Carioca tram from Central do Brasil or Praça XV gets you there easily. This is Rio’s modern identity: art, architecture and daily life, not a rushed itinerary.',
    placeIds: ['pl-museu-do-amanha', 'pl-kobra-mural', 'pl-christ-redeemer'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2025/10/20/explore-olympic-boulevard-in-rio-de-janeiro/',
    publishedAt: '2025-10-20',
  },
  {
    id: 'gd-rio-santa-teresa',
    title: 'Santa Teresa, Rio de Janeiro — Where Time Slows and Color Lingers',
    destinationId: 'rio-de-janeiro',
    section: 'see',
    dek: 'Cobbled streets, pastel homes and the yellow bonde tram — a neighborhood best explored without a plan.',
    heroPhoto: rioPhotos.santaTeresaTram,
    body:
      'Perched above the rush of Rio, Santa Teresa feels like a secret kept by artists and poets. Cobbled streets curve past pastel homes and bougainvillea-draped balconies; the historic yellow bonde tram still rattles uphill past hand-painted doors and quiet ateliers. There’s no itinerary to follow here — mornings unfold slowly over strong coffee and views of Guanabara Bay, and by evening the neighborhood glows, glasses clinking, Rio feeling intimate rather than vast. Wear comfortable shoes and let the streets decide your route.',
    placeIds: ['pl-santa-teresa-hotel'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/01/01/santa-teresa-rio-de-janeiro-where-time-slows-and-color-lingers/',
    publishedAt: '2026-01-01',
  },
]

// A ready-made itinerary, assembled deterministically from the real Places
// above (not AI-generated) — same pattern as the Mexico City template.
export const rioReadyMadeItinerary: Itinerary = {
  id: 'it-rio-beaches-art-samba-3day',
  destinationId: 'rio-de-janeiro',
  title: 'Rio de Janeiro: Beaches, Art & Samba, 3 Days',
  isReadyMade: true,
  days: [
    {
      day: 1,
      theme: 'Arrival + Copacabana',
      activities: [
        { id: 'r1', time: '9:00', label: 'Breakfast', placeId: 'pl-cafe-do-forte' },
        { id: 'r2', time: '10:30', label: 'Beach morning', notes: 'Copacabana beach, chairs from a Barraca' },
        { id: 'r3', time: '13:00', label: 'Lunch', placeId: 'pl-amir' },
        { id: 'r4', time: '15:00', label: 'Check in', placeId: 'pl-copacabana-palace' },
        { id: 'r5', time: '19:30', label: 'Dinner', placeId: 'pl-joaquina' },
        { id: 'r6', time: '21:00', label: 'Live music', placeId: 'pl-bar-bip-bip' },
      ],
    },
    {
      day: 2,
      theme: 'Icons + Porto Maravilha',
      activities: [
        { id: 'r7', time: '9:00', label: 'Breakfast', notes: 'Open block — no verified pick yet' },
        { id: 'r8', time: '10:30', label: 'Christ the Redeemer', placeId: 'pl-christ-redeemer' },
        { id: 'r9', time: '13:00', label: 'Lunch', placeId: 'pl-gajos-douro' },
        { id: 'r10', time: '15:00', label: 'Museu do Amanhã', placeId: 'pl-museu-do-amanha' },
        { id: 'r11', time: '17:30', label: 'Kobra Mural', placeId: 'pl-kobra-mural' },
        { id: 'r12', time: '21:00', label: 'Bossa nova', placeId: 'pl-blue-note-rio' },
      ],
    },
    {
      day: 3,
      theme: 'Ipanema + Santa Teresa',
      activities: [
        { id: 'r13', time: '9:00', label: 'Beach morning', placeId: 'pl-posto-9' },
        { id: 'r14', time: '13:00', label: 'Lunch', placeId: 'pl-artigiano' },
        { id: 'r15', time: '15:00', label: 'Wander Santa Teresa', placeId: 'pl-santa-teresa-hotel' },
        { id: 'r16', time: '18:00', label: 'Sunset', placeId: 'pl-arpoador' },
      ],
    },
  ],
}

export const rioDeJaneiroDestination: Destination = {
  id: 'rio-de-janeiro',
  slug: 'rio-de-janeiro',
  city: 'Rio de Janeiro',
  country: 'Brazil',
  heroPhoto: rioPhotos.sugarloafPanorama,
  tagline: 'Beaches, bossa nova, and the city that moves to its own rhythm.',
  status: 'live',
  content: {
    overview:
      'Rio de Janeiro is a canvas of stunning visuals — towering cliffs embracing the ocean, golden sand, vibrant beachfront bairros. Copacabana’s classic energy, Ipanema’s stylish calm and Leblon’s quiet luxury each tell a different story against the same backdrop of sea, sand and sky. Beyond the beaches, Christ the Redeemer watches over the city from Corcovado, Kobra’s mural anchors the modern waterfront at Porto Maravilha, and Santa Teresa’s cobbled hillside moves at an entirely different pace.',
    whyGo:
      'For a city that rewards both structure and wandering — legendary beachfront hotels and a rooftop-bar nightlife scene sit a short tram ride from Santa Teresa’s unhurried, artist-filled streets.',
    bestTime: 'Content coming soon.',
  },
  neighborhoods: rioNeighborhoods,
  placeIds: rioPlaces.map((p) => p.id),
  guideIds: rioGuides.map((g) => g.id),
  itineraryIds: [rioReadyMadeItinerary.id],
}
