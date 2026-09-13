import assert from 'node:assert/strict'
import { createServer } from 'vite'
const server = await createServer({ server: { middlewareMode: true } })
try {
  const data = await server.ssrLoadModule('/src/data/index.ts')
  const { generateItinerary, REPEATABLE_CATEGORIES } = await server.ssrLoadModule('/src/lib/planner.ts')
  await server.ssrLoadModule('/scripts/data_integrity_check.mjs')
  assert(data.guides.length >= 50, 'Expected substantial archive coverage')
  assert(data.archivePhotos.length >= 20, 'Expected authentic photo collection')
  for (const d of data.destinations) assert(data.getGuidesByDestination(d.id).length >= 3, `${d.city}: missing journal depth`)
  for (const guide of data.guides) {
    assert(guide.body.trim(), `${guide.id}: empty article`)
    assert(!/oplus_\d/.test(guide.dek), `${guide.id}: camera metadata in intro`)
    for (const id of guide.relatedGuideIds || []) assert(data.getGuide(id), `${guide.id}: broken related story`)
    for (const id of guide.placeIds) assert(data.getPlace(id)?.relatedGuideIds?.includes(guide.id), `${guide.id}: missing place backlink`)
  }
  let cases = 0
  for (const d of data.destinations.filter(d => d.status === 'live')) {
    for (const days of [3,4,5,7]) for (const pace of ['slow','balanced','pack-it-in']) for (const interests of [['food'],['culture'],['shopping','nightlife']]) {
      const result = generateItinerary({destinationId:d.id,days,pace,interests,companions:'solo',style:'comfortable'})
      assert.equal(result.days.length, days)
      const visited = new Set()
      for (const day of result.days) {
        const today = new Set()
        for (const a of day.activities) {
          if (!a.placeId) continue
          const place = data.getPlace(a.placeId)
          assert(place, 'Unknown generated place')
          assert(!today.has(place.id), 'Duplicate place in one day')
          assert(!visited.has(place.id) || REPEATABLE_CATEGORIES.has(place.category), 'One-time attraction repeated')
          if (['Breakfast','Lunch','Dinner'].includes(a.label)) assert(['cafe','restaurant'].includes(place.category), 'Non-food place in meal slot')
          today.add(place.id);visited.add(place.id)
        }
      }
      cases++
    }
  }
  console.log(`Archive links and ${cases} planner scenarios passed.`)
} finally { await server.close() }
