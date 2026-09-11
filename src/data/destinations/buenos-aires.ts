import type { Destination, Place, Neighborhood, Itinerary } from '@/types'

// ---------------------------------------------------------------------------
// Buenos Aires — PLAN tier (Pass 15, archive-mining pass)
//
// PROVENANCE: extracted from real, published thebrunchmanifesto.blog
// (jetsetlatam.com) articles, found via the "Buenos Aires" tag (15 tagged
// posts — the single strongest untapped destination in the archive's own
// tag counts):
//   - "Buenos Aires Beauty: A Wonderful Walking Tour Through Palermo Soho
//     and Recoleta" (2026-02-04)
//   - "Buenos Aires Honeymoon – Latin American Charm Meets European
//     Elegance" (2026-01-23)
//   - "Buenos Aires Culture & Nightlife Essentials" (2025-10-29)
//
// No firsthand Jordann photography exists for Buenos Aires yet (not a trip
// she's supplied photos from) — every Place below has photos: [] and
// renders on the honest placeholder rather than a mismatched stock image.
// That does NOT mean every place is a bare fact: several are marked
// isJetSetPick because the blog's own copy is genuinely evaluative/
// recommending (Don Julio, Rojo Tango, Café Tortoni, MALBA) — editorial
// content Jet Set LatAm already published, not an invented personal
// opinion. The rest are VERIFIED PLACES: real, named, blog-sourced, but
// left as plain factual listing entries because the source copy reads as
// round-up description rather than a personal recommendation — same
// distinction already used for Mexico City's boutique walk.
// ---------------------------------------------------------------------------

export const buenosAiresNeighborhoods: Neighborhood[] = [
  {
    id: 'nb-palermo-soho',
    name: 'Palermo Soho',
    city: 'Buenos Aires',
    description:
      'Buenos Aires\' fashion-forward heart — cobblestone streets around Plaza Armenia lined with independent Argentine designer boutiques, concept stores and café terraces.',
  },
  {
    id: 'nb-palermo-hollywood',
    name: 'Palermo Hollywood',
    city: 'Buenos Aires',
    description:
      'Palermo Soho\'s quieter, design-hotel-heavy neighbor — named for the film and TV studios once clustered here, now known for boutique stays and a slower pace than Soho\'s shopping streets.',
  },
  {
    id: 'nb-recoleta',
    name: 'Recoleta',
    city: 'Buenos Aires',
    description:
      'Buenos Aires\' grandest, most European-feeling district — Belle Époque mansions, the Museo Nacional de Bellas Artes, and the marble-lined Alvear Palace Hotel.',
  },
  {
    id: 'nb-centro-ba',
    name: 'Centro / Monserrat',
    city: 'Buenos Aires',
    description:
      'The historic downtown core, anchored by Avenida de Mayo — home to Café Tortoni, the city\'s oldest café, open since 1858.',
  },
  {
    id: 'nb-puerto-madero',
    name: 'Puerto Madero',
    city: 'Buenos Aires',
    description:
      'A revitalized dockyard district of glass towers and red-brick warehouses along the old port — home to the Faena Hotel and its landmark Rojo Tango show.',
  },
  {
    id: 'nb-retiro',
    name: 'Retiro',
    city: 'Buenos Aires',
    description:
      'A well-heeled district bordering Recoleta, home to Florería Atlántico — a flower shop by day that hides one of the city\'s best-known cocktail bars downstairs.',
  },
]

