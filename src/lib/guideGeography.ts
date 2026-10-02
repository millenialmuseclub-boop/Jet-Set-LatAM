import type { Destination, Guide } from '@/types'

const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const contains = (text: string, name: string) => new RegExp(`(^|[^a-z])${normalize(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`).test(text)
const cityAliases: Record<string, string[]> = {
  'mexico-city': ['CDMX'], 'rio-de-janeiro': ['Rio', 'Ipanema', 'Copacabana'],
  oaxaca: ['Oaxaca'], 'antigua-guatemala': ['Antigua'], 'panama-city': ['Panama Canal'],
}
const countryAliases: Record<string, string[]> = {
  Mexico: ['Mexico', 'Mexican', 'Riviera Maya', 'Baja California', 'Chepe Express'],
  Brazil: ['Brazil', 'Brazilian', 'Brasil', 'Bahia'], Colombia: ['Colombia', 'Colombian'],
  Argentina: ['Argentina', 'Argentine', 'Argentinian'], Uruguay: ['Uruguay', 'Uruguayan'],
  Chile: ['Chile', 'Chilean'], Peru: ['Peru', 'Peruvian', 'Sacred Valley', 'Machu Picchu'],
  Ecuador: ['Ecuador', 'Ecuadorian', 'Galapagos'], 'Costa Rica': ['Costa Rica', 'Costa Rican'],
  Guatemala: ['Guatemala', 'Guatemalan'], Panama: ['Panama', 'Panamanian', 'Guna Yala', 'San Blas'],
  'Puerto Rico': ['Puerto Rico', 'Puerto Rican'], Cuba: ['Cuba', 'Cuban'],
  'Dominican Republic': ['Dominican Republic', 'Dominican'], Nicaragua: ['Nicaragua', 'Nicaraguan'],
  Bolivia: ['Bolivia', 'Bolivian'], Paraguay: ['Paraguay', 'Paraguayan'], Dominica: ['Dominica'],
}
// Reading destinations have published articles, but do not imply a new planner or city guide.
const readingLocations: [string, string[], string[]][] = [
  ['Monteverde', ['Monteverde'], ['Costa Rica']], ['Arenal & La Fortuna', ['Arenal', 'La Fortuna'], ['Costa Rica']],
  ['Nicoya Peninsula', ['Nicoya'], ['Costa Rica']], ['Patagonia', ['Patagonia'], ['Argentina', 'Chile']],
  ['Torres del Paine', ['Torres del Paine'], ['Chile']], ['El Calafate', ['El Calafate'], ['Argentina']],
  ['El Chaltén', ['El Chalten'], ['Argentina']], ['Galápagos', ['Galapagos', 'Kicker Rock'], ['Ecuador']],
  ['Sacred Valley & Machu Picchu', ['Sacred Valley', 'Machu Picchu', 'Pisac', 'Ollantaytambo'], ['Peru']],
  ['Punta Cana', ['Punta Cana', 'Bavaro', 'Saona Island'], ['Dominican Republic']],
  ['Puerto Vallarta', ['Puerto Vallarta'], ['Mexico']], ['Cancún', ['Cancun', 'Costa Mujeres'], ['Mexico']],
  ['Riviera Maya', ['Riviera Maya'], ['Mexico']], ['Paraty', ['Paraty', 'Costa Verde'], ['Brazil']],
  ['Trancoso', ['Trancoso'], ['Brazil']], ['Caraíva', ['Caraiva'], ['Brazil']],
  ['Boquete', ['Boquete'], ['Panama']], ['Guna Yala', ['Guna Yala', 'San Blas'], ['Panama']],
  ['Recife', ['Recife', 'Pernambuco'], ['Brazil']], ['Puerto Varas', ['Puerto Varas'], ['Chile']],
  ['Cali', ['Cali'], ['Colombia']], ['Tepoztlán', ['Tepoztlan'], ['Mexico']],
  ['José Ignacio', ['Jose Ignacio'], ['Uruguay']], ['Colonia del Sacramento', ['Colonia del Sacramento'], ['Uruguay']],
  ['Jericoacoara', ['Jericoacoara'], ['Brazil']], ['Iguazú Falls', ['Iguazu'], ['Argentina', 'Brazil']],
  ['Pantanal', ['Pantanal'], ['Brazil']], ['San Andrés', ['San Andres'], ['Colombia']],
  ['Brazilian Amazon', ['Amazon', 'Rio Negro', 'Manaus'], ['Brazil']],
  ['Monterrey', ['Monterrey'], ['Mexico']], ['Ixtapa', ['Ixtapa'], ['Mexico']],
  ['Copper Canyon', ['Copper Canyon', 'Chepe Express'], ['Mexico']], ['León', ['Leon'], ['Nicaragua']],
]

export function guideGeography(guide: Guide, destinations: Destination[]) {
  const title = normalize(guide.title)
  const cityTitle = title.replace(/\brio negro\b|\brio grande\b/g,'')
  const named = destinations.filter(d => d.status !== 'coming-soon' && [d.city, d.id.replaceAll('-', ' '), ...(cityAliases[d.id] || [])].some(name => contains(cityTitle, name)))
  const destinationIds = [...new Set([guide.destinationId, ...(guide.relatedDestinationIds || []), ...named.map(d => d.id)].filter(id => destinations.some(d => d.id === id && d.status !== 'coming-soon')))]
  const locations = readingLocations.filter(([, aliases]) => aliases.some(name => contains(title, name)))
  const namedCountries = Object.entries(countryAliases).filter(([, aliases]) => aliases.some(name => contains(title, name))).map(([country]) => country)
  const countries = [...new Set([
    ...destinationIds.map(id => destinations.find(d => d.id === id)!.country),
    ...namedCountries,
    ...locations.flatMap(([, , countries]) => countries.filter(country => !namedCountries.length || namedCountries.includes(country))),
  ])]
  const location = destinations.find(d => d.id === guide.destinationId)?.city || named[0]?.city || locations[0]?.[0] || (countries.length === 1 ? countries[0] : 'Latin America')
  return { destinationIds, countries, location, locations: [...new Set([location,...named.map(d=>d.city),...locations.map(([name])=>name)])] }
}
