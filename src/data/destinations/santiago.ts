import type { Destination, Neighborhood, Place, Guide, Itinerary } from '@/types'

// ---------------------------------------------------------------------------
// Santiago, Chile — new destination (Santiago build pass)
//
// PROVENANCE: this pass tried thebrunchmanifesto.blog (Jordann's own blog)
// first, as instructed — both its WordPress REST API (wp-json/wp/v2/posts,
// tag/search endpoints) and its on-site search/tag pages. This session's
// egress proxy returned a hard "connect_rejected / policy denial" for every
// direct request to thebrunchmanifesto.blog, and the sandboxed WebFetch tool
// could not reach the WP REST API paths either (provenance/domain
// restrictions). WebSearch (a separate channel) surfaced the blog's
// homepage, its "Destinations" category archive and several recent posts —
// none about Santiago or Chile. No thebrunchmanifesto.blog Santiago article
// could be found or confirmed to exist this pass.
//
// Every Place/Neighborhood/Guide fact below is instead sourced from
// verifiable general reference material — English Wikipedia, the official
// city tourism board (santiagoturismo.cl) and Chile's national tourism board
// (chile.travel), plus each place's own or a reputable travel-press page —
// with each Place's `sourceUrl` pointing at the specific page the fact came
// from. No restaurant, address or fact below is invented; anything that
// could not be verified (e.g. specific opening hours, exact prices) was left
// out rather than guessed at. See src/assets/santiago/index.ts for why there
// is no photography this pass — the same network blocker documented there
// for Oaxaca and Buenos Aires.
// ---------------------------------------------------------------------------

export const santiagoNeighborhoods: Neighborhood[] = [
  {
    id: 'nb-santiago-centro',
    name: 'Centro',
    city: 'Santiago',
    description:
      'The colonial core, laid out in a checkerboard grid by Pedro de Gamboa in 1541 — the Plaza de Armas, the Metropolitan Cathedral and the cast-iron Mercado Central all sit within a few minutes\' walk of each other.',
  },
  {
    id: 'nb-barrio-lastarria',
    name: 'Barrio Lastarria',
    city: 'Santiago',
    description:
      'A restored 19th-century quarter around Cerro Santa Lucía and Parque Forestal — cinemas, theaters, museums, independent design shops and Santiago\'s densest cluster of restaurants and wine bars, officially protected as a Zona Típica since 1997.',
  },
  {
    id: 'nb-barrio-bellavista',
    name: 'Barrio Bellavista',
    city: 'Santiago',
    description:
      'A bohemian, artist-heavy neighborhood at the foot of Cerro San Cristóbal, best known as the site of Pablo Neruda\'s Santiago home, La Chascona.',
  },
  {
    id: 'nb-providencia',
    name: 'Providencia',
    city: 'Santiago',
    description:
      'An affluent, tree-lined commune northeast of Centro, blending grand old mansions-turned-offices with a high-rise financial district — one of the highest human-development-index areas in Latin America.',
  },
  {
    id: 'nb-las-condes',
    name: 'Las Condes',
    city: 'Santiago',
    description:
      'A modern, upscale district further east — home to the "Sanhattan" business towers and, at the end of Avenida Apoquindo, the colonial-adobe craft stalls of Pueblito Los Dominicos.',
  },
  {
    id: 'nb-casablanca-valley',
    name: 'Casablanca Valley (Day Trip)',
    city: 'Santiago',
    description:
      'A cool-climate wine valley about 80 km from Santiago via Route 68, roughly an hour\'s drive toward the coast — known for its whites, and a standard half- or full-day trip out of the city.',
  },
]

