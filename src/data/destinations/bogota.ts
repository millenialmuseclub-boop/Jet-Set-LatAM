import type { Destination, Neighborhood, Place, Guide, Itinerary } from '@/types'

// ---------------------------------------------------------------------------
// Bogotá — fourth Colombia destination
//
// PROVENANCE: thebrunchmanifesto.blog (jetsetlatam.com) has zero Bogotá-
// tagged posts (confirmed via its own WordPress REST API search — no
// results), so nothing below is adapted from Jordann's own writing. Every
// Neighborhood/Place/Guide fact is instead drawn from general web research —
// English Wikipedia, official/semi-official Bogotá tourism sources
// (visitbogota.co, colombia.travel), and established travel publications
// (Fodor's, Tripadvisor, Frommer's, landedtravel.com) — with each Place's
// sourceUrl pointing at the actual page used, not a fabricated blog post.
// No restaurant, address or fact below was invented; anything that could
// not be verified was left out rather than guessed at (e.g. a Chorro de
// Quevedo "chicha" price, or a graffiti-tour donation amount that one
// source garbled, were both omitted).
//
// PHOTOGRAPHY: none could be sourced this pass — this sandbox's network
// egress policy blocks every image host attempted (Wikimedia Commons
// included). See src/assets/bogota/index.ts for the full explanation and a
// TODO list of specific Commons files to verify and download once network
// access allows. Every Place/Neighborhood/Destination entry below uses the
// same honest empty-photo pattern already used for Buenos Aires and Oaxaca
// (heroPhoto: '', photos: []), which the shared <Photo> component renders
// as a seeded placeholder instead of a broken or mismatched image.
// ---------------------------------------------------------------------------

export const bogotaNeighborhoods: Neighborhood[] = [
  {
    id: 'nb-la-candelaria',
    name: 'La Candelaria',
    city: 'Bogotá',
    description:
      'The colonial historic core, all Spanish Colonial and Baroque façades around Plaza de Bolívar — Bogotá\'s densest cluster of museums (Botero, Gold Museum), government buildings and the bohemian, street-art-covered Chorro de Quevedo, where the city was founded in 1538.',
  },
  {
    id: 'nb-monserrate',
    name: 'Monserrate',
    city: 'Bogotá',
    description:
      'The 3,152-meter mountain sanctuary towering over downtown, reached by funicular, cable car or a steep pilgrimage trail — sacred to the Muisca long before Spanish colonization, and Bogotá\'s classic sweeping-city-view stop.',
  },
  {
    id: 'nb-chapinero',
    name: 'Chapinero (Zona G, Zona Rosa & Quinta Camacho)',
    city: 'Bogotá',
    description:
      'Bogotá\'s highest-GDP locality and its dining-and-nightlife center — Zona G\'s gourmet restaurant row, the Zona Rosa/Zona T shopping-and-clubbing strip, and the quieter, mid-century-modern streets of Quinta Camacho.',
  },
  {
    id: 'nb-usaquen',
    name: 'Usaquén',
    city: 'Bogotá',
    description:
      'A former colonial town absorbed into northern Bogotá, now known for brunch and its long-running weekend flea market — a bohemian, artisan-and-antiques counterpoint to the Candelaria\'s museums.',
  },
]

