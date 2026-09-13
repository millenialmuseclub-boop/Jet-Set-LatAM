import railGuideRecords from './rail-guides.json'
import { rio2025, rioPhotoGuides } from './rio-2025'
import { mexicoCityDestination, cdmxPlaces, cdmxGuides, cdmxReadyMadeItinerary } from './destinations/mexico-city'
import { rioDeJaneiroDestination, rioPlaces, rioGuides, rioReadyMadeItinerary } from './destinations/rio-de-janeiro'
import { cartagenaDestination, cartagenaPlaces, cartagenaGuides, cartagenaReadyMadeItinerary } from './destinations/cartagena'
import { guadalajaraDestination, guadalajaraPlaces, guadalajaraGuides } from './destinations/guadalajara'
import { tulumDestination, tulumPlaces } from './destinations/tulum'
import { comingSoonDestinations } from './destinations/coming-soon'
import { saoPauloDestination, saoPauloPlaces, saoPauloReadyMadeItinerary } from './destinations/sao-paulo'
import { playaDelCarmenDestination, playaDelCarmenPlaces } from './destinations/playa-del-carmen'
import { buenosAiresDestination, buenosAiresPlaces, buenosAiresReadyMadeItinerary } from './destinations/buenos-aires'
import type { Destination, Place, Guide, Itinerary } from '@/types'
import { archiveGuides, archivePhotos } from './archive'
export { archivePhotos, archiveStats } from './archive'

export { mediaMoments, getMediaMomentsByDestination } from './media'

export const destinations: Destination[] = [mexicoCityDestination, rioDeJaneiroDestination, cartagenaDestination, guadalajaraDestination, tulumDestination, saoPauloDestination, playaDelCarmenDestination, buenosAiresDestination, ...comingSoonDestinations]
export const places: Place[] = [...cdmxPlaces, ...rioPlaces, ...cartagenaPlaces, ...guadalajaraPlaces, ...tulumPlaces, ...saoPauloPlaces, ...playaDelCarmenPlaces, ...buenosAiresPlaces]
const originalGuides: Guide[] = [...cdmxGuides, ...rioGuides, ...cartagenaGuides, ...guadalajaraGuides]
export const guides: Guide[] = [...originalGuides.filter(g => !archiveGuides.some(a => a.id === g.id)), ...archiveGuides, ...rioPhotoGuides, ...railGuideRecords as Guide[]]
for (const guide of guides) {
  const dest = destinations.find(d => d.id === guide.destinationId)
  const original = originalGuides.find(g => g.id === guide.id)
  const photo = guide.photos?.[0]
  guide.heroPhoto = photo?.src || original?.heroPhoto || dest?.heroPhoto
  guide.photoCaption = photo?.caption || (guide.heroPhoto ? `${dest?.city} · destination context` : undefined)
  if (dest && !dest.guideIds.includes(guide.id)) dest.guideIds.push(guide.id)
  for (const id of guide.placeIds) {
    const place = places.find(p => p.id === id)
    if (place) place.relatedGuideIds = [...new Set([...(place.relatedGuideIds || []), guide.id])]
  }
}
const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
for (const place of places.filter(p => p.city === 'Cartagena' && !p.photos.length)) {
  const name = normalize(place.name.split(' (')[0])
  const photo = archivePhotos.find(p => name.length > 5 && normalize(p.caption).includes(name))
  if (photo) place.photos = [photo.src]
}
const cartagenaHero = archivePhotos.find(p => p.caption.includes('Torre del Reloj'))
if (cartagenaHero) destinations.find(d => d.id === 'cartagena')!.heroPhoto = cartagenaHero.src
export const itineraries: Itinerary[] = [cdmxReadyMadeItinerary, rioReadyMadeItinerary, cartagenaReadyMadeItinerary, saoPauloReadyMadeItinerary, buenosAiresReadyMadeItinerary]

export const flagshipDestination = mexicoCityDestination
export function getPlacePhoto(place: Place) {
  const dest = getDestinationForPlace(place)
  return { src: place.photos[0] || dest?.heroPhoto, caption: place.photos[0] ? place.name : `${place.city} · destination context` }
}

export function getDestinationBySlug(slug: string) {
  return destinations.find((d) => d.slug === slug)
}
export function getDestinationById(id: string) {
  return destinations.find((d) => d.id === id)
}
/** A Place doesn't carry a destinationId directly (it's identified by
 *  city/country, same as the rest of the content model) — this resolves
 *  the Destination a Place belongs to, for wiring "Add to Trip" and similar
 *  cross-cutting actions from anywhere a Place is rendered. */
export function getDestinationForPlace(place: Place) {
  return destinations.find((d) => d.city === place.city)
}
export function getPlace(id: string) {
  return places.find((p) => p.id === id)
}
export function getPlacesByIds(ids: string[]) {
  return ids.map(getPlace).filter((p): p is Place => !!p)
}
export function getGuide(id: string) {
  return guides.find((g) => g.id === id)
}
export function getGuidesByIds(ids: string[]) {
  return ids.map(getGuide).filter((g): g is Guide => !!g)
}
export function getItinerary(id: string) {
  return itineraries.find((i) => i.id === id)
}
export function getJetSetPicks(destinationId?: string) {
  return places.filter((p) => p.isJetSetPick && (!destinationId || p.city === destinations.find(d=>d.id===destinationId)?.city))
}
export function getPlacesByDestination(destinationId: string) {
  const dest = destinations.find((d) => d.id === destinationId)
  if (!dest) return []
  return getPlacesByIds(dest.placeIds)
}
export function getGuidesByDestination(destinationId: string) {
  const dest = destinations.find((d) => d.id === destinationId)
  if (!dest) return []
  return getGuidesByIds(dest.guideIds)
}

// Firsthand theater portraits stay in the editorial diary; utility cards keep architecture context.
const theater = places.find(p => p.id === 'pl-theatro-municipal')!
theater.relatedGuideIds = [...new Set([...(theater.relatedGuideIds || []), 'wp-2135'])]
const cultureGuide = guides.find(g => g.id === 'wp-2135')!
if (!cultureGuide.placeIds.includes(theater.id)) cultureGuide.placeIds.push(theater.id)
for (const id of ['wp-2135','gd-rio-etiquette-nightlife']) { const g = guides.find(g=>g.id===id)!; g.relatedGuideIds = [...new Set([...(g.relatedGuideIds||[]),'rio-centro-2025','rio-carnival-2025'])] }
if (!rioDeJaneiroDestination.neighborhoods.some(n => n.name === 'Centro')) rioDeJaneiroDestination.neighborhoods.push({id:'nb-rio-centro',name:'Centro',city:'Rio de Janeiro',description:'Theatro Municipal anchors this part of the Rio culture archive. Open Centro in Details for firsthand portraits from Cinelândia and a separate historic café sequence.',heroPhoto:rio2025[0].src})

for (const g of railGuideRecords) if (!playaDelCarmenDestination.guideIds.includes(g.id)) playaDelCarmenDestination.guideIds.push(g.id)
