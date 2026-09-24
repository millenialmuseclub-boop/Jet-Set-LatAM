import type { Destination, Neighborhood, Place, Itinerary } from '@/types'
import { oaxacaPhotos } from '@/assets/oaxaca'

// ---------------------------------------------------------------------------
// Oaxaca de Juárez, Mexico — new destination (Oaxaca build pass)
//
// PROVENANCE: no matching thebrunchmanifesto.blog (Jordann's own blog)
// article was found for Oaxaca this pass. Per the prior content-inventory
// pass, the blog's WordPress tag endpoint reports 3 posts tagged "Oaxaca,"
// but this session could not reach thebrunchmanifesto.blog at all — the
// environment's egress proxy returned a hard "connect_rejected / policy
// denial" on every attempt (via curl and via the WP REST API/search/tag-
// archive URLs through WebFetch), not a content or search problem. Per the
// proxy's own guidance, policy denials are not retried or routed around.
// WebSearch (a different channel) surfaced no thebrunchmanifesto.blog
// Oaxaca permalink either.
//
// Every Place/Neighborhood fact below is instead sourced from verifiable
// general reference material — Wikipedia, the official UNESCO World
// Heritage listing, oaxaca.travel-adjacent reporting, and established
// travel publications (AFAR, Historic Hotels Worldwide) — with each
// Place's `sourceUrl` pointing at the specific page the fact came from.
// No restaurant, address or fact below is invented; anything that could
// not be verified was left out rather than guessed at. See
// src/assets/oaxaca/index.ts for why there is no photography this pass.
// ---------------------------------------------------------------------------

export const oaxacaNeighborhoods: Neighborhood[] = [
  {
    id: 'nb-oaxaca-centro-historico',
    name: 'Centro Histórico',
    city: 'Oaxaca de Juárez',
    description:
      'The UNESCO-listed colonial core, laid out in a 16th-century checkerboard grid around the Zócalo — green cantera-stone churches, roughly 1,200 inventoried historic buildings, and the city\'s densest cluster of markets and mezcalerías.',
    heroPhoto: oaxacaPhotos.santoDomingoChurch,
  },
  {
    id: 'nb-oaxaca-jalatlaco',
    name: 'Jalatlaco',
    city: 'Oaxaca de Juárez',
    description:
      'A former Zapotec village turned artsy barrio about 20 minutes\' walk east of the Zócalo — cobblestone streets, brightly painted colonial façades, murals, and a 17th–18th-century parish church, Templo de San Matías Jalatlaco, at its heart.',
  },
  {
    id: 'nb-oaxaca-valles-centrales',
    name: 'Valles Centrales (Day Trips)',
    city: 'Oaxaca de Juárez',
    description:
      'The central valleys ringing the city — reachable by colectivo or car in 30-40 minutes — home to the Monte Albán archaeological site and craft villages like Teotitlán del Valle (weaving) and San Bartolo Coyotepec (black pottery).',
    heroPhoto: oaxacaPhotos.monteAlbanRuins,
  },
]

