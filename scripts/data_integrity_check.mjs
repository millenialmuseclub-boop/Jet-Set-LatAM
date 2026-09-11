import { destinations, places, guides, itineraries } from '../src/data/index.ts'

let errors = []

// Duplicate place IDs
const placeIds = places.map(p => p.id)
const dupPlaceIds = placeIds.filter((id, i) => placeIds.indexOf(id) !== i)
if (dupPlaceIds.length) errors.push(`Duplicate place IDs: ${[...new Set(dupPlaceIds)].join(', ')}`)

// Duplicate destination IDs
const destIds = destinations.map(d => d.id)
const dupDestIds = destIds.filter((id, i) => destIds.indexOf(id) !== i)
if (dupDestIds.length) errors.push(`Duplicate destination IDs: ${[...new Set(dupDestIds)].join(', ')}`)

// Every destination.placeIds must resolve to a real place
for (const d of destinations) {
  for (const pid of d.placeIds) {
    if (!placeIds.includes(pid)) errors.push(`${d.id}: placeIds references missing place ${pid}`)
  }
}

// Every itinerary activity placeId must resolve
for (const it of itineraries) {
  for (const day of it.days) {
    for (const act of day.activities) {
      if (act.placeId && !placeIds.includes(act.placeId)) {
        errors.push(`Itinerary ${it.id}: activity references missing place ${act.placeId}`)
      }
    }
  }
  if (!destIds.includes(it.destinationId)) errors.push(`Itinerary ${it.id}: unknown destinationId ${it.destinationId}`)
}

// Every destination.itineraryIds must resolve
const itIds = itineraries.map(i => i.id)
for (const d of destinations) {
  for (const iid of d.itineraryIds) {
    if (!itIds.includes(iid)) errors.push(`${d.id}: itineraryIds references missing itinerary ${iid}`)
  }
}

// live-status destinations should have heroPhoto or explicit empty
for (const d of destinations) {
  if (d.status === 'live' && d.placeIds.length < 6) {
    errors.push(`${d.id}: status is 'live' but only has ${d.placeIds.length} places (<6)`)
  }
}

// Jet Set Pick sanity: isJetSetPick true should have pickDetails
for (const p of places) {
  if (p.isJetSetPick && !p.pickDetails) errors.push(`${p.id}: isJetSetPick true but no pickDetails`)
}

console.log(`Destinations: ${destinations.length}, Places: ${places.length}, Guides: ${guides.length}, Itineraries: ${itineraries.length}`)
if (errors.length) {
  console.log(`\n${errors.length} ERROR(S):`)
  errors.forEach(e => console.log(' - ' + e))
  process.exit(1)
} else {
  console.log('\nNo data integrity errors found.')
}
