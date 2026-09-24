import type { Destination, Neighborhood, Place, Guide, Itinerary } from '@/types'

// ---------------------------------------------------------------------------
// Medellín, Colombia
//
// PROVENANCE: Jordann's own blog (thebrunchmanifesto.blog) has zero
// Medellín-tagged posts or trip-diary content — confirmed by searching its
// WordPress REST API for "medellin" this pass. Every fact below therefore
// comes from legitimate general web research: official Medellín/Colombia
// tourism sites, Wikipedia, and reputable travel publications, each cited
// on its own Place/Guide via sourceUrl. Nothing here is invented — a fact
// that couldn't be verified (exact addresses, prices, opening details not
// stated by a source) was left out rather than guessed.
//
// PHOTOGRAPHY: none. See src/assets/medellin/index.ts for why — every
// image-hosting domain (Wikimedia Commons/Wikipedia media, Unsplash,
// Pexels, Pixabay, Flickr) was blocked by this session's egress policy, so
// no photo could be downloaded and verified. photoCredits is intentionally
// empty; heroPhoto/photos are empty strings/arrays, which the app's
// Photo/PhotoPlaceholder components already render as an on-brand
// placeholder rather than a broken image.
// ---------------------------------------------------------------------------

export const medellinNeighborhoods: Neighborhood[] = [
  {
    id: 'nb-el-poblado',
    name: 'El Poblado',
    city: 'Medellín',
    description:
      'Medellín\'s upscale, hilly tourism hub — Parque Lleras at its center, ringed by boutique hotels, coffee shops and the city\'s most talked-about restaurants.',
  },
  {
    id: 'nb-laureles',
    name: 'Laureles',
    city: 'Medellín',
    description:
      'A flat, leafy, walkable residential grid that Time Out named the coolest neighborhood in the world in 2023 — fewer tourists, lower prices, and the Atanasio Girardot sports complex at its edge.',
  },
  {
    id: 'nb-comuna-13',
    name: 'Comuna 13 (San Javier)',
    city: 'Medellín',
    description:
      'Once one of Medellín\'s most dangerous hillside barrios, now an open-air gallery of murals reached by a set of public outdoor escalators — the city\'s clearest symbol of its transformation.',
  },
  {
    id: 'nb-la-candelaria',
    name: 'La Candelaria (Centro)',
    city: 'Medellín',
    description:
      'Downtown Medellín — Plaza Botero, Museo de Antioquia and the historic Palacio de la Cultura sit within a few minutes\' walk of the Parque Berrío metro station.',
  },
  {
    id: 'nb-cerro-nutibara',
    name: 'Cerro Nutibara',
    city: 'Medellín',
    description:
      'One of the city\'s tutelary hills, 80 meters above the Aburrá Valley floor, topped by Pueblito Paisa — a reconstructed traditional Antioqueño village built with stone salvaged from the flooded town of El Peñol.',
  },
  {
    id: 'nb-santa-elena',
    name: 'Santa Elena',
    city: 'Medellín',
    description:
      'The rural highlands on Medellín\'s eastern edge, reached by riding the Metrocable gondola up and over Comuna 1 — home to the 16,000-hectare Parque Arví forest reserve.',
  },
  {
    id: 'nb-guatape',
    name: 'Guatapé',
    city: 'Medellín',
    description:
      'A separate lakeside town about two hours east of Medellín, famous for its brightly painted zócalo façades and the 200-meter granite monolith, El Peñón de Guatapé, that rises beside it — the region\'s classic day trip.',
  },
]