export const buenosAiresPlaces: Place[] = [
  // --- Jet Set Picks: genuinely evaluative blog copy ---------------------
  {
    id: 'pl-don-julio',
    name: 'Don Julio',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Palermo Soho',
    category: 'restaurant',
    description:
      'A corner parrilla in Palermo Soho, widely regarded as one of the world\'s great steakhouses — an intimate dining room, a wine list covering the walls, and Argentine beef cooked over wood coals.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'World-class Argentine steak in an intimate, unpretentious setting — reserve well ahead.',
      spend: '$$$',
    },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Don+Julio+Palermo+Buenos+Aires',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['steakhouse', 'parrilla', 'fine-dining'],
  },
  {
    id: 'pl-rojo-tango',
    name: 'Rojo Tango at Faena Hotel',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Puerto Madero',
    category: 'nightlife',
    description:
      'A theatrical, cabaret-style tango dinner show inside the Faena Hotel\'s red-velvet Cabaret room — one of the city\'s best-known tango experiences, aimed squarely at visitors who want the full spectacle version of the dance.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The most polished, theatrical tango show in the city — go for spectacle, not an intimate milonga.',
      spend: '$$$$',
    },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rojo+Tango+Faena+Hotel+Buenos+Aires',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['tango', 'show', 'faena'],
  },
  {
    id: 'pl-cafe-tortoni',
    name: 'Café Tortoni',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Centro / Monserrat',
    category: 'cafe',
    description:
      'The city\'s oldest café, open on Avenida de Mayo since 1858 — marble tables, stained glass and a century-plus of writers and artists having passed through, still busy with coffee and people-watching.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Coffee and medialunas inside a genuine 19th-century room — come mid-morning to beat the tour groups.',
      spend: '$$',
    },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cafe+Tortoni+Buenos+Aires',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['historic-cafe', 'coffee', 'centro'],
  },
  {
    id: 'pl-malba',
    name: 'MALBA',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Recoleta',
    category: 'museum',
    description:
      'The Museo de Arte Latinoamericano de Buenos Aires — a light-filled modern building holding one of the region\'s major collections of 20th-century Latin American art, including Frida Kahlo and Diego Rivera works.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The best single collection of Latin American art in the city — plan at least two unhurried hours.',
      spend: '$$',
    },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=MALBA+Buenos+Aires',
    website: 'https://www.malba.org.ar/',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['museum', 'latin-american-art'],
  },

  // --- Verified Places: real, blog-sourced, not personally endorsed ------
  {
    id: 'pl-museo-bellas-artes',
    name: 'Museo Nacional de Bellas Artes',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Recoleta',
    category: 'museum',
    description:
      'Argentina\'s national fine arts museum on Avenida del Libertador — free admission, with European masters alongside a major collection of Argentine art.',
    photos: [],
    isJetSetPick: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Museo+Nacional+de+Bellas+Artes+Buenos+Aires',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['museum', 'free-admission'],
  },
  {
    id: 'pl-parque-tres-de-febrero',
    name: 'Parque Tres de Febrero',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Palermo Hollywood',
    category: 'park',
    description:
      'The green core of the Palermo neighborhoods, often called Bosques de Palermo — lakes, a rose garden, and wide paths popular with runners and picnickers.',
    photos: [],
    isJetSetPick: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Tres+de+Febrero+Buenos+Aires',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['park', 'rose-garden', 'running'],
  },
  {
    id: 'pl-plaza-armenia',
    name: 'Plaza Armenia',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Palermo Soho',
    category: 'landmark',
    description:
      'One of Palermo Soho\'s most recognizable landmarks — a small plaza that anchors the neighborhood\'s densest cluster of independent boutiques.',
    photos: [],
    isJetSetPick: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Armenia+Palermo+Soho+Buenos+Aires',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['plaza', 'palermo-soho'],
  },
  {
    id: 'pl-alvear-palace',
    name: 'Alvear Palace Hotel',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Recoleta',
    category: 'hotel',
    description:
      'A Belle Époque luxury hotel in Recoleta since 1932 — marble interiors, a rooftop bar, and the kind of old-world grandeur Recoleta is built around.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Alvear+Palace+Hotel+Buenos+Aires',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['luxury-hotel', 'recoleta', 'historic'],
  },
  {
    id: 'pl-floreria-atlantico',
    name: 'Florería Atlántico',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Retiro',
    category: 'bar',
    description:
      'A working flower shop by day in Retiro — walk past the coolers to a hidden staircase down to one of the city\'s best-known speakeasy-style cocktail bars.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Floreria+Atlantico+Buenos+Aires',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['speakeasy', 'cocktails', 'hidden-bar'],
  },
  {
    id: 'pl-casa-rincon',
    name: 'Casa Rincón',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Palermo Soho',
    category: 'shop',
    address: 'Nicaragua 6045, Palermo Soho',
    description: 'A beautifully curated boutique showcasing modern Argentine fashion.',
    photos: [],
    isJetSetPick: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Nicaragua+6045+Palermo+Soho+Buenos+Aires',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['boutique', 'argentine-fashion'],
  },
  {
    id: 'pl-humawaca',
    name: 'Humawaca',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Palermo Soho',
    category: 'shop',
    address: 'El Salvador 4696, Palermo Soho',
    description: 'Bold, architectural leather goods made in Argentina.',
    photos: [],
    isJetSetPick: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=El+Salvador+4696+Palermo+Soho+Buenos+Aires',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['leather-goods', 'boutique'],
  },
  {
    id: 'pl-rapsodia',
    name: 'Rapsodia',
    country: 'Argentina',
    city: 'Buenos Aires',
    neighborhood: 'Palermo Soho',
    category: 'shop',
    address: 'El Salvador 4666, Palermo Soho',
    description: 'An iconic Argentine brand known for bohemian-inspired pieces with embroidery.',
    photos: [],
    isJetSetPick: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=El+Salvador+4666+Palermo+Soho+Buenos+Aires',
    sourceUrl: 'https://thebrunchmanifesto.blog',
    tags: ['boutique', 'bohemian', 'argentine-brand'],
  },
]