export const santiagoPlaces: Place[] = [
  // --- Centro: landmarks & market ------------------------------------------
  {
    id: 'pl-plaza-de-armas',
    name: 'Plaza de Armas',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Centro',
    category: 'landmark',
    description:
      'Santiago\'s founding square, laid out in 1541 atop an earlier Inca settlement — ringed by the Metropolitan Cathedral, the old Royal Audiencia palace (now the National History Museum) and the central post office, and still the city\'s civic heart.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['plaza', 'free', 'colonial', 'national monument'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+de+Armas+Santiago+Chile',
    sourceUrl: 'https://en.wikipedia.org/wiki/Plaza_de_Armas_(Santiago)',
  },
  {
    id: 'pl-santiago-cathedral',
    name: 'Santiago Metropolitan Cathedral',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Centro',
    category: 'landmark',
    address: 'Plaza de Armas, Santiago',
    description:
      'The seat of the Archdiocese of Santiago, built 1748–1906 and shaped over two decades by Italian architect Joaquín Toesca — a neoclassical facade with twin bell towers, facing directly onto the Plaza de Armas.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['cathedral', 'neoclassical', 'free', 'plaza de armas'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Catedral+Metropolitana+de+Santiago+Chile',
    sourceUrl: 'https://en.wikipedia.org/wiki/Santiago_Metropolitan_Cathedral',
  },
  {
    id: 'pl-mercado-central-santiago',
    name: 'Mercado Central de Santiago',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Centro',
    category: 'landmark',
    description:
      'A cast-iron market hall opened in 1872, its structure fabricated in Glasgow and shipped to Chile — a central pyramidal, domed roof over Santiago\'s classic seafood-market experience, ringed by fish stalls and sit-down restaurants.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['market', 'seafood', 'cast-iron architecture', 'historic'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+Central+de+Santiago+Chile',
    relatedGuideIds: ['gd-santiago-centro'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Mercado_Central_de_Santiago',
  },
  {
    id: 'pl-donde-augusto',
    name: 'Donde Augusto',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Centro',
    category: 'restaurant',
    address: 'San Pablo 967, Mercado Central, Santiago',
    description:
      'A long-running seafood restaurant inside the Mercado Central, known for locos, erizos, langosta and centolla alongside grilled meats — one of the market\'s best-known sit-down spots.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Fresh Chilean shellfish — locos, erizos and centolla — eaten right inside the historic market hall.',
      spend: '$$',
    },
    priceLevel: '$$',
    tags: ['seafood', 'mercado central', 'traditional'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Donde+Augusto+Mercado+Central+Santiago',
    relatedGuideIds: ['gd-santiago-centro'],
    sourceUrl: 'https://www.santiagoturismo.cl/restaurant-donde-augusto/',
  },

  // --- Barrio Bellavista + Cerro San Cristóbal ------------------------------
  {
    id: 'pl-cerro-san-cristobal',
    name: 'Cerro San Cristóbal',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Barrio Bellavista',
    category: 'landmark',
    description:
      'Santiago\'s third-highest hill at 880 m, reached by the historic Funicular de Santiago, a cable car, or a 45-minute hike — its summit sanctuary holds a 22-meter statue of the Virgin Mary, blessed by Pope John Paul II in 1987, with sweeping views over the city and the Andes.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The funicular ride up and the view from the Virgin statue — the single best panorama of Santiago against the Andes.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['hill', 'viewpoint', 'funicular', 'landmark'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cerro+San+Cristobal+Santiago+Chile',
    relatedGuideIds: ['gd-santiago-bellavista'],
    sourceUrl: 'https://en.wikipedia.org/wiki/San_Crist%C3%B3bal_Hill',
  },
  {
    id: 'pl-parque-metropolitano',
    name: 'Parque Metropolitano de Santiago',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Barrio Bellavista',
    category: 'park',
    description:
      'Santiago\'s largest public park, covering Cerro San Cristóbal and its lower slopes — two municipal pools (Tupahue and Antilén), a Japanese-style garden and the Chilean National Zoo, all reachable from the same funicular/cable-car access point.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['park', 'zoo', 'garden', 'family'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Metropolitano+de+Santiago+Chile',
    relatedGuideIds: ['gd-santiago-bellavista'],
    sourceUrl: 'https://en.wikipedia.org/wiki/San_Crist%C3%B3bal_Hill',
  },
  {
    id: 'pl-la-chascona',
    name: 'La Chascona (Casa Museo Pablo Neruda)',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Barrio Bellavista',
    category: 'museum',
    description:
      'One of poet Pablo Neruda\'s three homes, built from 1953 for Matilde Urrutia — a deliberately idiosyncratic house full of his personal collections, including a 1955 Diego Rivera portrait of Urrutia with Neruda\'s profile hidden in her hair.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Neruda\'s eccentric personal taste on full display — a more intimate stop than the larger Isla Negra house.',
      spend: '$$',
    },
    priceLevel: '$$',
    tags: ['museum', 'neruda', 'literary'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=La+Chascona+Bellavista+Santiago+Chile',
    website: 'https://fundacionneruda.org/en/la-chascona-museum-house/',
    relatedGuideIds: ['gd-santiago-bellavista'],
    sourceUrl: 'https://en.wikipedia.org/wiki/La_Chascona',
  },

  // --- Barrio Lastarria: eat, drink, stay, culture --------------------------
  {
    id: 'pl-bocanariz',
    name: 'Bocanáriz',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Barrio Lastarria',
    category: 'restaurant',
    address: 'José Victorino Lastarria 276, Santiago',
    description:
      'A wine bar and restaurant in Lastarria pouring over 250 Chilean wines, with a contemporary menu built to pair with the list — dishes include a fish tiradito with green apple and a beef-tongue bao.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The deepest by-the-glass Chilean wine list in the city, matched with a genuinely wine-driven menu.',
      spend: '$$$',
    },
    priceLevel: '$$$',
    tags: ['wine bar', 'chilean wine', 'lastarria'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bocanariz+Lastarria+Santiago+Chile',
    relatedGuideIds: ['gd-santiago-lastarria'],
    sourceUrl: 'https://www.tripadvisor.com/Restaurant_Review-g294305-d3192360-Reviews-Bocanariz-Santiago_Santiago_Metropolitan_Region.html',
  },
  {
    id: 'pl-the-singular-santiago',
    name: 'The Singular Santiago',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Barrio Lastarria',
    category: 'hotel',
    description:
      'A neoclassic luxury hotel in Lastarria — "Santiago\'s cultural and historical hub" — with a French-technique, Chilean-ingredient restaurant program and a rooftop bar looking toward Cerro San Cristóbal.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$$',
    tags: ['luxury hotel', 'lastarria', 'rooftop bar'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+Singular+Santiago+Lastarria',
    website: 'https://www.thesingular.com/santiago',
    relatedGuideIds: ['gd-santiago-lastarria'],
    sourceUrl: 'https://www.thesingular.com/santiago',
  },
  {
    id: 'pl-gam-centro-cultural',
    name: 'Centro Cultural Gabriela Mistral (GAM)',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Barrio Lastarria',
    category: 'museum',
    description:
      'A contemporary arts center opened in 2010 between the Alameda and Barrio Lastarria — galleries, theaters and public programming in a building that anchors the neighborhood\'s cultural circuit.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['cultural center', 'contemporary art', 'theater'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=GAM+Centro+Cultural+Gabriela+Mistral+Santiago',
    website: 'https://gam.cl/es/',
    relatedGuideIds: ['gd-santiago-lastarria'],
    sourceUrl: 'https://www.santiagoturismo.cl/en/centro-cultural-gabriela-mistral-gam-2/',
  },

  // --- Las Condes: shopping ---------------------------------------------
  {
    id: 'pl-pueblito-los-dominicos',
    name: 'Centro Artesanal Pueblito Los Dominicos',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Las Condes',
    category: 'shop',
    address: 'End of Avenida Apoquindo, Las Condes, Santiago',
    description:
      'Nearly 200 adobe stalls on a former agricultural estate next to the San Vicente Ferrer church — leather, wool, woodwork, copper, jewelry and traditional Chilean food, Santiago\'s best-known artisan crafts market.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['crafts market', 'souvenirs', 'artisan'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pueblito+Los+Dominicos+Santiago+Chile',
    sourceUrl: 'https://en.wikipedia.org/wiki/Los_Dominicos_Village',
  },

  // --- Casablanca Valley: wine day trip -------------------------------------
  {
    id: 'pl-casablanca-valley-wine-day',
    name: 'Casablanca Valley Wine Day Trip',
    country: 'Chile',
    city: 'Santiago',
    neighborhood: 'Casablanca Valley (Day Trip)',
    category: 'experience',
    description:
      'An easy day trip via Route 68, about 80 km and under an hour from Santiago — a cool-climate valley known for its whites, with cellar/barrel tours, tastings and a vineyard lunch built to pair with the wine.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Chile\'s best cool-climate whites, a short drive from the city — book the vineyard lunch ahead, especially on weekends.',
      skipIf: 'You have limited time in Santiago and haven\'t seen the Centro/Lastarria core yet — save this for a second full day.',
      spend: '$$$',
    },
    priceLevel: '$$$',
    tags: ['wine', 'day trip', 'casablanca valley'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Casablanca+Valley+Chile',
    relatedGuideIds: ['gd-santiago-casablanca'],
    sourceUrl: 'https://chile.travel/en/itineraries/wines-and-nature-in-the-casablanca-valley/',
  },
]

export const santiagoGuides: Guide[] = [
  {
    id: 'gd-santiago-centro',
    title: 'Santiago\'s Colonial Core: Plaza de Armas to the Mercado Central',
    destinationId: 'santiago',
    section: 'see',
    dek: 'The 1541 founding square, its neoclassical cathedral, and a cast-iron seafood market shipped from Glasgow in 1872.',
    body:
      'Start at the Plaza de Armas, laid out the year Santiago was founded and still ringed by the buildings that matter most: the Metropolitan Cathedral, shaped over two decades by Italian architect Joaquín Toesca, and the old Royal Audiencia palace, now the National History Museum. From there it\'s a short walk to the Mercado Central, whose cast-iron roof was fabricated in Glasgow and shipped to Chile for the market\'s 1872 opening. Have lunch inside at Donde Augusto, a long-running seafood spot known for locos, erizos and centolla — the classic way to eat in the market hall.',
    placeIds: ['pl-plaza-de-armas', 'pl-santiago-cathedral', 'pl-mercado-central-santiago', 'pl-donde-augusto'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Plaza_de_Armas_(Santiago)',
  },
  {
    id: 'gd-santiago-bellavista',
    title: 'Cerro San Cristóbal & Barrio Bellavista',
    destinationId: 'santiago',
    section: 'see',
    dek: 'A funicular ride to a 22-meter Virgin Mary statue, Santiago\'s largest park, and Pablo Neruda\'s idiosyncratic Bellavista home.',
    body:
      'Take the historic Funicular de Santiago up Cerro San Cristóbal, the city\'s third-highest hill, to the summit sanctuary and its 22-meter statue of the Virgin Mary, blessed by Pope John Paul II in 1987 — the view over Santiago and the Andes is the city\'s best. The hill sits inside the Parque Metropolitano de Santiago, which also holds two municipal pools, a Japanese-style garden and the Chilean National Zoo. Back down at the base, spend the afternoon in Barrio Bellavista at La Chascona, the deliberately eccentric house Pablo Neruda built from 1953 for Matilde Urrutia — look for the 1955 Diego Rivera portrait with Neruda\'s profile hidden in her hair.',
    placeIds: ['pl-cerro-san-cristobal', 'pl-parque-metropolitano', 'pl-la-chascona'],
    sourceUrl: 'https://en.wikipedia.org/wiki/San_Crist%C3%B3bal_Hill',
  },
  {
    id: 'gd-santiago-lastarria',
    title: 'A Day in Barrio Lastarria',
    destinationId: 'santiago',
    section: 'eat',
    dek: 'Santiago\'s bohemian, restaurant-dense quarter — a contemporary arts center, a 250-bottle Chilean wine list, and the city\'s design-forward luxury hotel.',
    body:
      'Barrio Lastarria was restored through the 1990s while keeping its "bohemian and intellectual flavor," and was designated an official Zona Típica in 1997. Spend a late morning at the Centro Cultural Gabriela Mistral (GAM), the contemporary arts center anchoring the neighborhood between the Alameda and Lastarria\'s streets. For dinner, Bocanáriz pours more than 250 Chilean wines alongside a menu built to match them — reserve ahead. The Singular Santiago, a neoclassic luxury hotel with a rooftop bar facing Cerro San Cristóbal, makes a strong base for the whole trip.',
    placeIds: ['pl-gam-centro-cultural', 'pl-bocanariz', 'pl-the-singular-santiago'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Barrio_Lastarria',
  },
  {
    id: 'gd-santiago-casablanca',
    title: 'Chile Wine Country: A Day Trip to Casablanca Valley',
    destinationId: 'santiago',
    section: 'experiences',
    dek: 'Under an hour from Santiago by car — cool-climate whites, a cellar tour and a vineyard lunch built to pair with the wine.',
    body:
      'The Casablanca Valley sits about 80 km from Santiago via Route 68, less than an hour toward the coast, and is the standard wine day trip out of the city — closer than the Colchagua or Maipo valleys for a single half-to-full-day outing. A typical day includes a guided cellar and barrel-room tour, a tasting of the valley\'s signature cool-climate whites, and lunch at the vineyard\'s restaurant, with dishes designed around the wine list. Book the lunch and tour ahead, especially on weekends — and note that Chilean law prohibits driving after drinking, so a driver or organized tour is worth arranging.',
    placeIds: ['pl-casablanca-valley-wine-day'],
    sourceUrl: 'https://chile.travel/en/itineraries/wines-and-nature-in-the-casablanca-valley/',
  },
]

// A ready-made itinerary, assembled deterministically from the real Places
// above (not AI-generated) — same pattern as Cartagena/Mexico City/Rio.
export const santiagoReadyMadeItinerary: Itinerary = {
  id: 'it-santiago-centro-bellavista-casablanca-3day',
  destinationId: 'santiago',
  title: '3 Days in Santiago: Centro, Bellavista & Wine Country',
  isReadyMade: true,
  days: [
    {
      day: 1,
      theme: 'Centro: Plaza de Armas & Mercado Central',
      activities: [
        { id: 's1', time: '9:00', label: 'Plaza de Armas', placeId: 'pl-plaza-de-armas' },
        { id: 's2', time: '9:30', label: 'Metropolitan Cathedral', placeId: 'pl-santiago-cathedral' },
        { id: 's3', time: '12:30', label: 'Lunch at the Mercado Central', placeId: 'pl-donde-augusto' },
        { id: 's4', time: '16:00', label: 'GAM cultural center', placeId: 'pl-gam-centro-cultural' },
        { id: 's5', time: '19:30', label: 'Dinner', placeId: 'pl-bocanariz' },
      ],
    },
    {
      day: 2,
      theme: 'Bellavista & Cerro San Cristóbal',
      activities: [
        { id: 's6', time: '9:00', label: 'Funicular up Cerro San Cristóbal', placeId: 'pl-cerro-san-cristobal' },
        { id: 's7', time: '11:00', label: 'Parque Metropolitano', placeId: 'pl-parque-metropolitano' },
        { id: 's8', time: '13:00', label: 'Lunch', notes: 'Nothing pinned here — grab whatever looks good nearby.' },
        { id: 's9', time: '15:00', label: 'La Chascona', placeId: 'pl-la-chascona' },
        { id: 's10', time: '18:00', label: 'Shopping', placeId: 'pl-pueblito-los-dominicos' },
      ],
    },
    {
      day: 3,
      theme: 'Casablanca Valley Wine Day',
      activities: [
        { id: 's11', time: '9:00', label: 'Depart for Casablanca Valley', placeId: 'pl-casablanca-valley-wine-day' },
        { id: 's12', time: '13:00', label: 'Vineyard lunch + tasting', placeId: 'pl-casablanca-valley-wine-day' },
      ],
    },
  ],
}

export const santiagoDestination: Destination = {
  id: 'santiago',
  slug: 'santiago',
  city: 'Santiago',
  country: 'Chile',
  heroPhoto: '',
  tagline: 'A colonial core, a hilltop view of the Andes, and an hour to Chile\'s best cool-climate wines.',
  status: 'live',
  content: {
    overview:
      'Santiago\'s compact Centro holds the 1541 founding square, a neoclassical cathedral and a cast-iron seafood market shipped from Scotland — all within a few minutes\' walk. A funicular climbs Cerro San Cristóbal for the city\'s best Andes panorama, bohemian Barrio Lastarria and Bellavista bring the densest restaurant and museum cluster, and an hour outside the city, the Casablanca Valley pours some of Chile\'s best cool-climate whites.',
    whyGo:
      'A capital that pairs real colonial and modern-art density in a walkable core with genuine mountain scenery — few cities let you go from a 19th-century cathedral to a hilltop Andes view to a working wine valley within a single day trip.',
    bestTime: 'September–November (spring) and March–May (fall) are mildest. December–February is hot and dry but the height of the wine-country season; June–August is cool, wetter and quieter, with occasional Andes snow visible from the city.',
  },
  neighborhoods: santiagoNeighborhoods,
  placeIds: santiagoPlaces.map((p) => p.id),
  guideIds: santiagoGuides.map((g) => g.id),
  itineraryIds: [santiagoReadyMadeItinerary.id],
  photoCredits: [],
}
