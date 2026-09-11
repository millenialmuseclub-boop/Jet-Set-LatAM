import type { Destination, Neighborhood, Place, Guide, Itinerary } from '@/types'
import { cartagenaPhotos } from '@/assets/cartagena'

// ---------------------------------------------------------------------------
// Cartagena — third real destination (Pass 5)
//
// PROVENANCE: content below is adapted from real, published jetsetlatam.com
// (thebrunchmanifesto.blog) articles and trip-diary posts:
//   - "The Best Designer Boutiques in Cartagena's Walled City" (2026-03-08)
//   - "Cartagena Day 2: Cloudy Weather" (2026-02-17) — the planned Old
//     Town/museums itinerary quoted within it, plus the Castillo Grande /
//     Bocagrande detour
//   - "Cartagena Day 6: Island Escapade" (2026-02-21) — Isla Barú / Blue
//     Apple Resort
// Every Place/Guide below is traceable to one of these. Photography is
// authentic travel-archive photography (camera/phone filenames, no stock
// credits) sourced from the WordPress media library — see
// src/assets/cartagena/index.ts and docs/CONTENT_INVENTORY.md.
// ---------------------------------------------------------------------------

export const cartagenaNeighborhoods: Neighborhood[] = [
  {
    id: 'nb-centro-walled-city',
    name: 'Centro / Walled City',
    city: 'Cartagena',
    description:
      'The historic core, ringed by centuries-old fortress walls — pastel façades, bougainvillea-draped balconies, horse-drawn carriages, and the city\'s densest cluster of boutiques, museums and plazas.',
    heroPhoto: cartagenaPhotos.walledCityStreet,
  },
  {
    id: 'nb-getsemani',
    name: 'Getsemaní',
    city: 'Cartagena',
    description:
      'The livelier, more local neighborhood just outside the walls — street art, social-impact cafés, and the walk-in ceviche bar that made this corner of Cartagena famous.',
  },
  {
    id: 'nb-bocagrande',
    name: 'Bocagrande',
    city: 'Cartagena',
    description:
      'The modern beach strip, with a mall and high-rise hotels — practical rather than atmospheric, worth a stop for indoor shopping on a rainy day rather than a destination in itself.',
  },
  {
    id: 'nb-castillo-grande',
    name: 'Castillo Grande',
    city: 'Cartagena',
    description:
      'An upscale, quiet residential peninsula near Bocagrande, with a paved bay-side walking trail and a narrow local beach, Playa Castillo Grande.',
  },
  {
    id: 'nb-isla-baru',
    name: 'Isla Barú',
    city: 'Cartagena',
    description:
      'A short speedboat ride from the city — turquoise water, beach cabanas and a slower pace, reached in about 20 minutes versus the longer, earlier-departing boats out to the Rosario Islands.',
  },
]