export const medellinPlaces: Place[] = [
  // --- La Candelaria / Centro -----------------------------------------------
  {
    id: 'pl-plaza-botero',
    name: 'Plaza Botero',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'La Candelaria (Centro)',
    category: 'landmark',
    description:
      'A downtown plaza filled with 23 of Fernando Botero\'s voluptuous bronze sculptures, donated by the artist himself — free, outdoors, and busy at almost any hour.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Free, outdoor Botero sculptures right in the heart of downtown — no ticket required.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['Colombia', 'art', 'free', 'plaza', 'Botero'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Botero+Medellin',
    website: 'https://www.medellin.travel/museum-of-antioquia/?lang=en',
    relatedGuideIds: ['gd-medellin-centro-comuna-13'],
    pairWithPlaceId: 'pl-museo-de-antioquia',
    sourceUrl: 'https://www.medellin.travel/museum-of-antioquia/?lang=en',
  },
  {
    id: 'pl-museo-de-antioquia',
    name: 'Museo de Antioquia',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'La Candelaria (Centro)',
    category: 'museum',
    address: 'Carrera 52 #52-43, La Candelaria, Medellín',
    description:
      'An Art Deco former municipal palace turned museum, holding the largest collection of Fernando Botero\'s work anywhere alongside indigenous Zenú goldwork and regional art — right on Plaza Botero.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The full Botero collection, plus goldwork and colonial-to-contemporary Colombian art, in one Art Deco building.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['Colombia', 'museum', 'Botero', 'art', 'history'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Museo+de+Antioquia+Medellin',
    website: 'https://www.medellin.travel/museum-of-antioquia/?lang=en',
    practicalNotes: 'Open Mon–Sat 10am–5:30pm, Sun/holidays 10am–4:30pm; about 18,000 COP for international visitors.',
    relatedGuideIds: ['gd-medellin-centro-comuna-13'],
    sourceUrl: 'https://www.medellin.travel/museum-of-antioquia/?lang=en',
  },

  // --- Comuna 13 -------------------------------------------------------------
  {
    id: 'pl-comuna-13',
    name: 'Comuna 13 Graffiti Tour',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'Comuna 13 (San Javier)',
    category: 'experience',
    description:
      'A hillside barrio once defined by gang violence and 2002\'s Operation Orion, now covered in murals about peace and resilience and threaded by public outdoor escalators — best seen with a local guide who lived the transformation.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The escalators, the murals and the hip-hop and breakdance performances that happen right on the tour route — Medellín\'s single most powerful stop.',
      orderOrDo: 'Go with a local guide rather than solo — the history and access to specific murals and artists is worth it.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['Colombia', 'street art', 'history', 'walking tour', 'transformation'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Comuna+13+San+Javier+Medellin',
    relatedGuideIds: ['gd-medellin-centro-comuna-13'],
    sourceUrl: 'https://aglobewelltravelled.com/2024/12/27/visiting-comuna-13-medellin-graffiti-tour/',
  },

  // --- El Poblado --------------------------------------------------------------
  {
    id: 'pl-parque-lleras',
    name: 'Parque Lleras',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'El Poblado',
    category: 'landmark',
    description:
      'The square at the center of El Poblado\'s tourist zone — cafés and shopping by day, and by night one of the city\'s busiest concentrations of bars and clubs.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['Colombia', 'nightlife', 'plaza', 'El Poblado'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Lleras+Medellin',
    website: 'https://www.medellin.travel/parque-lleras/?lang=en',
    relatedGuideIds: ['gd-medellin-poblado-laureles'],
    sourceUrl: 'https://www.medellin.travel/parque-lleras/?lang=en',
  },
  {
    id: 'pl-pergamino-cafe',
    name: 'Pergamino Café',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'El Poblado',
    category: 'cafe',
    description:
      'A well-known specialty-coffee roaster with a flagship café near Parque Lleras — one of the names most cited when people talk about Medellín\'s coffee scene, with pancakes, eggs and toast alongside the espresso menu.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['Colombia', 'coffee', 'breakfast', 'El Poblado'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pergamino+Cafe+Medellin',
    relatedGuideIds: ['gd-medellin-poblado-laureles'],
    sourceUrl: 'https://www.halfhalftravel.com/travel-guides/places-to-eat-and-drink-in-medellin.html',
  },
  {
    id: 'pl-carmen-medellin',
    name: 'Carmen',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'El Poblado',
    category: 'restaurant',
    description:
      'A contemporary Colombian restaurant from chef Carmen Angel that has repeatedly placed among Latin America\'s 50 best — refined, seasonal, and one of Medellín\'s defining tables.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'A serious tasting menu built on regional Colombian ingredients, from a kitchen with real international recognition.',
      spend: '$$$$',
    },
    priceLevel: '$$$$',
    tags: ['Colombia', 'fine dining', 'tasting menu', 'El Poblado'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Carmen+Restaurante+Medellin',
    relatedGuideIds: ['gd-medellin-poblado-laureles'],
    sourceUrl: 'https://www.halfhalftravel.com/travel-guides/places-to-eat-and-drink-in-medellin.html',
  },
  {
    id: 'pl-el-cielo-medellin',
    name: 'elciELO',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'El Poblado',
    category: 'restaurant',
    description:
      'Chef Juan Manuel Barrientos\'s original multisensory tasting-menu concept, near Parque Lleras — a theatrical, course-by-course experience that later expanded to Bogotá, Miami, DC and New York.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$$',
    tags: ['Colombia', 'fine dining', 'tasting menu', 'El Poblado'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=elcielo+Medellin',
    relatedGuideIds: ['gd-medellin-poblado-laureles'],
    sourceUrl: 'https://www.medellin.travel/parque-lleras/?lang=en',
  },

  // --- Laureles ----------------------------------------------------------------
  {
    id: 'pl-estadio-atanasio-girardot',
    name: 'Estadio Atanasio Girardot Sports Complex',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'Laureles',
    category: 'park',
    description:
      'The football stadium anchoring Laureles\' edge, part of a larger public sports complex with athletics facilities, tennis courts, a velodrome and an aquatic center — many of it free or low-cost.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['Colombia', 'sports', 'free', 'Laureles', 'football'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Estadio+Atanasio+Girardot+Medellin',
    relatedGuideIds: ['gd-medellin-poblado-laureles'],
    sourceUrl: 'https://medellinguru.com/guide-to-laureles/',
  },

  // --- Santa Elena / Metrocable / Parque Arví -----------------------------------
  {
    id: 'pl-metrocable',
    name: 'Metrocable',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'Santa Elena',
    category: 'experience',
    description:
      'A gondola-lift transit system built to connect steep hillside barrios the metro couldn\'t reach — Line K was the world\'s first cable car built for scheduled public transit, and Line L continues on into the forest at Parque Arví.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['Colombia', 'public transit', 'urban innovation', 'views'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Metrocable+Medellin',
    practicalNotes: 'Line L to Arví Station requires an extra fare (around 12,500 COP) on top of the standard metro fare.',
    relatedGuideIds: ['gd-medellin-centro-comuna-13'],
    pairWithPlaceId: 'pl-parque-arvi',
    sourceUrl: 'https://en.wikipedia.org/wiki/Metrocable_(Medell%C3%ADn)',
  },
  {
    id: 'pl-parque-arvi',
    name: 'Parque Arví',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'Santa Elena',
    category: 'park',
    description:
      'A 16,000-hectare protected forest reserve on the eastern rim of the Aburrá Valley, reached via Metrocable — more than 54 km of hiking trails, a local market, and pre-Hispanic paths dating back centuries.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['Colombia', 'hiking', 'nature', 'day trip'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Arvi+Medellin',
    practicalNotes: 'Open Tuesday–Sunday, 9am–6pm; closed Mondays for maintenance.',
    sourceUrl: 'https://medellinguru.com/parque-arvi/',
  },

  // --- Cerro Nutibara ------------------------------------------------------------
  {
    id: 'pl-pueblito-paisa',
    name: 'Pueblito Paisa',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'Cerro Nutibara',
    category: 'landmark',
    description:
      'A recreated traditional Antioqueño village atop Cerro Nutibara, built in 1978 from stone salvaged from El Peñol before it was flooded — a stone plaza, church, handicraft shops and sweeping views over the Aburrá Valley.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['Colombia', 'viewpoint', 'free', 'traditional architecture'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pueblito+Paisa+Cerro+Nutibara+Medellin',
    practicalNotes: 'Free admission, open daily 5:30am–10pm.',
    sourceUrl: 'https://www.medellin.travel/pueblito-paisa-cerro-nutibara/?lang=en',
  },

  // --- Guatapé (day trip) --------------------------------------------------------
  {
    id: 'pl-el-penon-guatape',
    name: 'El Peñón de Guatapé',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'Guatapé',
    category: 'landmark',
    description:
      'A 65-million-year-old granite monolith towering 200 meters over the El Peñol–Guatapé reservoir, climbed via a 700-plus-step staircase to a three-level viewing platform with a 360° view of the lake\'s fingered inlets.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The single best view in the region — the reservoir\'s green, island-studded inlets stretching out below the platform.',
      skipIf: 'You have serious knee or mobility issues — it\'s 700+ steps up, no elevator.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['Colombia', 'day trip', 'viewpoint', 'hiking'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=El+Penon+de+Guatape',
    relatedGuideIds: ['gd-medellin-guatape'],
    pairWithPlaceId: 'pl-guatape-town-zocalos',
    sourceUrl: 'https://en.wikipedia.org/wiki/El_Pe%C3%B1%C3%B3n_de_Guatap%C3%A9',
  },
  {
    id: 'pl-guatape-town-zocalos',
    name: 'Guatapé Town & Zócalos',
    country: 'Colombia',
    city: 'Medellín',
    neighborhood: 'Guatapé',
    category: 'landmark',
    description:
      'A lakeside town about two hours from Medellín, rebuilt after 1970s dam construction flooded the original site — famous for the colorful, sculpted zócalo façades that cover many of its buildings.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['Colombia', 'day trip', 'colorful town', 'photography'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Guatape+Colombia',
    relatedGuideIds: ['gd-medellin-guatape'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Guatap%C3%A9',
  },
]

export const medellinGuides: Guide[] = [
  {
    id: 'gd-medellin-centro-comuna-13',
    title: 'Downtown & Comuna 13: Medellín\'s Story in One Day',
    destinationId: 'medellin',
    section: 'experiences',
    dek: 'Botero\'s bronzes on Plaza Botero by morning, the Metrocable and the murals of Comuna 13 by afternoon.',
    body:
      'Start downtown at Plaza Botero, where 23 of Fernando Botero\'s bronze sculptures sit outdoors and free for the browsing, then step into the Museo de Antioquia next door — the Art Deco former municipal palace holding the world\'s largest Botero collection alongside indigenous Zenú goldwork. In the afternoon, head to Comuna 13: once one of the city\'s most dangerous barrios and the site of 2002\'s Operation Orion, it\'s now covered in murals about peace and resilience, threaded by a set of public outdoor escalators built to help residents up the hillside. Go with a local guide — the history, and the hip-hop and breakdance performances along the route, are worth it. For a scenic way to see how the city solved its hillside-transit problem more broadly, ride the Metrocable gondola.',
    placeIds: ['pl-plaza-botero', 'pl-museo-de-antioquia', 'pl-comuna-13', 'pl-metrocable'],
    sourceUrl: 'https://aglobewelltravelled.com/2024/12/27/visiting-comuna-13-medellin-graffiti-tour/',
  },
  {
    id: 'gd-medellin-poblado-laureles',
    title: 'El Poblado vs. Laureles: Where to Eat, Drink and Wander',
    destinationId: 'medellin',
    section: 'eat',
    dek: 'El Poblado brings the city\'s best tables and nightlife around Parque Lleras; Laureles — Time Out\'s "coolest neighborhood in the world" — brings the leafy, local, walkable counterpoint.',
    body:
      'El Poblado is Medellín\'s tourism center: Parque Lleras anchors a dense cluster of cafés by day and bars by night, and the neighborhood holds some of the city\'s most ambitious kitchens — Carmen, from chef Carmen Angel, has repeatedly placed among Latin America\'s 50 best restaurants, and elciELO, Juan Manuel Barrientos\'s theatrical multisensory tasting-menu concept, started right here before expanding abroad. For coffee, Pergamino near Parque Lleras is one of the names most associated with Medellín\'s specialty scene. A short ride away, Laureles is the quieter counterpoint — flat, tree-lined, primarily residential, and named the coolest neighborhood in the world by Time Out in 2023. Its lower prices and local feel make it worth the trip even just to walk the grid around the Atanasio Girardot sports complex, whose athletics tracks, tennis courts and aquatic center are largely free or low-cost to the public.',
    placeIds: ['pl-parque-lleras', 'pl-pergamino-cafe', 'pl-carmen-medellin', 'pl-el-cielo-medellin', 'pl-estadio-atanasio-girardot'],
    sourceUrl: 'https://medellinguru.com/guide-to-laureles/',
  },
  {
    id: 'gd-medellin-guatape',
    title: 'Guatapé & El Peñón: Medellín\'s Classic Day Trip',
    destinationId: 'medellin',
    section: 'experiences',
    dek: 'A colorful lakeside town, a 700-step granite monolith, and the best view in Antioquia.',
    body:
      'About two hours east of Medellín, Guatapé was rebuilt after 1970s dam construction flooded the original town and created the El Peñol–Guatapé reservoir. What survived — or was rebuilt — is a town covered in colorful, sculpted zócalo façades, each depicting local products, beliefs or family history. Just outside town, El Peñón de Guatapé is impossible to miss: a 65-million-year-old granite monolith rising 200 meters straight up, first climbed in 1954 and now fitted with a staircase of more than 700 steps to a three-level viewing platform. The reward at the top is the region\'s single best view — the reservoir\'s green, finger-shaped inlets stretching out in every direction.',
    placeIds: ['pl-el-penon-guatape', 'pl-guatape-town-zocalos'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Guatap%C3%A9',
  },
]

// A ready-made itinerary, assembled deterministically from the real Places
// above (not AI-generated) — same pattern as Cartagena.
export const medellinReadyMadeItinerary: Itinerary = {
  id: 'it-medellin-centro-poblado-guatape-3day',
  destinationId: 'medellin',
  title: '3 Days in Medellín: Centro, El Poblado & Guatapé',
  isReadyMade: true,
  days: [
    {
      day: 1,
      theme: 'Downtown & Comuna 13',
      activities: [
        { id: 'm1', time: '9:00', label: 'Plaza Botero', placeId: 'pl-plaza-botero' },
        { id: 'm2', time: '10:00', label: 'Museum morning', placeId: 'pl-museo-de-antioquia' },
        { id: 'm3', time: '12:30', label: 'Lunch', notes: 'Nothing pinned here — grab whatever looks good near Centro.' },
        { id: 'm4', time: '14:30', label: 'Comuna 13 graffiti tour', placeId: 'pl-comuna-13' },
        { id: 'm5', time: '18:00', label: 'Cerro Nutibara sunset', placeId: 'pl-pueblito-paisa' },
      ],
    },
    {
      day: 2,
      theme: 'El Poblado & Laureles',
      activities: [
        { id: 'm6', time: '9:00', label: 'Coffee', placeId: 'pl-pergamino-cafe' },
        { id: 'm7', time: '11:00', label: 'Walk the stadium complex', placeId: 'pl-estadio-atanasio-girardot' },
        { id: 'm8', time: '17:00', label: 'Evening in the park', placeId: 'pl-parque-lleras' },
        { id: 'm9', time: '19:30', label: 'Dinner', placeId: 'pl-carmen-medellin' },
      ],
    },
    {
      day: 3,
      theme: 'Guatapé Day Trip',
      activities: [
        { id: 'm10', time: '8:00', label: 'Depart for Guatapé', notes: 'About 2 hours from Medellín by car or tour bus.' },
        { id: 'm11', time: '10:30', label: 'Climb El Peñón', placeId: 'pl-el-penon-guatape' },
        { id: 'm12', time: '13:00', label: 'Lunch + zócalo walk', placeId: 'pl-guatape-town-zocalos' },
      ],
    },
  ],
}

export const medellinDestination: Destination = {
  id: 'medellin',
  slug: 'medellin',
  city: 'Medellín',
  country: 'Colombia',
  heroPhoto: '',
  tagline: 'The city of eternal spring, remade — murals, gondolas, and a granite monolith worth 700 steps.',
  status: 'live',
  content: {
    overview:
      'Medellín trades on transformation: a city once defined by violence now leads with public infrastructure built to close the gap between its wealthiest and poorest hillsides — outdoor escalators up Comuna 13, gondola lifts over Santo Domingo, a downtown plaza given over entirely to Botero\'s bronzes. El Poblado brings the polish (Parque Lleras, world-class tasting menus, specialty coffee); Laureles, named the coolest neighborhood in the world by Time Out, brings the quieter, local counterpoint. A short trip east, the lakeside town of Guatapé and its 700-step granite monolith round out the region\'s classic day trip.',
    whyGo:
      'For a city that turned its hardest history into its most compelling neighborhood, without pretending the history away — and for a spring-like climate that makes every plan, from a museum morning to a mountain day trip, feel easy.',
    bestTime: 'Medellín\'s year-round "eternal spring" climate (roughly 60–80°F) means there\'s no bad season — the driest, least-rainy stretches tend to fall in December–January and July–August.',
  },
  neighborhoods: medellinNeighborhoods,
  placeIds: medellinPlaces.map((p) => p.id),
  guideIds: medellinGuides.map((g) => g.id),
  itineraryIds: [medellinReadyMadeItinerary.id],
}
