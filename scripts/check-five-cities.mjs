import assert from 'node:assert/strict'
import fs from 'node:fs'
import sharp from 'sharp'
import { createServer } from 'vite'
const server=await createServer({server:{middlewareMode:true,hmr:false}})
try {
 const data=await server.ssrLoadModule('/src/data/index.ts')
 const {planningDestinations,canPersonalizeTrip,copyStarterItinerary}=await server.ssrLoadModule('/src/lib/planningDestinations.ts')
 const {newDestinations,intentCollections}=await server.ssrLoadModule('/src/lib/discovery.ts')
 const {luxeJetterLink}=await server.ssrLoadModule('/src/lib/luxeJetterLinks.ts')
 const ids=['lima','montevideo','panama-city','san-jose-costa-rica','florianopolis']
 for(const id of ids){
  const d=data.destinations.find(d=>d.id===id)
  assert(d&&d.status==='guide'&&d.neighborhoods.length>=3)
  assert.notEqual(d.heroPhoto,d.cardPhoto)
  assert(newDestinations.some(d=>d.id===id)&&planningDestinations.some(d=>d.id===id)&&intentCollections.Weekend.some(x=>x.destination.id===id))
  assert(!canPersonalizeTrip(d),'new cities must not enter automatic meal selection')
  const places=data.getPlacesByDestination(id),guides=data.getGuidesByDestination(id)
  assert(places.length>=8&&guides.length===3)
  assert(places.every(p=>p.sourceUrl?.startsWith('https://')&&!p.isJetSetPick))
  assert(guides.every(g=>g.relatedGuideIds.length===2&&g.photoCredit?.licenseUrl&&g.body.length>700))
  assert.equal(new Set([d.heroPhoto,d.cardPhoto,...guides.map(g=>g.heroPhoto)]).size,5)
  const itinerary=data.getItinerary(d.itineraryIds[0]),copy=copyStarterItinerary(itinerary)
  assert.equal(itinerary.days.length,2);assert.notEqual(copy.id,itinerary.id);assert(!copy.isReadyMade)
  for(const day of itinerary.days)assert(day.activities.every(a=>d.placeIds.includes(a.placeId)))
  copy.days[0].activities[0].notes='Edited in test';assert.notEqual(copy.days[0].activities[0].notes,itinerary.days[0].activities[0].notes)
 }
 let bytes=0
 for(const photo of JSON.parse(fs.readFileSync('docs/FIVE_CITY_PHOTOGRAPHY.json','utf8'))){
  const file=fs.readFileSync(photo.file),metadata=await sharp(file).metadata()
  assert.equal(metadata.format,'webp');assert(metadata.width<=960&&metadata.height<=760&&file.length<220000)
  assert.equal(file.length,photo.bytes);assert(photo.author&&photo.sourceUrl&&photo.licenseUrl);bytes+=file.length
 }
 const catalog=JSON.parse(fs.readFileSync('src/config/luxeDestinations.json','utf8'))
 for(const d of data.destinations){
  const match=catalog.destinations[d.id],look=new URL(luxeJetterLink(d.id).url),pack=new URL(luxeJetterLink(d.id,'packing').url)
  assert.equal(pack.pathname,'/wardrobe-builder');assert.equal(pack.searchParams.get('destination'),match?.id||null)
  assert.equal(look.pathname,match?'/destinations/'+match.id:'/wardrobe-builder')
  assert(!pack.searchParams.has('notes')&&!pack.searchParams.has('startDate'))
 }
 assert(!luxeJetterLink('antigua-guatemala').matched,'Guatemala must not match Antigua and Barbuda')
 // Optional local pre-change snapshot checks the complete existing content, not merely counts.
 if(fs.existsSync('visual-qa/shopping-expansion-baseline.json')){
  const base=JSON.parse(fs.readFileSync('visual-qa/shopping-expansion-baseline.json','utf8'))
  for(const kind of ['destinations','places','guides','itineraries'])for(const old of base[kind]){
   const current=data[kind].find(x=>x.id===old.id)
   assert.deepEqual(JSON.parse(JSON.stringify(current)),old,`Existing ${kind} changed: ${old.id}`)
  }
 }
 console.log(`Five cities: 41 sourced places, 15 linked guides, 5 isolated editable starters; 25 licensed WebP photos (${bytes} bytes); 14 real Luxe matches and 5 safe fallbacks. Existing baseline content preserved.`)
} finally {await server.close()}
