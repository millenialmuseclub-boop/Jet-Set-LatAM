import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createServer} from 'vite'
import sharp from 'sharp'
const server=await createServer({server:{middlewareMode:true}})
try {
  const data=await server.ssrLoadModule('/src/data/index.ts')
  const planning=await server.ssrLoadModule('/src/lib/planningDestinations.ts')
  const {planningGuides}=await server.ssrLoadModule('/src/data/planning-guides.ts')
  const {expansionCityGuides,expansionDestinations}=await server.ssrLoadModule('/src/data/destinations/expansion.ts')
  assert.equal(planning.planningDestinations.length,data.destinations.length,'All destinations need a visible planning entry')
  for(const id of ['guadalajara','tulum','playa-del-carmen','oaxaca']) {
    const destination=data.getDestinationById(id),template=planning.starterItinerary(destination)
    assert(template?.days.length,`${id}: missing starter trip`)
    assert(!planning.canPersonalizeTrip(destination),'Short guides must retain their existing planning mode')
    const before=JSON.stringify(template),copy=planning.copyStarterItinerary(template)
    assert.notEqual(copy.id,template.id)
    copy.days[0].activities[0].label='Edited test trip'
    assert.equal(JSON.stringify(template),before,'Editing a starter copy must not alter the shared trip')
  }
  let contextual=0
  for(const destination of data.destinations) {
    const local=data.getPlacesByDestination(destination.id)
    const fallbacks=local.map(data.getPlacePhoto).filter(photo=>photo.context)
    contextual+=fallbacks.length
    for(const photo of fallbacks) {
      assert(photo.src && photo.src!==destination.heroPhoto,`${destination.id}: hero repeated in fallback`)
      assert(photo.caption.startsWith('City context ·'),'Context must not imply a named venue photo')
    }
    if(fallbacks.length>1)assert(new Set(fallbacks.map(p=>p.src)).size>1,`${destination.id}: repeated fallback everywhere`)
  }
  const baPicks=data.getJetSetPicks('buenos-aires').map(data.getPlacePhoto)
  assert.equal(new Set(baPicks.map(p=>p.src)).size,baPicks.length,'Buenos Aires featured picks must have distinct images')
  for(const guide of [...planningGuides,...expansionCityGuides]) {
    assert(guide.body.split(/\s+/).length>=140,`${guide.id}: thin article`)
    assert(guide.photoCredit?.sourceUrl && guide.photoCredit?.licenseUrl,`${guide.id}: missing photo attribution`)
    assert(guide.placeIds.length>=3 && guide.relatedGuideIds.length>=2,`${guide.id}: missing useful cross-links`)
    assert(guide.sourceUrl.startsWith('https://'))
  }
  for(const d of expansionDestinations) {
    assert.equal(d.placeIds.length,12)
    assert.notEqual(d.heroPhoto,d.cardPhoto)
    assert(d.neighborhoods.length>=3)
    assert(d.guideIds.every(id=>data.getGuide(id)))
  }
  let imageBytes=0
  for(const photo of JSON.parse(readFileSync('docs/EXPANSION_PHOTOGRAPHY.json','utf8')).photos) {
    const buffer=readFileSync(photo.file),meta=await sharp(buffer).metadata()
    assert.equal(meta.format,'webp');assert(meta.width<=1000&&meta.height<=800)
    assert(buffer.length<150000 && buffer.length===photo.bytes)
    assert(/^CC BY/.test(photo.license)&&photo.licenseUrl.startsWith('https://creativecommons.org/'))
    imageBytes+=buffer.length
  }
  console.log(`Expansion: ${expansionDestinations.length} complete cities, ${planningGuides.length+expansionCityGuides.length} sourced articles, ${contextual} varied context-photo assignments, all ${planning.planningDestinations.length} cities reachable from Plan. New photos: ${imageBytes} bytes.`)
} finally {await server.close()}