export const bogotaPlaces: Place[] = [
  // --- La Candelaria: landmarks, museums, culture -------------------------
  {
    id: 'pl-plaza-de-bolivar',
    name: 'Plaza de Bolívar',
    country: 'Colombia',
    city: 'Bogotá',
    neighborhood: 'La Candelaria',
    category: 'landmark',
    description:
      'Bogotá\'s central square, ringed by the Capitolio Nacional, the Primatial Cathedral and the Palace of Justice — the civic heart of the city and the natural starting point for exploring La Candelaria.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['plaza', 'history', 'free', 'Colombia'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+de+Bolivar+Bogota',
    relatedGuideIds: ['gd-bogota-candelaria'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Bogot%C3%A1',
  },
  {
    id: 'pl-chorro-de-quevedo',
    name: 'Chorro de Quevedo',
    country: 'Colombia',
    city: 'Bogotá',
    neighborhood: 'La Candelaria',
    category: 'landmark',
    description:
      'The plaza marking where conquistador Gonzalo Jiménez de Quesada founded Bogotá in 1538 — sacred Muisca ground before that, now a bohemian corner of street art, artist studios and chicha bars.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The exact spot Bogotá was founded, now wrapped in street art and a proper student-bohemian buzz rather than roped off behind glass.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['history', 'street art', 'free', 'Colombia'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Chorro+de+Quevedo+Bogota',
    relatedGuideIds: ['gd-bogota-candelaria'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Chorro_de_Quevedo',
  },
  {
    id: 'pl-museo-del-oro',
    name: 'Museo del Oro (Gold Museum)',
    country: 'Colombia',
    city: 'Bogotá',
    neighborhood: 'La Candelaria',
    category: 'museum',
    address: 'Carrera 6 # 15-88, La Candelaria, Bogotá',
    description:
      'The largest collection of pre-Columbian gold artifacts in the world — 55,000 pieces, 6,000 on display, including the Muisca golden raft that inspired the El Dorado legend.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The Muisca golden raft and the darkened, ceremonial final room — the single best museum in the city.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['museum', 'pre-Columbian', 'gold', 'Colombia'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Museo+del+Oro+Bogota',
    relatedGuideIds: ['gd-bogota-candelaria'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Gold_Museum,_Bogot%C3%A1',
  },
  {
    id: 'pl-museo-botero',
    name: 'Museo Botero',
    country: 'Colombia',
    city: 'Bogotá',
    neighborhood: 'La Candelaria',
    category: 'museum',
    address: 'Calle 11 # 4-41, La Candelaria, Bogotá',
    description:
      'A free museum of 208 works — 123 by Fernando Botero, the rest a personal collection he donated including Picasso, Monet, Dalí and Miró — inside a colonial-era house in the historic center.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Free entry to a genuinely major collection — Botero\'s signature volume alongside Picasso and Dalí, no ticket required.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['museum', 'art', 'free', 'Colombia'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Museo+Botero+Bogota',
    relatedGuideIds: ['gd-bogota-candelaria'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Museo_Botero',
  },
  {
    id: 'pl-cafe-san-alberto-oro',
    name: 'Café San Alberto (Museo del Oro)',
    country: 'Colombia',
    city: 'Bogotá',
    neighborhood: 'La Candelaria',
    category: 'cafe',
    address: 'Calle 16 # 6-21, inside the Gold Museum, La Candelaria, Bogotá',
    description:
      'An award-winning single-origin Colombian coffee counter tucked inside the Gold Museum itself — traditional and alternative brewing methods, an easy stop before or after the collection.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['coffee', 'café', 'Colombia'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cafe+San+Alberto+Museo+del+Oro+Bogota',
    pairWithPlaceId: 'pl-museo-del-oro',
    sourceUrl: 'https://www.tripadvisor.com/Restaurant_Review-g294074-d8015062-Reviews-Cafe_San_Alberto_Museo_Del_Oro-Bogota.html',
  },
  {
    id: 'pl-bogota-graffiti-tour',
    name: 'Bogotá Graffiti Tour',
    country: 'Colombia',
    city: 'Bogotá',
    neighborhood: 'La Candelaria',
    category: 'experience',
    description:
      'A pay-what-you-feel walking tour of La Candelaria\'s street art, founded in 2011 and guided by working street artists themselves — painters, gallery owners and event organizers who know the featured artists personally.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'A guide who is actually part of the scene, not a script — genuine context on Bogotá\'s murals rather than a highlight-reel walk-by.',
      orderOrDo: 'Meets at Parque de los Periodistas, near the Simón Bolívar statue, just downhill from the Las Aguas TransMilenio station. Two daily departures, roughly 2.5 hours.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['street art', 'walking tour', 'free tour', 'Colombia'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+de+los+Periodistas+Bogota',
    relatedGuideIds: ['gd-bogota-candelaria'],
    sourceUrl: 'https://bogotagraffiti.com/',
  },

  // --- Monserrate ------------------------------------------------------------
  {
    id: 'pl-monserrate',
    name: 'Santuario de Monserrate',
    country: 'Colombia',
    city: 'Bogotá',
    neighborhood: 'Monserrate',
    category: 'landmark',
    description:
      'A 17th-century church at 3,152 meters, housing the shrine of "El Señor Caído," reached by funicular, cable car, or a steep 2.4 km pilgrimage trail — sweeping views over all of downtown Bogotá, best at sunset.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The cable car up and sunset views over the whole city — restaurants and a chapel at the summit make it an easy half-day.',
      skipIf: 'You\'re not acclimatized to altitude — this adds another ~500m on top of Bogotá\'s already-high 2,640m.',
      orderOrDo: 'Take the funicular or cable car rather than the trail unless you specifically want the hike; it has a steep ~25% average grade.',
      spend: '$$',
    },
    priceLevel: '$$',
    tags: ['viewpoint', 'sunset', 'pilgrimage', 'Colombia'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Monserrate+Bogota',
    relatedGuideIds: ['gd-bogota-monserrate'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Monserrate',
  },

  // --- Chapinero: eat / drink / stay ---------------------------------------
  {
    id: 'pl-leo-cocina-y-cava',
    name: 'Leo Cocina y Cava',
    country: 'Colombia',
    city: 'Bogotá',
    neighborhood: 'Chapinero (Zona G, Zona Rosa & Quinta Camacho)',
    category: 'restaurant',
    address: 'Calle 65 Bis # 4-23, Chapinero, Bogotá',
    description:
      'Chef Leonor Espinosa\'s tasting-menu restaurant, built on traditional ingredients from Colombia\'s indigenous, Afro-descendant and peasant communities across all eight of the country\'s regions — internationally recognized since it opened in 2007.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'A tasting menu that treats overlooked Colombian regional ingredients as the whole point, not a garnish.',
      orderOrDo: 'Reservations required well in advance.',
      spend: '$$$$',
    },
    priceLevel: '$$$$',
    tags: ['fine dining', 'tasting menu', 'Colombian cuisine', 'reservations required', 'Colombia'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Leo+Cocina+y+Cava+Bogota',
    relatedGuideIds: ['gd-bogota-chapinero'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Leonor_Espinosa',
  },
  {
    id: 'pl-andres-dc',
    name: 'Andrés D.C.',
    country: 'Colombia',
    city: 'Bogotá',
    neighborhood: 'Chapinero (Zona G, Zona Rosa & Quinta Camacho)',
    category: 'restaurant',
    address: 'Calle 82 # 12-21, Zona Rosa, Bogotá',
    description:
      'A three-floor "restaurant, bar, dancing house" in the Zona Rosa — hell, purgatory and paradise decorated across its levels, an extensive Colombian menu of grilled meats and arepas, live Latin music and dancing into the night.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$',
    tags: ['Colombian cuisine', 'live music', 'nightlife', 'dancing', 'Colombia'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Andres+DC+Zona+Rosa+Bogota',
    relatedGuideIds: ['gd-bogota-chapinero'],
    sourceUrl: 'https://www.tripadvisor.com/Restaurant_Review-g294074-d1889853-Reviews-Andres_Carne_de_Res_DC-Bogota.html',
  },
  {
    id: 'pl-casa-legado',
    name: 'Casa Legado',
    country: 'Colombia',
    city: 'Bogotá',
    neighborhood: 'Chapinero (Zona G, Zona Rosa & Quinta Camacho)',
    category: 'hotel',
    description:
      'A family-run, 13-room boutique hotel in the mid-century-modern Quinta Camacho district — each room named for and designed around one of owner Helena Dávila\'s relatives, with cooking classes and coffee-farm visits on offer.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'A genuinely personal, family-run alternative to the big international hotel brands, in a quiet, walkable residential pocket.',
      spend: '$$$',
    },
    priceLevel: '$$$',
    tags: ['boutique hotel', 'Quinta Camacho', 'family-run', 'Colombia'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+Legado+Bogota',
    sourceUrl: 'https://landedtravel.com/casa-legado/',
  },

  // --- Usaquén ---------------------------------------------------------------
  {
    id: 'pl-usaquen-flea-market',
    name: 'Mercado de las Pulgas de Usaquén',
    country: 'Colombia',
    city: 'Bogotá',
    neighborhood: 'Usaquén',
    category: 'shop',
    address: 'Calle 119 con Carrera 6a, Usaquén, Bogotá',
    description:
      'A weekend flea market founded in 1990 — handicrafts, antique furniture, vintage clothing and handmade jewelry from vendors across Colombia, plus live music and a food scene, in Usaquén\'s bohemian, artist-filled streets.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'A genuinely local weekend ritual — browse the stalls, then brunch in Usaquén afterward.',
      orderOrDo: 'Saturdays, Sundays and holidays, 9:00am–5:30pm; free admission.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['market', 'antiques', 'crafts', 'weekend', 'Colombia'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+de+las+Pulgas+de+Usaquen+Bogota',
    relatedGuideIds: ['gd-bogota-usaquen'],
    sourceUrl: 'https://visitbogota.co/en/what-to-do-in-bogota/shopping/usaquen-flea-market',
  },
]

export const bogotaGuides: Guide[] = [
  {
    id: 'gd-bogota-candelaria',
    title: 'La Candelaria: History, Museums and Street Art',
    destinationId: 'bogota',
    section: 'see',
    dek: 'Bogotá\'s founding plaza, its two best museums, and a graffiti tour led by the artists themselves.',
    body:
      'Start at Plaza de Bolívar, ringed by the Capitolio Nacional and the Primatial Cathedral, then walk a few minutes to the Museo Botero — free entry to 123 Boteros plus his own donated Picassos, Monets and Dalís. Just across the way, the Museo del Oro holds the largest gold collection on earth, 6,000 pieces on display including the Muisca golden raft that inspired the El Dorado legend; grab a coffee at Café San Alberto, tucked inside the museum itself. In the afternoon, head up to Chorro de Quevedo, the exact plaza where Bogotá was founded in 1538 and now a bohemian corner of street art and chicha bars — the natural meeting point for the pay-what-you-feel Bogotá Graffiti Tour, led by working street artists who know the featured painters personally.',
    placeIds: [
      'pl-plaza-de-bolivar', 'pl-museo-botero', 'pl-museo-del-oro', 'pl-cafe-san-alberto-oro',
      'pl-chorro-de-quevedo', 'pl-bogota-graffiti-tour',
    ],
    sourceUrl: 'https://en.wikipedia.org/wiki/La_Candelaria,_Bogot%C3%A1',
  },
  {
    id: 'gd-bogota-monserrate',
    title: 'Monserrate: Bogotá\'s Sacred Summit',
    destinationId: 'bogota',
    section: 'experiences',
    dek: 'A 3,152-meter sanctuary, a funicular or cable car ride, and the city\'s best sunset view.',
    body:
      'Monserrate has drawn visitors to its summit long before the Spanish arrived — sacred ground for the Muisca, now home to a 17th-century church and the shrine of "El Señor Caído." Take the funicular or cable car up (the hiking trail is a legitimate option too, but steep, at roughly 25% average grade over 2.4 km) and time the trip for late afternoon: the view stretches over all of downtown Bogotá, and it\'s the city\'s classic sunset spot. Restaurants and cafeterias at the top make it easy to linger.',
    placeIds: ['pl-monserrate'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Monserrate',
  },
  {
    id: 'gd-bogota-chapinero',
    title: 'Chapinero After Dark: Zona G to Zona Rosa',
    destinationId: 'bogota',
    section: 'eat',
    dek: 'Colombia\'s most decorated tasting menu, a three-floor dance-hall institution, and a boutique hotel run by one family.',
    body:
      'Chapinero is Bogotá\'s dining-and-nightlife center, loosely split into a few named zones. In Zona G, Leo Cocina y Cava is chef Leonor Espinosa\'s internationally recognized tasting-menu restaurant, built entirely on traditional ingredients sourced from indigenous, Afro-descendant and peasant communities across Colombia\'s eight regions — reservations required well ahead. In the Zona Rosa, Andrés D.C. is a three-floor "restaurant, bar, dancing house," each level differently themed, with live Latin music and dancing that runs late. For a place to stay in between, Casa Legado in the quieter, mid-century-modern Quinta Camacho streets is a 13-room, family-run boutique hotel where every room is named for one of the owner\'s relatives.',
    placeIds: ['pl-leo-cocina-y-cava', 'pl-andres-dc', 'pl-casa-legado'],
    sourceUrl: 'https://en.wikivoyage.org/wiki/Bogot%C3%A1/Chapinero-Zona_G',
  },
  {
    id: 'gd-bogota-usaquen',
    title: 'Usaquén\'s Weekend Flea Market',
    destinationId: 'bogota',
    section: 'shop',
    dek: 'Antiques, handmade jewelry and a bohemian street scene in Bogotá\'s old colonial north.',
    body:
      'Usaquén was its own colonial town before Bogotá\'s sprawl absorbed it, and it still feels like a village within the city — narrow streets, a central plaza, and a long-running weekend flea market founded in 1990. Vendors from across Colombia sell handicrafts, antique furniture, vintage clothing and handmade jewelry, with live music and food stalls threaded through the stalls. It runs Saturdays, Sundays and holidays, 9:00am–5:30pm, free to enter — budget an hour or two, and pair it with brunch somewhere in the surrounding streets afterward.',
    placeIds: ['pl-usaquen-flea-market'],
    sourceUrl: 'https://visitbogota.co/en/what-to-do-in-bogota/shopping/usaquen-flea-market',
  },
]

// A ready-made itinerary, assembled deterministically from the real Places
// above (not AI-generated) — same pattern as Cartagena and Mexico City.
export const bogotaReadyMadeItinerary: Itinerary = {
  id: 'it-bogota-candelaria-monserrate-north-3day',
  destinationId: 'bogota',
  title: '3 Days in Bogotá: Candelaria, Monserrate & the North',
  isReadyMade: true,
  days: [
    {
      day: 1,
      theme: 'La Candelaria: History + Street Art',
      activities: [
        { id: 'b1', time: '9:00', label: 'Plaza de Bolívar', placeId: 'pl-plaza-de-bolivar' },
        { id: 'b2', time: '10:00', label: 'Museo Botero', placeId: 'pl-museo-botero' },
        { id: 'b3', time: '11:30', label: 'Coffee + Museo del Oro', placeId: 'pl-cafe-san-alberto-oro' },
        { id: 'b4', time: '12:00', label: 'Gold Museum', placeId: 'pl-museo-del-oro' },
        { id: 'b5', time: '13:30', label: 'Lunch', notes: 'Nothing pinned here — grab whatever looks good nearby.' },
        { id: 'b6', time: '15:00', label: 'Graffiti tour', placeId: 'pl-bogota-graffiti-tour' },
        { id: 'b7', time: '17:30', label: 'Chorro de Quevedo', placeId: 'pl-chorro-de-quevedo' },
      ],
    },
    {
      day: 2,
      theme: 'Monserrate + Chapinero Evening',
      activities: [
        { id: 'b8', time: '10:00', label: 'Cable car up', placeId: 'pl-monserrate' },
        { id: 'b9', time: '13:00', label: 'Lunch', notes: 'Nothing pinned here — grab whatever looks good nearby, several options at the summit.' },
        { id: 'b10', time: '20:00', label: 'Dinner', placeId: 'pl-leo-cocina-y-cava' },
      ],
    },
    {
      day: 3,
      theme: 'Usaquén + Zona Rosa',
      activities: [
        { id: 'b11', time: '10:00', label: 'Flea market', placeId: 'pl-usaquen-flea-market' },
        { id: 'b12', time: '13:00', label: 'Brunch', notes: 'Nothing pinned here — grab whatever looks good nearby in Usaquén.' },
        { id: 'b13', time: '21:00', label: 'Dinner + dancing', placeId: 'pl-andres-dc' },
      ],
    },
  ],
}

export const bogotaDestination: Destination = {
  id: 'bogota',
  slug: 'bogota',
  city: 'Bogotá',
  country: 'Colombia',
  heroPhoto: '',
  tagline: 'A gold museum without equal, a mountaintop sanctuary, and Colombia\'s most ambitious tasting menus.',
  status: 'live',
  content: {
    overview:
      'Bogotá sits at 2,640 meters — the third-highest capital in the world — and packs a genuinely varied city into that altitude: La Candelaria\'s colonial core holds the world\'s largest gold collection and a free Botero museum a few blocks apart, the 3,152-meter Monserrate sanctuary looks down over all of it, Chapinero\'s Zona G and Zona Rosa carry the country\'s most ambitious kitchens and its liveliest dance halls, and Usaquén\'s old colonial streets host a weekend flea market that\'s been running since 1990.',
    whyGo:
      'For a capital that rewards a full day of museum-going (two world-class ones, a few blocks apart, one of them free) as much as a night out in Zona Rosa — with a cable car up to a literal mountaintop in between.',
    bestTime: 'December, January, July and August are Bogotá\'s driest months. April, May, September, October and November bring more rain. Days sit around 14–20°C year-round given the altitude — pack layers regardless of season.',
  },
  neighborhoods: bogotaNeighborhoods,
  placeIds: bogotaPlaces.map((p) => p.id),
  guideIds: bogotaGuides.map((g) => g.id),
  itineraryIds: [bogotaReadyMadeItinerary.id],
  photoCredits: [],
}
