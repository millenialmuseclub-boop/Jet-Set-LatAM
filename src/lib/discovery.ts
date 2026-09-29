import { destinations, getPlacesByDestination, getGuidesByDestination } from '@/data'
import { editorialLinks } from '@/data/editorial-links'
import { isFirstVisitGuide, guidesForSection } from './destinationReading'
import type { Destination, Neighborhood, Place } from '@/types'

export const discoveryIntents = ['Eat', 'Beach', 'Culture', 'Style', 'Nightlife', 'Nature', 'Weekend', 'First Trip', 'Romantic'] as const
export type DiscoveryIntent = typeof discoveryIntents[number]
const categories: Record<DiscoveryIntent, Place['category'][]> = {
  Eat: ['restaurant', 'cafe'], Beach: ['beach'], Culture: ['museum', 'landmark'],
  Style: ['shop'], Nightlife: ['bar', 'nightlife'], Nature: ['park', 'experience'], Weekend: [], 'First Trip': [], Romantic: [],
}
const natureTags = /nature|hiking|trail|garden|outdoor|mountain|waterfall/i
export function matchesIntent(place: Place, intent: DiscoveryIntent) {
  if (['Weekend','First Trip','Romantic'].includes(intent)) return place.category !== 'hotel'
  if (intent === 'Nature') return place.category === 'park' || natureTags.test(place.tags.join(' '))
  return categories[intent].includes(place.category)
}
// Build the small curated index once, rather than scanning the library each render.
const available = destinations.filter(d => d.status !== 'coming-soon' && d.heroPhoto)
export const intentCollections = Object.fromEntries(discoveryIntents.map(intent => [intent,
  available.map(destination => ({ destination, places: getPlacesByDestination(destination.id).filter(p => matchesIntent(p, intent)) }))
    .filter(item => intent === 'Weekend' ? item.destination.itineraryIds.length > 0 : intent === 'First Trip' ? getGuidesByDestination(item.destination.id).some(isFirstVisitGuide) : intent === 'Romantic' ? getGuidesByDestination(item.destination.id).some(g=>/honeymoon|romantic getaway/i.test(g.title)) : item.places.length > 0 || (intent==='Eat'||intent==='Style') && (guidesForSection(getGuidesByDestination(item.destination.id),intent==='Eat'?'eat':'shop').length>0||editorialLinks.some(g=>g.destinationId===item.destination.id&&g.section===(intent==='Eat'?'eat':'shop'))))
    .sort((a, b) => b.places.length - a.places.length),
])) as Record<DiscoveryIntent, { destination: Destination; places: Place[] }[]>
const newIds = ['merida','arequipa','valparaiso','salvador','mendoza','punta-del-este','bocas-del-toro','quito', 'cusco', 'havana', 'lima', 'montevideo', 'panama-city', 'san-jose-costa-rica', 'florianopolis', 'san-juan', 'antigua-guatemala', 'santiago', 'medellin', 'bogota', 'oaxaca']
export const newDestinations = newIds.flatMap(id => available.filter(d => d.id === id))
export const intentTab: Record<DiscoveryIntent, string> = { Eat: 'eat', Beach: 'experiences', Culture: 'see', Style: 'shop', Nightlife: 'drink', Nature: 'experiences', Weekend: 'overview', 'First Trip':'overview', Romantic:'overview' }
export const normalizeArea = (name: string) => name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
export function neighborhoodPlaces(neighborhood: Neighborhood, places: Place[]) {
  // Match documented parent/child names, not unrelated city-wide proximity.
  const names = normalizeArea(neighborhood.name).split(/[(),/&]/).map(s => s.trim()).filter(Boolean)
  return places.filter(p => p.neighborhood && names.some(name => normalizeArea(p.neighborhood!).split(/[(),/&]/).some(area => area.trim() === name)))
}
export function relatedDestinations(destination: Destination) {
  const ownCategories = new Set(getPlacesByDestination(destination.id).map(p => p.category))
  const connections = [['cusco','lima'],['mendoza','buenos-aires'],['punta-del-este','montevideo'],['salvador','rio-de-janeiro'],['bocas-del-toro','panama-city'],['lima','santiago'],['montevideo','buenos-aires'],['panama-city','cartagena'],['san-jose-costa-rica','antigua-guatemala'],['florianopolis','rio-de-janeiro']]
  return available.filter(d => d.id !== destination.id).map(d => ({ destination: d,
    score: (connections.some(pair=>pair.includes(destination.id)&&pair.includes(d.id)) ? 5 : 0) + (d.country === destination.country ? 3 : 0) + new Set(getPlacesByDestination(d.id).filter(p => ownCategories.has(p.category)).map(p => p.category)).size,
  })).sort((a, b) => b.score - a.score).slice(0, 3).map(item => item.destination)
}
