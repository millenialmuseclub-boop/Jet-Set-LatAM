import type { Destination, Neighborhood, Place, Guide } from '@/types'
import { guadalajaraPhotos } from '@/assets/guadalajara'

// ---------------------------------------------------------------------------
// Guadalajara — GUIDE-tier destination (Pass 5)
//
// PROVENANCE: adapted from real, published jetsetlatam.com
// (thebrunchmanifesto.blog) articles:
//   - "Hidden Gems of Guadalajara's Colonia Americana" (2025-11-27) — an
//     intentionally atmospheric neighborhood piece with no named businesses;
//     used here only for the honest, generic Colonia Americana description
//     below, never to invent specific Places.
//   - "The José Cuervo Express Travel Guide: From Guadalajara to Tequila"
//     (2025-10-20) — the source for the José Cuervo Express experience and
//     the two named hotels in Tequila.
//
// GUIDE tier, not LIVE: real content supports a genuine destination page,
// but only 3 verified Places and no verified category variety within the
// city proper — not enough for full Plan a Trip support. Photography is
// authentic (2 real candid photos from the WordPress media library — see
// src/assets/guadalajara/index.ts); category sections beyond landmark/
// experience/hotel are intentionally omitted rather than invented.
// ---------------------------------------------------------------------------

export const guadalajaraNeighborhoods: Neighborhood[] = [
  {
    id: 'nb-colonia-americana',
    name: 'Colonia Americana',
    city: 'Guadalajara',
    description:
      'Guadalajara’s design-forward, tree-lined heart — art deco mansions turned cafés and galleries, mural-covered walls, and wine bars tucked into quiet residential streets. Best explored on foot, without a fixed plan.',
  },
  {
    id: 'nb-centro-historico',
    name: 'Centro Histórico',
    city: 'Guadalajara',
    description:
      'The historic core around the Cathedral and Plaza de la Liberación, where Orozco’s murals cover the walls of the Instituto Cultural Cabañas and the city’s civic life still plays out in the plazas.',
    heroPhoto: guadalajaraPhotos.guadalajaraSignCathedral,
  },
]

export const guadalajaraPlaces: Place[] = [
  {
    id: 'pl-instituto-cabanas',
    name: 'Instituto Cultural Cabañas',
    country: 'Mexico',
    city: 'Guadalajara',
    neighborhood: 'Centro Histórico',
    category: 'museum',
    description:
      'A UNESCO World Heritage former hospice turned cultural institute, home to José Clemente Orozco’s monumental murals — including the famous dome fresco and the auditorium mural of "Man of Fire" and its surrounding panels.',
    photos: [guadalajaraPhotos.institutoCabanasMural],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'Standing under Orozco’s murals in the former hospice chapel — one of Mexico’s great muralist works, in a space built for exactly this scale.',
      spend: '$',
    },
    priceLevel: '$',
    tags: ['museum', 'mural', 'unesco'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Instituto+Cultural+Cabañas+Guadalajara',
    sourceUrl: 'https://thebrunchmanifesto.blog/hidden-gems-of-guadalajaras-colonia-americana/',
  },
  {
    id: 'pl-jose-cuervo-express',
    name: 'José Cuervo Express',
    country: 'Mexico',
    city: 'Guadalajara',
    category: 'experience',
    description:
      'A day-trip train from Guadalajara to the town of Tequila, rolling through blue agave fields with mariachi, regional food and tequila tastings on board — Jalisco’s signature spirit, experienced at its source.',
    photos: [],
    isJetSetPick: true,
    pickDetails: {
      goFor: 'The agave-field scenery and on-board tastings — a full day out of the city that still feels like Jalisco, not a theme-park version of it.',
      orderOrDo: 'Runs seasonally; November–May is the most reliable window to ride.',
      spend: '$$$',
    },
    priceLevel: '$$$',
    tags: ['experience', 'day-trip', 'tequila'],
    practicalNotes: 'Best time to ride: November–May.',
    sourceUrl: 'https://thebrunchmanifesto.blog/the-jose-cuervo-express-travel-guide-from-guadalajara-to-tequila/',
  },
  {
    id: 'pl-matices-hotel-de-barricas',
    name: 'Matices Hotel de Barricas',
    country: 'Mexico',
    city: 'Tequila',
    category: 'hotel',
    description:
      'A boutique hotel in the town of Tequila with rooms built inside real oak barrels — a novelty that doubles as a genuinely comfortable base for exploring the agave region beyond a single day trip.',
    photos: [],
    isJetSetPick: false,
    tags: ['hotel', 'tequila', 'boutique'],
    sourceUrl: 'https://thebrunchmanifesto.blog/the-jose-cuervo-express-travel-guide-from-guadalajara-to-tequila/',
  },
  {
    id: 'pl-casa-salles-hotel-boutique',
    name: 'Casa Salles Hotel Boutique',
    country: 'Mexico',
    city: 'Tequila',
    category: 'hotel',
    description:
      'A luxurious boutique hotel in Tequila with an on-site spa and easy access to the José Cuervo Express station — a quieter, more comfortable alternative to a same-day return to Guadalajara.',
    photos: [],
    isJetSetPick: false,
    tags: ['hotel', 'tequila', 'spa'],
    sourceUrl: 'https://thebrunchmanifesto.blog/the-jose-cuervo-express-travel-guide-from-guadalajara-to-tequila/',
  },
]