export const cartagenaPlaces: Place[] = [
  // --- Walled City boutiques (shop) --------------------------------------
  {
    id: 'pl-johanna-ortiz',
    name: 'Johanna Ortiz',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'shop',
    address: 'Calle del Colegio, Centro, Cartagena',
    description:
      'The flagship of Colombia\'s best-known ready-to-wear designer — tropical, sculptural silhouettes in a courtyard boutique that feels like a private garden dressed as a fashion sanctuary.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Sculptural, feminine, unmistakably Colombian pieces with real drama.',
      spend: '$$$$',
    },
    priceLevel: '$$$$',
    tags: ['fashion', 'Colombian design', 'flagship'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Johanna+Ortiz+Calle+del+Colegio+Cartagena',
    relatedGuideIds: ['gd-cartagena-boutiques'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/03/08/the-best-designer-boutiques-in-cartagenas-walled-city/',
  },
  {
    id: 'pl-agua-by-agua-bendita',
    name: 'Agua by Agua Bendita',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'shop',
    address: 'Calle Santo Domingo, Centro, Cartagena',
    description:
      'A botanical sanctuary of a boutique on Cartagena\'s most photogenic street, glowing with hand-embroidered resortwear so detailed it feels alive.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Hand-embroidered Colombian resortwear — romantic, tropical prints worth the splurge.',
      skipIf: 'You\'ve already visited the main Agua Bendita boutique at the Bocagrande mall — this is the sister store, not a duplicate stop.',
      spend: '$$$',
    },
    priceLevel: '$$$',
    tags: ['fashion', 'resortwear', 'embroidery'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Agua+by+Agua+Bendita+Calle+Santo+Domingo+Cartagena',
    relatedGuideIds: ['gd-cartagena-boutiques'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/03/08/the-best-designer-boutiques-in-cartagenas-walled-city/',
  },
  {
    id: 'pl-silvia-tcherassi-cartagena',
    name: 'Silvia Tcherassi',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'shop',
    address: 'Calle de la Mantilla, Centro, Cartagena',
    description:
      'A cool, architectural boutique-atelier steps from the designer\'s own hotel — minimalism and Caribbean warmth in equal measure.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$$',
    tags: ['fashion', 'architecture', 'minimalist'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Silvia+Tcherassi+Calle+de+la+Mantilla+Cartagena',
    relatedGuideIds: ['gd-cartagena-boutiques'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/03/08/the-best-designer-boutiques-in-cartagenas-walled-city/',
  },
  {
    id: 'pl-juan-de-dios',
    name: 'Juan de Dios',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'shop',
    description:
      'A softer, romantic side of Colombian resortwear — sand, coral and ocean-green tones, sculptural silhouettes designed for golden hour.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$',
    tags: ['fashion', 'resortwear'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Juan+de+Dios+Cartagena',
    relatedGuideIds: ['gd-cartagena-boutiques'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/03/08/the-best-designer-boutiques-in-cartagenas-walled-city/',
  },
  {
    id: 'pl-maaji',
    name: 'Maaji',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'shop',
    address: 'Calle de Ayos, Centro, Cartagena',
    description: 'Bold prints and reversible swimwear — a burst of youthful, technicolor Colombian joy.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['swimwear', 'colorful'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Maaji+Calle+de+Ayos+Cartagena',
    relatedGuideIds: ['gd-cartagena-boutiques'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/03/08/the-best-designer-boutiques-in-cartagenas-walled-city/',
  },

  // --- Eat / Drink --------------------------------------------------------
  {
    id: 'pl-cafe-stepping-stone',
    name: 'Café Stepping Stone',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Getsemaní',
    category: 'cafe',
    description: 'A social-impact café in Getsemaní known for excellent coffee and wholesome plates — a good first stop before a museum morning.',
    photos: [],
    isJetSetPick: true,
    pickDetails: { goFor: 'A good coffee and a plate that gives back — proceeds support the café\'s social mission.', spend: '$$' },
    priceLevel: '$$',
    tags: ['café', 'breakfast', 'social impact'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cafe+Stepping+Stone+Getsemani+Cartagena',
    relatedGuideIds: ['gd-cartagena-old-town'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/17/cartagena-day-2/',
  },
  {
    id: 'pl-la-cevicheria',
    name: 'La Cevichería',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Getsemaní',
    category: 'restaurant',
    description: 'A lively, walk-in-only ceviche bar made famous by Anthony Bourdain — no reservations, worth the wait.',
    photos: [],
    isJetSetPick: true,
    pickDetails: { goFor: 'Fresh ceviche in a loud, no-reservations room that earns its reputation.', skipIf: 'You want a quiet, sit-down meal — go at an off hour or expect a line.', spend: '$$' },
    priceLevel: '$$',
    tags: ['ceviche', 'seafood', 'no reservations'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=La+Cevicheria+Getsemani+Cartagena',
    relatedGuideIds: ['gd-cartagena-old-town'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/17/cartagena-day-2/',
  },
  {
    id: 'pl-la-vitrola',
    name: 'La Vitrola',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'restaurant',
    description: 'One of the city\'s most iconic restaurants — Cuban-inspired ambiance, refined Caribbean dishes, and live folk-Colombian music some nights.',
    photos: [],
    isJetSetPick: true,
    pickDetails: { goFor: 'The yuca seafood empanada and a live folk-Colombian set, if you catch one.', orderOrDo: 'Reservations required — book ahead.', spend: '$$$' },
    priceLevel: '$$$',
    tags: ['Caribbean', 'iconic', 'live music', 'reservations required'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=La+Vitrola+Cartagena',
    relatedGuideIds: ['gd-cartagena-old-town'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/17/cartagena-day-2/',
  },
  {
    id: 'pl-el-sombreron-osteria',
    name: 'El Sombrerón Ostrería',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Isla Barú',
    category: 'restaurant',
    description:
      'A humble, plastic-chair ostrería near the murallas doing an excellent Colombian-style shrimp cocktail — seasoned shrimp, brunoised onion, fresh herbs and lime, served with saltines.',
    photos: [],
    isJetSetPick: true,
    pickDetails: { goFor: 'The shrimp cocktail — nothing like the bland version back home.', spend: '$' },
    priceLevel: '$',
    tags: ['seafood', 'local', 'inexpensive'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=El+Sombreron+Osteria+Cartagena',
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/21/cartagena-day-6-island-escapade/',
  },

  // --- Nightlife -----------------------------------------------------------
  {
    id: 'pl-mondo-bar',
    name: 'Mondo Bar',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'nightlife',
    description: 'A very lively late-night spot inside the walled city — reportedly a haunt of visiting Colombian pop stars.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['nightlife', 'bar'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mondo+Bar+Cartagena',
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/17/cartagena-day-2/',
  },

  // --- Landmarks / culture --------------------------------------------------
  {
    id: 'pl-castillo-san-felipe',
    name: 'Castillo San Felipe de Barajas',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'landmark',
    description: 'The imposing hilltop fortress that once guarded the city — tunnels, battlements and sweeping views. Arrive early to beat the heat and crowds.',
    photos: [],
    isJetSetPick: true,
    pickDetails: { goFor: 'The tunnels and the view from the top — Cartagena\'s single best fortress.', spend: '$' },
    priceLevel: '$',
    tags: ['fortress', 'history', 'landmark'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Castillo+San+Felipe+de+Barajas+Cartagena',
    relatedGuideIds: ['gd-cartagena-old-town'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/17/cartagena-day-2/',
  },
  {
    id: 'pl-palace-of-inquisition',
    name: 'Palace of the Inquisition',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'museum',
    address: 'Plaza de Bolívar, Centro, Cartagena',
    description: 'A colonial-era palace on Plaza de Bolívar with a dark history — one of a compact cluster of museums within a few minutes\' walk of each other.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['museum', 'history'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Palace+of+the+Inquisition+Cartagena',
    relatedGuideIds: ['gd-cartagena-old-town'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/17/cartagena-day-2/',
  },
  {
    id: 'pl-gold-museum-cartagena',
    name: 'Museo del Oro Zenú (Gold Museum)',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'museum',
    description: 'A compact but fascinating look at indigenous Zenú craftsmanship, just across the square from the Palace of the Inquisition.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['museum', 'indigenous craft', 'free'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Museo+del+Oro+Zenu+Cartagena',
    relatedGuideIds: ['gd-cartagena-old-town'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/17/cartagena-day-2/',
  },
  {
    id: 'pl-plaza-santo-domingo',
    name: 'Plaza Santo Domingo',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'landmark',
    description: 'Home to Botero\'s voluptuous bronze sculpture "La Gorda Gertrudis," with street performers and warm lamplight making evenings here especially atmospheric.',
    photos: [cartagenaPhotos.palenquerasStreet],
    isJetSetPick: true,
    pickDetails: { goFor: 'Evening atmosphere — musicians, lamplight, and Botero\'s sculpture.', spend: '$' },
    priceLevel: '$',
    tags: ['plaza', 'art', 'evening'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+Santo+Domingo+Cartagena',
    relatedGuideIds: ['gd-cartagena-old-town'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/17/cartagena-day-2/',
  },
  {
    id: 'pl-las-murallas',
    name: 'Las Murallas',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'landmark',
    description: 'The centuries-old city walls, near the Baluarte de Santo Domingo — the classic spot for a golden-hour panorama over the Caribbean.',
    photos: [cartagenaPhotos.murallasSunset],
    isJetSetPick: true,
    pickDetails: { goFor: 'Sunset — this is where the whole city goes to watch it.', spend: '$' },
    priceLevel: '$',
    tags: ['sunset', 'free', 'walls'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Las+Murallas+Cartagena',
    pairWithPlaceId: 'pl-el-sombreron-osteria',
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/17/cartagena-day-2/',
  },
  {
    id: 'pl-portal-de-los-dulces',
    name: 'Portal de los Dulces',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Centro / Walled City',
    category: 'shop',
    description: 'An arcade of sweets stalls near Plaza de los Coches — cocadas and other Caribbean-Colombian candy, worth a browse even if every stall looks the same.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['sweets', 'market', 'souvenir'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Portal+de+los+Dulces+Cartagena',
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/17/cartagena-day-2/',
  },

  // --- Stay / island ---------------------------------------------------------
  {
    id: 'pl-blue-apple-resort',
    name: 'Blue Apple Beach Resort',
    country: 'Colombia',
    city: 'Cartagena',
    neighborhood: 'Isla Barú',
    category: 'hotel',
    description:
      'A highly rated beach resort on Isla Barú, a relaxed 20-minute speedboat ride from the city — rustic-chic garden cabanas, turquoise water, and an easy day of doing nothing.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'A genuine day of rest — the shorter, later-departing boat ride here beats the longer, earlier Rosario Islands trip if you just want to relax.',
      spend: '$$$',
    },
    priceLevel: '$$$',
    tags: ['beach', 'resort', 'day trip', 'Isla Barú'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Blue+Apple+Beach+Resort+Isla+Baru+Cartagena',
    relatedGuideIds: ['gd-cartagena-island'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/21/cartagena-day-6-island-escapade/',
  },
]

export const cartagenaGuides: Guide[] = [
  {
    id: 'gd-cartagena-boutiques',
    title: 'The Best Designer Boutiques in Cartagena\'s Walled City',
    destinationId: 'cartagena',
    section: 'shop',
    dek: 'A sun-drenched walk through Colombia\'s most stylish colonial quarter — Johanna Ortiz, Agua by Agua Bendita, Silvia Tcherassi and more.',
    heroPhoto: cartagenaPhotos.walledCityStreet,
    body:
      'The best way to explore Cartagena\'s boutiques is to let the city set the pace — mornings breezy and golden, evenings glowing with lantern light. Start on Calle del Colegio at Johanna Ortiz\'s flagship, tropical and sculptural. Drift to Calle Santo Domingo for Agua by Agua Bendita\'s hand-embroidered resortwear, then Calle de la Mantilla for Silvia Tcherassi\'s cool, architectural atelier. Juan de Dios brings understated, golden-hour luxury; Maaji, at Calle de Ayos, closes the loop with playful color. Plan for 2–3 hours of slow wandering, and stop for a limonada de coco between stops — Cartagena\'s heat is beautifully, unapologetically warm.',
    placeIds: ['pl-johanna-ortiz', 'pl-agua-by-agua-bendita', 'pl-silvia-tcherassi-cartagena', 'pl-juan-de-dios', 'pl-maaji'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/03/08/the-best-designer-boutiques-in-cartagenas-walled-city/',
    publishedAt: '2026-03-08',
  },
  {
    id: 'gd-cartagena-old-town',
    title: 'Cartagena\'s Old Town: Fortress, Museums and a Golden-Hour Wall Walk',
    destinationId: 'cartagena',
    section: 'see',
    dek: 'Castillo San Felipe by morning, a cluster of museums by midday, and the classic sunset at Las Murallas.',
    heroPhoto: cartagenaPhotos.murallasSunset,
    body:
      'Begin at Café Stepping Stone in Getsemaní for coffee and a wholesome plate, then head to Castillo San Felipe de Barajas — arrive early to beat the heat and explore its tunnels and battlements. Back inside the walls, a cluster of museums sits within a few minutes of each other: the Palace of the Inquisition on Plaza de Bolívar, the Gold Museum (Museo del Oro Zenú) across the square, and — time allowing — the Naval Museum of the Caribbean and the elegant Teatro Adolfo Mejía. Lunch is La Cevichería in Getsemaní, walk-in only and made famous by Anthony Bourdain. Spend the afternoon among the Old Town\'s boutiques and galleries, then relax in Plaza Santo Domingo beneath Botero\'s "La Gorda Gertrudis" as evening settles. Catch sunset at Las Murallas near the Baluarte de Santo Domingo, wander past the sweet stalls of Portal de los Dulces, and close with dinner — reservations required — at La Vitrola.',
    placeIds: [
      'pl-cafe-stepping-stone', 'pl-castillo-san-felipe', 'pl-palace-of-inquisition', 'pl-gold-museum-cartagena',
      'pl-la-cevicheria', 'pl-plaza-santo-domingo', 'pl-las-murallas', 'pl-portal-de-los-dulces', 'pl-la-vitrola',
    ],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/17/cartagena-day-2/',
    publishedAt: '2026-02-17',
  },
  {
    id: 'gd-cartagena-island',
    title: 'Cartagena\'s Island Escape: A Day on Isla Barú',
    destinationId: 'cartagena',
    section: 'beaches',
    dek: 'A 20-minute speedboat, a beach cabana, and a plate of shrimp cocktail that redefines the dish.',
    body:
      'When the Old Town routine gets repetitive, Isla Barú is the reset — a relaxed 20-minute speedboat ride, versus the longer, earlier-departing boats out to the Rosario Islands. The Blue Apple Beach Resort makes a good base: turquoise water, a shaded garden cabana, and a day built entirely around doing nothing. Back in the city that evening, El Sombrerón Ostrería — a humble, plastic-chair stand near the murallas — serves an excellent Colombian-style shrimp cocktail, seasoned and bright, nothing like the bland version most travelers expect.',
    placeIds: ['pl-blue-apple-resort', 'pl-el-sombreron-osteria'],
    sourceUrl: 'https://thebrunchmanifesto.blog/2026/02/21/cartagena-day-6-island-escapade/',
    publishedAt: '2026-02-21',
  },
]

// A ready-made itinerary, assembled deterministically from the real Places
// above (not AI-generated) — same pattern as Mexico City and Rio.
export const cartagenaReadyMadeItinerary: Itinerary = {
  id: 'it-cartagena-walled-city-island-3day',
  destinationId: 'cartagena',
  title: '3 Days in Cartagena: Walled City & Island',
  isReadyMade: true,
  days: [
    {
      day: 1,
      theme: 'Arrival + Boutique Walk',
      activities: [
        { id: 'c1', time: '9:00', label: 'Breakfast', placeId: 'pl-cafe-stepping-stone' },
        { id: 'c2', time: '10:30', label: 'Boutique walk', placeId: 'pl-johanna-ortiz' },
        { id: 'c3', time: '12:00', label: 'Explore', placeId: 'pl-agua-by-agua-bendita' },
        { id: 'c4', time: '13:00', label: 'Lunch', placeId: 'pl-la-cevicheria' },
        { id: 'c5', time: '16:00', label: 'Design detour', placeId: 'pl-silvia-tcherassi-cartagena' },
        { id: 'c6', time: '19:30', label: 'Dinner', placeId: 'pl-la-vitrola' },
      ],
    },
    {
      day: 2,
      theme: 'Culture + Old Town',
      activities: [
        { id: 'c7', time: '9:00', label: 'Fortress morning', placeId: 'pl-castillo-san-felipe' },
        { id: 'c8', time: '11:30', label: 'Museums', placeId: 'pl-gold-museum-cartagena' },
        { id: 'c9', time: '13:00', label: 'Lunch', notes: 'Open block — no verified pick yet' },
        { id: 'c10', time: '17:30', label: 'Evening plaza', placeId: 'pl-plaza-santo-domingo' },
        { id: 'c11', time: '18:30', label: 'Sunset at the walls', placeId: 'pl-las-murallas' },
        { id: 'c12', time: '21:00', label: 'Drinks', placeId: 'pl-mondo-bar' },
      ],
    },
    {
      day: 3,
      theme: 'Easy Pace',
      activities: [
        { id: 'c13', time: '9:00', label: 'Breakfast', notes: 'Open block — no verified pick yet' },
        { id: 'c14', time: '11:30', label: 'Island escape', placeId: 'pl-blue-apple-resort' },
        { id: 'c15', time: '19:30', label: 'Dinner', placeId: 'pl-el-sombreron-osteria' },
      ],
    },
  ],
}

export const cartagenaDestination: Destination = {
  id: 'cartagena',
  slug: 'cartagena',
  city: 'Cartagena',
  country: 'Colombia',
  heroPhoto: cartagenaPhotos.cartagenaSkyline,
  tagline: 'Colonial romance, Caribbean heat, and boutiques worth the sweat.',
  status: 'live',
  content: {
    overview:
      'Cartagena\'s Walled City is a place where fashion, craftsmanship and Caribbean romance blend into one long, golden-hour stroll — bougainvillea over pastel façades, horse-drawn carriages, and boutiques that feel like immersive little worlds. Beyond the walls, Getsemaní brings a livelier, more local energy, and a short speedboat ride out to Isla Barú trades the cobblestones for a beach cabana and turquoise water.',
    whyGo:
      'For a colonial city that still feels lived-in rather than preserved behind glass — where a centuries-old fortress, a Bourdain-famous ceviche bar and a Botero sculpture all sit within a twenty-minute walk of each other.',
    bestTime: 'December–April: driest, coolest and busiest. May–November brings more humidity and afternoon rain, with the heaviest storms August–October — shoulder months (May, November) trade a little rain for real savings and fewer crowds.',
  },
  neighborhoods: cartagenaNeighborhoods,
  placeIds: cartagenaPlaces.map((p) => p.id),
  guideIds: cartagenaGuides.map((g) => g.id),
  itineraryIds: [cartagenaReadyMadeItinerary.id],
}
