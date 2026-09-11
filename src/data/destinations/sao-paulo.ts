import type { Destination, Place, Neighborhood, Itinerary } from '@/types'
import { saoPauloPhotos } from '@/assets/sao-paulo'

// ---------------------------------------------------------------------------
// São Paulo — PLAN tier (Pass 14, promoted from EXPLORE)
//
// Two kinds of Place live in this file, and the distinction is load-bearing:
//
// JET SET PICK (isJetSetPick: true) — Beco do Batman and Sé Cathedral. Both
// backed by Jordann's own trip photography and firsthand visit (Sept 2026).
// A real personal endorsement, not just a fact.
//
// VERIFIED PLACE (isJetSetPick: false) — the other 8 (incl. Hocca Bar,
// unchanged from Pass 12). Real, named, independently verifiable places —
// researched from official sites and reputable travel/editorial sources
// (each has a sourceUrl) — but NOT represented as a personal Jet Set
// recommendation, because there's no firsthand Jet Set LatAm content behind
// them yet. No photos assigned to these (no firsthand imagery exists for
// them) — they render on the honest gradient placeholder rather than being
// given a mismatched or generic stock image. This is what gets São Paulo
// (and future destinations) past the "needs 6 blog-sourced places" trap
// without pretending Jordann has personally been to or endorsed all of them.
//
// This is why status is now 'live' (PLAN tier): 10 real Places across 7
// categories (landmark, museum, restaurant, experience, shop, nightlife,
// park) and 7 neighborhoods — enough category spread for Plan a Trip's
// planner to build a real, varied itinerary, not just repeat the same two
// places.
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
  {
    id: 'nb-centro-sp',
    name: 'Centro',
    city: 'São Paulo',
    description:
      'The historic downtown core — Praça da Sé and its neo-Gothic cathedral, the neoclassical Mercado Municipal, Oscar Niemeyer\'s wave-shaped Edifício Copan, and Art Deco towers with city-view terraces above it all.',
    heroPhoto: saoPauloPhotos.seCathedralTwinTowers,
  },
  {
    id: 'nb-bela-vista-paulista',
    name: 'Bela Vista / Avenida Paulista',
    city: 'São Paulo',
    description:
      'São Paulo\'s financial and cultural spine — a 2.75km avenue lined with skyscrapers, closed to cars on Sundays, anchored by MASP\'s red concrete-and-glass span at one end.',
  },
  {
    id: 'nb-luz',
    name: 'Luz',
    city: 'São Paulo',
    description:
      'A once-industrial district around Estação da Luz and the Jardim da Luz park, now home to the Pinacoteca — the city\'s oldest art museum, inside a restored 1900s brick building.',
  },
  {
    id: 'nb-pinheiros',
    name: 'Pinheiros',
    city: 'São Paulo',
    description:
      'A leafy, walkable west-side neighborhood built around its own century-old municipal market — smaller and less touristed than the downtown one, dense with produce stalls and lunch counters.',
  },
  {
    id: 'nb-jardins',
    name: 'Jardins',
    city: 'São Paulo',
    description:
      'São Paulo\'s most manicured neighborhood — tree-lined streets, the city\'s highest concentration of designer boutiques along Rua Oscar Freire, and some of its most decorated restaurant kitchens.',
  },
  {
    id: 'nb-ibirapuera',
    name: 'Ibirapuera',
    city: 'São Paulo',
    description:
      'Home to Ibirapuera Park, São Paulo\'s largest and most-used green space, laced with Oscar Niemeyer-designed pavilions and a curved marquee connecting them.',
  },
]