export const guadalajaraGuides: Guide[] = [
  {
    id: 'gd-guadalajara-colonia-americana',
    title: 'Hidden Gems of Guadalajara’s Colonia Americana',
    destinationId: 'guadalajara',
    section: 'see',
    dek: 'Art deco mansions, mural-covered walls and quiet wine bars — Guadalajara’s most design-forward neighborhood, made for wandering.',
    body:
      'Colonia Americana rewards slow walking more than any checklist. Art deco mansions have been reborn as cafés and galleries along tree-lined streets, murals cover walls where you least expect them, and small wine bars tuck into what used to be family homes. There is no single address that defines the neighborhood — the character is in the accumulation of small, considered spaces, one block at a time.',
    heroPhoto: guadalajaraPhotos.institutoCabanasMural,
    placeIds: [],
    sourceUrl: 'https://thebrunchmanifesto.blog/hidden-gems-of-guadalajaras-colonia-americana/',
    publishedAt: '2025-11-27',
  },
  {
    id: 'gd-guadalajara-tequila-express',
    title: 'The José Cuervo Express: From Guadalajara to Tequila',
    destinationId: 'guadalajara',
    section: 'experiences',
    dek: 'A day trip through blue agave country, with mariachi, tastings, and two real reasons to stay the night.',
    body:
      'The José Cuervo Express runs from Guadalajara into the town of Tequila, cutting through fields of blue agave with mariachi and tastings on board. It works well as a single long day out of the city — but Tequila itself has enough going for it to justify staying over, whether that means the barrel-shaped rooms at Matices Hotel de Barricas or the spa and easy train access at Casa Salles Hotel Boutique. The train runs seasonally; November through May is the most reliable window.',
    heroPhoto: guadalajaraPhotos.guadalajaraSignCathedral,
    placeIds: ['pl-jose-cuervo-express', 'pl-matices-hotel-de-barricas', 'pl-casa-salles-hotel-boutique'],
    sourceUrl: 'https://thebrunchmanifesto.blog/the-jose-cuervo-express-travel-guide-from-guadalajara-to-tequila/',
    publishedAt: '2025-10-20',
  },
]

export const guadalajaraDestination: Destination = {
  id: 'guadalajara',
  slug: 'guadalajara',
  city: 'Guadalajara',
  country: 'Mexico',
  heroPhoto: guadalajaraPhotos.guadalajaraSignCathedral,
  tagline: 'Murals, mezcal country next door, and a neighborhood built for wandering.',
  status: 'guide',
  content: {
    overview:
      'Guadalajara pairs a design-forward, walkable core with one of Mexico’s most iconic day trips just outside it. Colonia Americana’s art deco streets and Orozco’s murals at the Instituto Cultural Cabañas anchor the city; the José Cuervo Express carries you out into blue agave country and the town of Tequila itself.',
    whyGo:
      'For the murals, the wandering, and the fact that a full day trip through agave fields is on the table without leaving the region.',
    bestTime: 'Content coming soon.',
  },
  neighborhoods: guadalajaraNeighborhoods,
  placeIds: guadalajaraPlaces.map((p) => p.id),
  guideIds: guadalajaraGuides.map((g) => g.id),
  itineraryIds: [],
  // Genuine, documented Rallii connection — the José Cuervo Express is a
  // real scenic train (see pl-jose-cuervo-express above), not a speculative
  // addition. See docs/CONTENT_INVENTORY.md.
  railiiConnection: {
    type: 'scenic-rail',
    description: 'The José Cuervo Express — a scenic day-trip train through blue agave country to Tequila.',
  },
}
