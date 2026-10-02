import assert from 'node:assert/strict'
import { createServer } from 'vite'
const server = await createServer({server:{middlewareMode:true}})
try {
  const { guides, destinations, getGuidesByDestination } = await server.ssrLoadModule('/src/data/index.ts')
  const { guideGeography } = await server.ssrLoadModule('/src/lib/guideGeography.ts')
  const { publishedGuideSection } = await server.ssrLoadModule('/src/lib/guideTopics.ts')
  const { internalArticleLink } = await server.ssrLoadModule('/src/lib/articleLinks.ts')
  assert.equal(internalArticleLink('https://thebrunchmanifesto.blog/rio-de-janeiro/'),'/destinations/rio-de-janeiro')
  assert.equal(internalArticleLink('https://thebrunchmanifesto.blog/costa-rica/'),'/explore?country=Costa%20Rica')
  assert.equal(internalArticleLink('https://thebrunchmanifesto.blog/rio-de-janeiro/?affiliate=original'),undefined)
  assert.equal(internalArticleLink('https://another.example/rio-de-janeiro/'),undefined)
  assert.equal(publishedGuideSection('Costa Rica’s Rewilding Retreats'),'stay')
  assert.equal(publishedGuideSection('Best Time to Visit: Weather and Seasons'),'experiences')
  assert.equal(publishedGuideSection('What to Eat in Bogotá'),'eat')
  assert.equal(publishedGuideSection('Mountain Biking in Colombia: Coffee Country Trails'),'experiences')
  assert.equal(publishedGuideSection('Ipanema Shopping Guide: Brazilian Resort Wear'),'shop')
  const classify = title => guideGeography({title,destinationId:'',relatedDestinationIds:[]},destinations)
  assert(classify('Ipanema Shopping Guide').destinationIds.includes('rio-de-janeiro'))
  assert(classify('Antigua Shopping Guide').destinationIds.includes('antigua-guatemala'))
  assert.deepEqual(classify('Monteverde, Costa Rica: A Cloud Forest Guide').countries,['Costa Rica'])
  assert.equal(classify('Monteverde, Costa Rica: A Cloud Forest Guide').location,'Monteverde')
  assert.deepEqual(classify('Where to Stay in Punta Cana').countries,['Dominican Republic'])
  assert.deepEqual(classify('Patagonia, Chile: Luxury Adventure').countries,['Chile'])
  assert.equal(classify('Shopping in Lima and Bogotá').destinationIds.length,2)
  assert(classify('Paraty and Trancoso: Brazil’s Emerald Coast').locations.includes('Paraty'))
  assert(classify('Paraty and Trancoso: Brazil’s Emerald Coast').locations.includes('Trancoso'))
  assert.deepEqual(classify('Brazilian Fashion').destinationIds,[], 'Country articles must not be assigned to an arbitrary city')
  assert(!classify('Puerto Vallarta').countries.includes('Puerto Rico'))
  assert(!classify('Amazon & Rio Negro Yacht Expeditions').destinationIds.includes('rio-de-janeiro'))
  assert(!getGuidesByDestination('rio-de-janeiro').some(g=>g.id==='wp-2114'))
  for (const guide of guides) {
    for (const id of new Set([guide.destinationId,...(guide.relatedDestinationIds||[])].filter(Boolean))) {
      assert(getGuidesByDestination(id).some(g=>g.id===guide.id),`${guide.id}: missing from ${id}`)
    }
    assert(guide.storyLocation,`${guide.id}: missing location label`)
  }
  const regional = guides.find(g=>g.id==='wp-900180')
  assert.equal(regional.storyLocation,'Monteverde')
  assert(!regional.heroPhoto,'Monteverde must not show unrelated city photography')
  console.log(`Journal organization: ${guides.length} stories, ${new Set(guides.flatMap(g=>g.countries||[])).size} countries; city aliases, multi-city backlinks and regional photography passed.`)
} finally {await server.close()}