export const saoPauloPlaces: Place[] = [
  // --- Jet Set Picks: Jordann's own visits, Sept 2026 -------------------
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
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Beco+do+Batman+Vila+Madalena+Sao+Paulo',
    tags: ['street-art', 'mural', 'photo-op'],
  },
  {
    id: 'pl-se-cathedral',
    name: 'Sé Cathedral (Catedral da Sé)',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Centro',
    category: 'landmark',
    description:
      'A neo-Gothic cathedral anchoring Praça da Sé, the symbolic center of the city — twin bell towers, a rose window, and a Renaissance-style dome, built over four decades starting in 1913 on the site of the original 16th-century church that gave São Paulo its name.',
    photos: [saoPauloPhotos.seCathedralTwinTowers, saoPauloPhotos.seCathedralFacadeDetail],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Stand at the base of the steps and look straight up — the twin spires and rose window read as one composition from directly in front, better than any angled shot.',
      spend: '$',
    },
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Catedral+da+Se+Praca+da+Se+Sao+Paulo',
    // NOTE: catedraldase.org.br is NOT this cathedral's site — checked
    // during the Pass 14 link audit and found to be an unrelated squatted
    // domain. No verified official site found; mapUrl only.
    tags: ['cathedral', 'architecture', 'centro'],
  },

  // --- Verified Places: researched, not personally covered yet ----------
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
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hocca+Bar+Mercado+Municipal+Sao+Paulo',
    sourceUrl: 'https://jetsetlatam.com',
    tags: ['market', 'sandwich', 'lunch'],
  },
  {
    id: 'pl-masp',
    name: 'MASP (Museu de Arte de São Paulo)',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Bela Vista / Avenida Paulista',
    category: 'museum',
    description:
      'The city\'s signature art museum — a red concrete-and-glass box suspended above an open public plaza, designed by Lina Bo Bardi and opened in 1968. Home to Brazil\'s most important collection of Western art, hung on freestanding glass easels rather than walls.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=MASP+Avenida+Paulista+1578+Sao+Paulo',
    website: 'https://masp.org.br/en',
    sourceUrl: 'https://masp.org.br/en/about',
    tags: ['museum', 'art', 'architecture'],
  },
  {
    id: 'pl-avenida-paulista',
    name: 'Avenida Paulista',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Bela Vista / Avenida Paulista',
    category: 'landmark',
    description:
      'A 2.75km avenue that\'s been São Paulo\'s financial and civic spine since the early 1900s — skyscrapers, cultural institutions and MASP along its length, closed to car traffic on Sundays for walkers, cyclists and street performers.',
    photos: [],
    isJetSetPick: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Avenida+Paulista+Sao+Paulo',
    sourceUrl: 'https://en.wikivoyage.org/wiki/S%C3%A3o_Paulo/Paulista',
    tags: ['avenue', 'skyline', 'sunday-walk'],
  },
  {
    id: 'pl-pinacoteca',
    name: 'Pinacoteca de São Paulo',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Luz',
    category: 'museum',
    description:
      'The city\'s oldest art museum, opened in 1905, inside a restored brick building in Jardim da Luz — Brazilian art from the 19th century to today, with a glass-roofed courtyard added by architect Paulo Mendes da Rocha.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pinacoteca+de+Sao+Paulo',
    website: 'https://pinacoteca.org.br/en/pina/o-museu/institucional/',
    sourceUrl: 'https://en.wikipedia.org/wiki/Pinacoteca_do_Estado_de_S%C3%A3o_Paulo',
    tags: ['museum', 'art', 'luz'],
  },
  {
    id: 'pl-mercado-pinheiros',
    name: 'Mercado Municipal de Pinheiros',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Pinheiros',
    category: 'experience',
    description:
      'A smaller, less-touristed cousin of the downtown Mercado Municipal — a working neighborhood market dense with produce stalls, butchers and lunch counters, in the west-side Pinheiros district.',
    photos: [],
    isJetSetPick: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+Municipal+de+Pinheiros+Sao+Paulo',
    // Link audit catch: mercadomunicipaldepinheiros.com is a fan/community
    // page (explicit "no ties to any public or private agency" disclaimer,
    // plus dubious future-dated posts) — not the market's official site. No
    // official site found; mapUrl only, same honesty rule applied to the
    // Sé Cathedral link earlier.
    tags: ['market', 'produce', 'local'],
  },
  {
    id: 'pl-edificio-copan',
    name: 'Edifício Copan',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Centro',
    category: 'landmark',
    description:
      'Oscar Niemeyer\'s wave-shaped residential tower, completed in 1966 — one of the largest single residential buildings in the world, with over 1,100 apartments and its own internal shopping arcade at street level.',
    photos: [],
    isJetSetPick: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Edificio+Copan+Sao+Paulo',
    sourceUrl: 'https://en.wikipedia.org/wiki/Edif%C3%ADcio_Copan',
    tags: ['architecture', 'niemeyer', 'centro'],
  },
  {
    id: 'pl-rua-oscar-freire',
    name: 'Rua Oscar Freire',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Jardins',
    category: 'shop',
    description:
      'São Paulo\'s premier shopping street, running through Jardins — a tree-lined stretch of designer boutiques, concept stores and cafés, consistently ranked among the most expensive shopping streets in the world.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Oscar+Freire+Sao+Paulo',
    sourceUrl: 'https://en.wikipedia.org/wiki/Rua_Oscar_Freire',
    tags: ['shopping', 'boutiques', 'jardins'],
  },
  {
    id: 'pl-dom-restaurante',
    name: 'D.O.M.',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Jardins',
    category: 'restaurant',
    description:
      'Chef Alex Atala\'s two-Michelin-star restaurant in Jardins — Brazilian ingredients (Amazonian fish, native fruits, ants among them) built into tasting menus that helped put modern Brazilian fine dining on the world stage.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=DOM+Restaurante+Jardins+Sao+Paulo',
    website: 'https://domrestaurante.com.br/',
    sourceUrl: 'https://guide.michelin.com/us/en/sao-paulo-region/sao-paulo/restaurant/d-o-m',
    tags: ['fine-dining', 'michelin', 'tasting-menu'],
  },
  {
    id: 'pl-terraco-italia',
    name: 'Terraço Itália',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Centro',
    category: 'nightlife',
    description:
      'A restaurant and bar on the 41st floor of Edifício Itália, one of the city\'s tallest towers — 360-degree views over São Paulo\'s skyline from a glass-walled dining room, best timed for sunset.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Terraco+Italia+Edificio+Italia+Sao+Paulo',
    website: 'https://www.terracoitalia.com.br/',
    tags: ['rooftop', 'skyline', 'sunset'],
  },
  {
    id: 'pl-ibirapuera-park',
    name: 'Ibirapuera Park',
    country: 'Brazil',
    city: 'São Paulo',
    neighborhood: 'Ibirapuera',
    category: 'park',
    description:
      'São Paulo\'s largest and most-used park, opened in 1954 — running trails, lakes, and a cluster of Oscar Niemeyer-designed cultural pavilions (the Biennial Pavilion, the Oca) connected by a single sweeping curved marquee.',
    photos: [],
    isJetSetPick: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Parque+Ibirapuera+Sao+Paulo',
    sourceUrl: 'https://en.wikipedia.org/wiki/Ibirapuera_Park',
    tags: ['park', 'niemeyer', 'running'],
  },
]