export const oaxacaPlaces: Place[] = [
  // --- Centro Histórico: landmarks & museums ---------------------------
  {
    id: 'pl-templo-santo-domingo',
    name: 'Templo de Santo Domingo de Guzmán',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Centro Histórico',
    category: 'landmark',
    description:
      'A New Spanish Baroque church begun in 1572, its facade topped by twin bell towers — the single most recognizable building in Oaxaca\'s historic center, part of the UNESCO World Heritage listing since 1987.',
    photos: [oaxacaPhotos.santoDomingoChurch],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The gilded interior and the adjoining Regional Museum of Oaxaca (in the former convent), which holds the Mixtec treasures excavated from Monte Albán\'s Tomb 7.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['church', 'baroque', 'UNESCO', 'landmark'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Templo+de+Santo+Domingo+de+Guzman+Oaxaca',
    sourceUrl: 'https://en.wikipedia.org/wiki/Church_of_Santo_Domingo_de_Guzm%C3%A1n',
  },
  {
    id: 'pl-museo-culturas-oaxaca',
    name: 'Museo de las Culturas de Oaxaca',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Centro Histórico',
    category: 'museum',
    description:
      'The regional museum housed in Santo Domingo\'s former Dominican convent, built from 1608, with pre-Columbian artifacts from Monte Albán including the Mixtec burial offerings of Tomb 7, plus an ethnobotanical garden on the former monastery grounds.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['museum', 'archaeology', 'convent'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Museo+de+las+Culturas+de+Oaxaca',
    sourceUrl: 'https://en.wikipedia.org/wiki/Church_of_Santo_Domingo_de_Guzm%C3%A1n',
  },
  {
    id: 'pl-zocalo-oaxaca',
    name: 'Zócalo de Oaxaca (Plaza de la Constitución)',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Centro Histórico',
    category: 'landmark',
    description:
      'The city\'s central plaza, anchoring the colonial checkerboard grid laid out when the city was founded in 1529 — ringed by the Cathedral and portales of café tables, and the natural starting point for a first walk through the historic center.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['plaza', 'free', 'people-watching'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Zocalo+Oaxaca+de+Juarez',
    sourceUrl: 'https://en.wikipedia.org/wiki/Oaxaca_City',
  },

  // --- Centro Histórico: eat & drink -------------------------------------
  {
    id: 'pl-mercado-20-noviembre',
    name: 'Mercado 20 de Noviembre',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Centro Histórico',
    category: 'restaurant',
    address: '20 de Noviembre 512, Centro, Oaxaca de Juárez',
    description:
      'A covered food market built around "El Pasillo de las Carnes Asadas," a corridor of grills where you pick raw meat and have it cooked to order with salsa and guacamole — the classic way to eat lunch in the historic center.',
    photos: [oaxacaPhotos.mercado20Noviembre],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['market', 'grilled meat', 'local', 'lunch'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mercado+20+de+Noviembre+Oaxaca',
    sourceUrl: 'https://www.afar.com/travel-tips/where-to-eat-in-oaxaca',
  },
  {
    id: 'pl-in-situ-mezcaleria',
    name: 'In Situ Mezcalería',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Centro Histórico',
    category: 'bar',
    address: 'José María Morelos 511, Centro, Oaxaca de Juárez',
    description:
      'A mezcal bar with over 100 varieties to sample, curated by owner and mezcal author Ulises Torrentera — the reference stop for understanding the spirit before wading into the city\'s wider mezcalería scene.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'A guided tasting flight rather than picking blind — ask what\'s behind the bar that isn\'t on a shelf back home.',
      orderOrDo: 'Open Monday–Saturday, 1–11pm.',
      spend: '$$',
    },
    priceLevel: '$$',
    tags: ['mezcal', 'bar', 'tasting'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=In+Situ+Mezcaleria+Oaxaca',
    sourceUrl: 'https://www.afar.com/places/in-situ-mezcaleria-oaxaca',
  },
  {
    id: 'pl-los-danzantes-oaxaca',
    name: 'Los Danzantes',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Centro Histórico',
    address: 'Calle Macedonio Alcalá 403, Centro, Oaxaca de Juárez',
    category: 'restaurant',
    description:
      'Contemporary Oaxacan cuisine served in a patio room of adobe walls and a koi pond, just off the pedestrian street leading to Santo Domingo.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$',
    tags: ['Oaxacan cuisine', 'patio dining'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Los+Danzantes+Oaxaca',
    sourceUrl: 'https://www.afar.com/travel-tips/where-to-eat-in-oaxaca',
  },
  {
    id: 'pl-casa-crespo',
    name: 'Casa Crespo',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Centro Histórico',
    address: 'Calle de Ignacio Allende 107, Centro, Oaxaca de Juárez',
    category: 'restaurant',
    description:
      'A rooftop terrace restaurant looking straight across at the Santo Domingo facade — tableside-cooked stone soup and stuffed squash blossoms among the specialties.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['rooftop', 'Oaxacan cuisine', 'view'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+Crespo+Oaxaca',
    sourceUrl: 'https://www.afar.com/travel-tips/where-to-eat-in-oaxaca',
  },
  {
    id: 'pl-la-catedral-oaxaca',
    name: 'La Catedral',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Centro Histórico',
    address: 'Calle de Manuel García Vigil 105, Centro, Oaxaca de Juárez',
    category: 'restaurant',
    description:
      'A courtyard restaurant that has served Oaxacan classics since 1976 — huitlacoche crepes and all seven moles, including negro and amarillo.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['mole', 'courtyard', 'longstanding'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=La+Catedral+Oaxaca+restaurant',
    sourceUrl: 'https://www.afar.com/travel-tips/where-to-eat-in-oaxaca',
  },
  {
    id: 'pl-chocolate-mayordomo',
    name: 'Chocolate Mayordomo',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Centro Histórico',
    address: 'Francisco Javier Mina 253, Oaxaca de Juárez',
    category: 'shop',
    description:
      'A traditional chocolate mill near the market district, grinding cacao with cinnamon and almonds the old way, with samples and bars to take home.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['chocolate', 'souvenir', 'local craft'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Chocolate+Mayordomo+Oaxaca',
    sourceUrl: 'https://www.afar.com/travel-tips/where-to-eat-in-oaxaca',
  },

  // --- Centro Histórico: stay ----------------------------------------------
  {
    id: 'pl-quinta-real-oaxaca',
    name: 'Quinta Real Oaxaca',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Centro Histórico',
    category: 'hotel',
    description:
      'A hotel built into the former Convent of Santa Catalina (1576) — restored from 1972 under the National Institute of Anthropology and History\'s supervision, with original frescoes and a Spanish-colonial courtyard. A member of Historic Hotels Worldwide since 2012.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$$',
    tags: ['boutique hotel', 'former convent', 'historic'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Quinta+Real+Oaxaca',
    sourceUrl: 'https://www.historichotels.org/hotels-resorts/quinta-real-oaxaca/history.php',
  },

  // --- Jalatlaco -------------------------------------------------------------
  {
    id: 'pl-templo-san-matias-jalatlaco',
    name: 'Templo de San Matías Jalatlaco',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Jalatlaco',
    category: 'landmark',
    description:
      'The 17th–18th-century parish church at the heart of Jalatlaco, a formerly separate Zapotec village that Time Out named one of the world\'s 20 coolest neighborhoods in 2019 — now a walkable grid of murals, cafés and galleries about 20 minutes from the Zócalo.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$',
    tags: ['church', 'murals', 'walkable'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Templo+de+San+Matias+Jalatlaco+Oaxaca',
    sourceUrl: 'https://yourfriendthenomad.com/jalatlaco-oaxaca/',
  },

  // --- Valles Centrales day trips --------------------------------------------
  {
    id: 'pl-monte-alban',
    name: 'Monte Albán',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Valles Centrales (Day Trips)',
    category: 'landmark',
    description:
      'The hilltop ruins of an ancient Zapotec city, founded around 500 BCE and once home to an estimated 17,200 people — part of the same 1987 UNESCO listing as Oaxaca\'s historic center, with a 300x150m main plaza and the carved "Danzantes" stone monuments.',
    photos: [oaxacaPhotos.monteAlbanRuins],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The view from the Main Plaza and the Danzantes gallery — one of Mexico\'s great archaeological sites, about 9km from the city center.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['archaeology', 'UNESCO', 'day trip', 'Zapotec'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Monte+Alban+Oaxaca',
    sourceUrl: 'https://en.wikipedia.org/wiki/Monte_Alb%C3%A1n',
  },
  {
    id: 'pl-teotitlan-del-valle',
    name: 'Teotitlán del Valle',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Valles Centrales (Day Trips)',
    category: 'experience',
    description:
      'A Zapotec weaving village 31km east of the city, about 40 minutes by colectivo, where roughly 80% of families weave — workshops demonstrate natural dyes made from cochineal, indigo and pomegranate, and sell rugs directly. Cash only; no ATM in town.',
    photos: [oaxacaPhotos.teotitlanWeaving],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['textiles', 'weaving', 'day trip', 'Zapotec'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Teotitlan+del+Valle+Oaxaca',
    practicalNotes: 'Bring cash — most workshops don\'t take cards and there\'s no ATM in the village. Plan 3-4 hours.',
    sourceUrl: 'https://oaxacaautentico.com/en/blog/teotitlan-del-valle-weaving-village-guide/',
  },
  {
    id: 'pl-san-bartolo-coyotepec',
    name: 'San Bartolo Coyotepec',
    country: 'Mexico',
    city: 'Oaxaca de Juárez',
    neighborhood: 'Valles Centrales (Day Trips)',
    category: 'shop',
    description:
      'The village 15km south of the city that makes Oaxaca\'s signature barro negro (black clay) pottery — a shiny-black finish invented in the 1950s by ceramicist Doña Rosa, whose family workshop still welcomes visitors.',
    photos: [],
    isJetSetPick: false,
    priceLevel: '$$',
    tags: ['pottery', 'craft', 'day trip', 'barro negro'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=San+Bartolo+Coyotepec+Oaxaca',
    sourceUrl: 'https://en.wikipedia.org/wiki/San_Bartolo_Coyotepec',
  },
]

// A ready-made itinerary, assembled deterministically from the real Places
// above (not AI-generated) — same pattern as Cartagena/Mexico City/Rio.
export const oaxacaReadyMadeItinerary: Itinerary = {
  id: 'it-oaxaca-centro-valles-2day',
  destinationId: 'oaxaca',
  title: '2 Days in Oaxaca: Historic Center & the Valles Centrales',
  isReadyMade: true,
  days: [
    {
      day: 1,
      theme: 'Centro Histórico',
      activities: [
        { id: 'o1', time: '9:00', label: 'Santo Domingo + museum', placeId: 'pl-templo-santo-domingo' },
        { id: 'o2', time: '10:30', label: 'Explore', placeId: 'pl-museo-culturas-oaxaca' },
        { id: 'o3', time: '13:00', label: 'Lunch', placeId: 'pl-mercado-20-noviembre' },
        { id: 'o4', time: '15:00', label: 'Wander Jalatlaco', placeId: 'pl-templo-san-matias-jalatlaco' },
        { id: 'o5', time: '18:00', label: 'Evening at the Zócalo', placeId: 'pl-zocalo-oaxaca' },
        { id: 'o6', time: '19:00', label: 'Mezcal tasting', placeId: 'pl-in-situ-mezcaleria' },
        { id: 'o7', time: '20:30', label: 'Dinner', placeId: 'pl-los-danzantes-oaxaca' },
      ],
    },
    {
      day: 2,
      theme: 'Valles Centrales Day Trip',
      activities: [
        { id: 'o8', time: '9:00', label: 'Monte Albán', placeId: 'pl-monte-alban' },
        { id: 'o9', time: '12:30', label: 'Black pottery workshops', placeId: 'pl-san-bartolo-coyotepec' },
        { id: 'o10', time: '14:30', label: 'Weaving village', placeId: 'pl-teotitlan-del-valle' },
        { id: 'o11', time: '19:30', label: 'Dinner back in town', placeId: 'pl-la-catedral-oaxaca' },
      ],
    },
  ],
}

export const oaxacaDestination: Destination = {
  id: 'oaxaca',
  slug: 'oaxaca',
  city: 'Oaxaca de Juárez',
  country: 'Mexico',
  heroPhoto: oaxacaPhotos.santoDomingoChurch,
  cardPhoto: oaxacaPhotos.mercado20Noviembre,
  tagline: 'Mole, mezcal and a UNESCO-listed colonial core in Mexico\'s culinary capital.',
  status: 'guide',
  content: {
    overview:
      'Oaxaca de Juárez\'s historic center is a green-cantera-stone grid laid out in 1529 and largely intact since — the Baroque facade of Santo Domingo, the Zócalo\'s café-lined arcades, and a market culture built around tlayudas, mole and carnes asadas cooked to order. A short trip into the surrounding Valles Centrales adds the Zapotec ruins of Monte Albán and craft villages still weaving rugs and firing black pottery the way they have for centuries.',
    whyGo:
      'Often called Mexico\'s culinary capital, with a historic center and archaeological site that share a single 1987 UNESCO World Heritage listing — few Mexican cities pack this much verified colonial architecture, indigenous craft and food culture into one compact, walkable core.',
    bestTime: 'Tourism peaks around Holy Week, summer (especially the Guelaguetza festival in mid-to-late July), and New Year\'s. June is the wettest month; the dry winter shoulder months trade festival energy for thinner crowds.',
  },
  neighborhoods: oaxacaNeighborhoods,
  placeIds: oaxacaPlaces.map((p) => p.id),
  guideIds: [],
  itineraryIds: [oaxacaReadyMadeItinerary.id],
  photoCredits: [
    { photo: oaxacaPhotos.santoDomingoChurch, credit: "Photo by nan palmero / Wikimedia Commons, CC BY 2.0", sourceUrl: 'https://commons.wikimedia.org/wiki/File:Templo_de_Santo_Domingo_de_Guzm%C3%A1n-_2023.jpg' },
    { photo: oaxacaPhotos.mercado20Noviembre, credit: "Photo by ProtoplasmaKid / Wikimedia Commons, CC BY-SA 4.0", sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mercado_20_de_noviembre_-_Oaxaca_de_Ju%C3%A1rez_-_4_-_Puesto_de_pan.jpg' },
    { photo: oaxacaPhotos.monteAlbanRuins, credit: "Photo by Infrogmation / Wikimedia Commons, CC BY-SA 4.0", sourceUrl: 'https://commons.wikimedia.org/wiki/File:Monte_Alban_Oaxaca_1976_-_Oaxaca_Valley.jpg' },
    { photo: oaxacaPhotos.alebrijesCraft, credit: "Photo by Roberto Galland / Wikimedia Commons, CC BY-SA 4.0", sourceUrl: 'https://commons.wikimedia.org/wiki/File:Alebrijes_en_Oaxaca.jpg' },
    { photo: oaxacaPhotos.teotitlanWeaving, credit: "Photo by Gengiskanhg / Wikimedia Commons, CC BY-SA 3.0", sourceUrl: 'https://commons.wikimedia.org/wiki/File:TapeteEnFabricaci%C3%B3n-Teotitl%C3%A1n_del_Valle-Oaxaca-Mexico.jpg' },
    { photo: oaxacaPhotos.mezcal, credit: "Photo by Polo Sanchez / Wikimedia Commons, CC BY-SA 4.0", sourceUrl: 'https://commons.wikimedia.org/wiki/File:Mezcal_in_Oaxaca,_Mexico.jpg' },
  ],
}