export const buenosAiresReadyMadeItinerary: Itinerary = {
  id: 'it-buenos-aires-palermo-recoleta-3day',
  destinationId: 'buenos-aires',
  title: 'Palermo, Recoleta + Tango, 3 Days',
  isReadyMade: true,
  days: [
    {
      day: 1,
      theme: 'Palermo Soho: Boutiques + Plaza',
      activities: [
        { id: 'ba-a1', time: '9:00', label: 'Breakfast', notes: 'Open block — no verified place yet for this slot' },
        { id: 'ba-a2', time: '10:30', label: 'Plaza Armenia', placeId: 'pl-plaza-armenia' },
        { id: 'ba-a3', time: '11:00', label: 'Boutique walk', placeId: 'pl-casa-rincon' },
        { id: 'ba-a4', time: '12:00', label: 'Shop', placeId: 'pl-humawaca' },
        { id: 'ba-a5', time: '13:00', label: 'Lunch', notes: 'Open block — no verified place yet for this slot' },
        { id: 'ba-a6', time: '15:00', label: 'Shop', placeId: 'pl-rapsodia' },
        { id: 'ba-a7', time: '19:30', label: 'Dinner', placeId: 'pl-don-julio' },
      ],
    },
    {
      day: 2,
      theme: 'Recoleta: Museums + Grand Hotels',
      activities: [
        { id: 'ba-a8', time: '9:00', label: 'Breakfast', notes: 'Open block — no verified place yet for this slot' },
        { id: 'ba-a9', time: '10:30', label: 'MALBA', placeId: 'pl-malba' },
        { id: 'ba-a10', time: '13:00', label: 'Museo Nacional de Bellas Artes', placeId: 'pl-museo-bellas-artes' },
        { id: 'ba-a11', time: '15:00', label: 'Walk past Alvear Palace Hotel', placeId: 'pl-alvear-palace' },
        { id: 'ba-a12', time: '17:30', label: 'Drinks', placeId: 'pl-floreria-atlantico' },
      ],
    },
    {
      day: 3,
      theme: 'Centro + Puerto Madero: History + Tango',
      activities: [
        { id: 'ba-a13', time: '9:00', label: 'Breakfast at Café Tortoni', placeId: 'pl-cafe-tortoni' },
        { id: 'ba-a14', time: '11:00', label: 'Explore Centro', notes: 'Open block — no verified place yet for this slot' },
        { id: 'ba-a15', time: '13:00', label: 'Lunch', notes: 'Open block — no verified place yet for this slot' },
        { id: 'ba-a16', time: '15:30', label: 'Parque Tres de Febrero', placeId: 'pl-parque-tres-de-febrero' },
        { id: 'ba-a17', time: '21:00', label: 'Rojo Tango', placeId: 'pl-rojo-tango' },
      ],
    },
  ],
}

export const buenosAiresDestination: Destination = {
  id: 'buenos-aires',
  slug: 'buenos-aires',
  city: 'Buenos Aires',
  country: 'Argentina',
  heroPhoto: '',
  tagline: 'Steakhouses, tango and Belle Époque grandeur in Argentina\'s capital',
  status: 'live',
  content: {
    overview:
      'Buenos Aires is the strongest untapped city in the Jet Set LatAm archive by its own tag count — a walking tour through Palermo Soho\'s independent boutiques, a honeymoon guide naming Recoleta\'s grand hotels and MALBA, and a culture-and-nightlife piece anchored by Café Tortoni, the city\'s oldest café. Twelve places across restaurant, museum, park, landmark, cafe, nightlife, hotel, bar and shop categories, spanning six neighborhoods from Palermo Soho to Puerto Madero.',
    whyGo: 'World-class steak, serious museums, and tango ranging from a hidden milonga feel to Faena\'s full theatrical spectacle — a city with real range, not just one postcard image.',
    bestTime: 'September–November (spring) and March–May (fall): mild and pleasant, with jacaranda blooms in spring. December–February is hot and humid, but also peak nightlife season; June–August is cool and quieter — best for museums and steakhouse dinners.',
  },
  neighborhoods: buenosAiresNeighborhoods,
  placeIds: [
    'pl-don-julio',
    'pl-rojo-tango',
    'pl-cafe-tortoni',
    'pl-malba',
    'pl-museo-bellas-artes',
    'pl-parque-tres-de-febrero',
    'pl-plaza-armenia',
    'pl-alvear-palace',
    'pl-floreria-atlantico',
    'pl-casa-rincon',
    'pl-humawaca',
    'pl-rapsodia',
  ],
  guideIds: [],
  itineraryIds: [buenosAiresReadyMadeItinerary.id],
}