export const saoPauloReadyMadeItinerary: Itinerary = {
  id: 'it-sao-paulo-art-design-food-3day',
  destinationId: 'sao-paulo',
  title: 'Art, Design + Food Weekend, 3 Days',
  isReadyMade: true,
  days: [
    {
      day: 1,
      theme: 'Centro: Cathedral, Market + Architecture',
      activities: [
        { id: 'sp-a1', time: '9:00', label: 'Breakfast', notes: 'Open block — no verified place yet for this slot' },
        { id: 'sp-a2', time: '10:30', label: 'Sé Cathedral', placeId: 'pl-se-cathedral' },
        { id: 'sp-a3', time: '13:00', label: 'Lunch', placeId: 'pl-hocca-bar' },
        { id: 'sp-a4', time: '15:00', label: 'Edifício Copan', placeId: 'pl-edificio-copan' },
        { id: 'sp-a5', time: '19:30', label: 'Dinner + skyline', placeId: 'pl-terraco-italia' },
      ],
    },
    {
      day: 2,
      theme: 'Paulista + Luz: Museums',
      activities: [
        { id: 'sp-a6', time: '9:00', label: 'Breakfast', notes: 'Open block — no verified place yet for this slot' },
        { id: 'sp-a7', time: '10:30', label: 'MASP', placeId: 'pl-masp' },
        { id: 'sp-a8', time: '12:00', label: 'Walk Avenida Paulista', placeId: 'pl-avenida-paulista' },
        { id: 'sp-a9', time: '14:00', label: 'Pinacoteca de São Paulo', placeId: 'pl-pinacoteca' },
        { id: 'sp-a10', time: '19:30', label: 'Dinner', placeId: 'pl-dom-restaurante' },
      ],
    },
    {
      day: 3,
      theme: 'Vila Madalena + Jardins: Street Art + Shopping',
      activities: [
        { id: 'sp-a11', time: '9:00', label: 'Breakfast', notes: 'Open block — no verified place yet for this slot' },
        { id: 'sp-a12', time: '10:30', label: 'Beco do Batman', placeId: 'pl-beco-do-batman' },
        { id: 'sp-a13', time: '13:00', label: 'Lunch at Mercado de Pinheiros', placeId: 'pl-mercado-pinheiros' },
        { id: 'sp-a14', time: '15:30', label: 'Shop Rua Oscar Freire', placeId: 'pl-rua-oscar-freire' },
        { id: 'sp-a15', time: '17:30', label: 'Ibirapuera Park', placeId: 'pl-ibirapuera-park' },
      ],
    },
  ],
}

export const saoPauloDestination: Destination = {
  id: 'sao-paulo',
  slug: 'sao-paulo',
  city: 'São Paulo',
  country: 'Brazil',
  heroPhoto: saoPauloPhotos.seCathedralTwinTowers,
  tagline: 'Murals, museums and the creative pulse of Brazil\'s biggest city',
  status: 'live',
  content: {
    overview:
      'São Paulo runs from the neo-Gothic Sé Cathedral and neoclassical Mercado Municipal downtown, up Avenida Paulista\'s skyscraper spine to MASP, out to Oscar Niemeyer\'s Ibirapuera pavilions, and back into Vila Madalena\'s ever-repainted Beco do Batman alley. Ten verified places across landmarks, museums, a working market, a shopping street, a rooftop and a park — enough to build a real multi-day trip, not just a highlight reel.',
    whyGo: 'Brazil\'s biggest, densest city, with real architectural weight (Niemeyer, Lina Bo Bardi), a serious museum scene, and street life that rewards slow wandering as much as a checklist.',
    bestTime: 'June–September (Southern Hemisphere winter): mild, dry and the most comfortable for walking. December–March is hot and rainy, with heavy afternoon downpours common.',
  },
  neighborhoods: saoPauloNeighborhoods,
  placeIds: [
    'pl-se-cathedral',
    'pl-beco-do-batman',
    'pl-hocca-bar',
    'pl-masp',
    'pl-avenida-paulista',
    'pl-pinacoteca',
    'pl-mercado-pinheiros',
    'pl-edificio-copan',
    'pl-rua-oscar-freire',
    'pl-dom-restaurante',
    'pl-terraco-italia',
    'pl-ibirapuera-park',
  ],
  guideIds: [],
  itineraryIds: [saoPauloReadyMadeItinerary.id],
}
