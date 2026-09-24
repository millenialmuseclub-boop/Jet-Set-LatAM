import assert from 'node:assert/strict'
import { createServer } from 'vite'
const server = await createServer({ server: { middlewareMode: true } })
try {
  const data = await server.ssrLoadModule('/src/data/index.ts')
  const discovery = await server.ssrLoadModule('/src/lib/discovery.ts')
  const { generateItinerary } = await server.ssrLoadModule('/src/lib/planner.ts')
  const before = JSON.stringify(data.destinations)
  for (const intent of discovery.discoveryIntents) {
    const entries = discovery.intentCollections[intent]
    assert(entries.length, `${intent} has relevant content`)
    assert.equal(new Set(entries.map(e => e.destination.id)).size, entries.length)
    for (const { destination, places } of entries) {
      assert.notEqual(destination.status, 'coming-soon')
      for (const p of places) {
        assert(destination.placeIds.includes(p.id))
        assert(discovery.matchesIntent(p, intent))
      }
    }
  }
  for (const destination of data.destinations.filter(d => d.status !== 'coming-soon')) {
    assert(!discovery.relatedDestinations(destination).some(d => d.id === destination.id))
    const places = data.getPlacesByDestination(destination.id)
    for (const neighborhood of destination.neighborhoods) {
      const local = discovery.neighborhoodPlaces(neighborhood, places)
      assert(local.every(p => places.some(candidate => candidate.id === p.id)))
    }
    if (destination.status !== 'live') continue
    const answers = { destinationId: destination.id, days: 2, companions: 'family', style: 'comfortable', pace: 'balanced', interests: ['culture', 'food'] }
    const trip = generateItinerary(answers)
    assert.equal(trip.days.length, 2)
    for (const day of trip.days) assert.deepEqual(day.activities.map(a => a.time), ['10:30', '13:00', '15:00', '19:30'])
  }
  const bogota = data.getDestinationById('bogota')
  const chapinero = bogota.neighborhoods.find(n => n.name.startsWith('Chapinero'))
  assert(discovery.neighborhoodPlaces(chapinero, [{ id: 'a', neighborhood: 'Zona G' }, { id: 'b', neighborhood: 'Zona T' }]).some(p => p.id === 'a'))
  assert(!discovery.neighborhoodPlaces({ name: 'Centro' }, [{ neighborhood: 'Centro Histórico' }]).length, 'No guessed neighborhood proximity')
  assert.equal(JSON.stringify(data.destinations), before, 'Selectors do not mutate content')
  console.log('Discovery: all seven intents, destination ownership, neighborhood relationships and two-day meal structure passed.')
} finally { await server.close() }
