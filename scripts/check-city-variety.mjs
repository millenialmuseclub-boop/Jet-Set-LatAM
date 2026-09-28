import assert from 'node:assert/strict'
import fs from 'node:fs'
import sharp from 'sharp'
import {createServer} from 'vite'
const server=await createServer({server:{middlewareMode:true,hmr:false}})
try {
 const data=await server.ssrLoadModule('/src/data/index.ts')
 const photography=await server.ssrLoadModule('/src/lib/destinationPhotography.ts')
 const reading=await server.ssrLoadModule('/src/lib/destinationReading.ts')
 const {editorialLinks}=await server.ssrLoadModule('/src/data/editorial-links.ts')
 const planning=await server.ssrLoadModule('/src/lib/planningDestinations.ts')
 const added=['quito','cusco','havana','salvador','mendoza','punta-del-este','bocas-del-toro']
 assert.equal(data.destinations.length,26);assert.equal(data.guides.length,159)
 const audit=[]
 for(const d of data.destinations){
  const guides=data.getGuidesByDestination(d.id),places=data.getPlacesByDestination(d.id)
  const atlas=photography.destinationCardPhoto(d),plan=photography.destinationCardPhoto(d,'plan'),related=photography.destinationCardPhoto(d,'related')
  assert.equal(new Set([d.heroPhoto,atlas.src,plan.src,related.src]).size,4,d.id+': repeated primary card photo')
  const overview=photography.destinationOverviewStories(d,reading.distinctStories(guides))
  assert(overview.slice(0,2).every(g=>g.heroPhoto!==d.heroPhoto),d.id+': hero repeated in first stories')
  assert.equal(new Set(guides.map(g=>g.heroPhoto)).size,guides.length)
  assert(planning.planningDestinations.some(p=>p.id===d.id))
  const sections=Object.fromEntries(['stay','eat','experiences','shop'].map(section=>[section,{guides:reading.guidesForSection(guides,section).length,published:editorialLinks.filter(a=>a.destinationId===d.id&&a.section===section).length}]))
  const used=new Set(),webPhotos=editorialLinks.filter(a=>a.destinationId===d.id).map(a=>photography.websiteReadingPhoto(d,a.section,used).src)
  assert.equal(new Set(webPhotos).size,webPhotos.length,d.id+': duplicate website reading photos')
  const visible=new Set(guides.slice(0,6).map(g=>g.heroPhoto).filter(Boolean))
  const combined=new Set(visible)
  for(const a of editorialLinks.filter(a=>a.destinationId===d.id)){const p=photography.websiteReadingPhoto(d,a.section,combined);assert(!visible.has(p.src),d.id+': website photo repeated in visible Journal');visible.add(p.src)}
  if(added.includes(d.id)){
   assert.equal(d.status,'guide');assert(!planning.canPersonalizeTrip(d));assert.equal(guides.length,3);assert.equal(places.length,8)
   assert(places.every(p=>p.sourceUrl?.startsWith('https://')&&!p.coordinates&&!p.isJetSetPick))
   const itinerary=data.getItinerary(d.itineraryIds[0]),copy=planning.copyStarterItinerary(itinerary)
   assert.equal(itinerary.days.length,2);assert.notEqual(copy.id,itinerary.id)
   copy.days[0].activities[0].notes='Test';assert.notEqual(copy.days[0].activities[0].notes,itinerary.days[0].activities[0].notes)
   assert(guides.every(g=>g.photoCredit?.sourceUrl&&g.relatedGuideIds.length===2))
  }
  audit.push({id:d.id,city:d.city,places:places.length,journal:guides.length,sections,primaryPhotos:[d.heroPhoto,atlas.src,plan.src,related.src],distinctJournalCovers:new Set(guides.map(g=>g.heroPhoto)).size,neighborhoods:d.neighborhoods.length})
 }
 const photos=JSON.parse(fs.readFileSync('docs/NEXT_CITIES_PHOTOGRAPHY.json'))
 for(const p of photos){const b=fs.readFileSync(p.file),m=await sharp(b).metadata();assert.equal(m.format,'webp');assert(m.width<=960&&m.height<=760&&b.length<160000);assert.equal(b.length,p.bytes);assert(p.author&&p.licenseUrl)}
 const baselinePath='visual-qa/next-cities-baseline.json'
 if(fs.existsSync(baselinePath)){
  const baseline=JSON.parse(fs.readFileSync(baselinePath))
  for(const kind of ['destinations','places','guides','itineraries'])for(const old of baseline[kind]){
   const actual=JSON.parse(JSON.stringify(data[kind].find(x=>x.id===old.id)))
   if(kind==='destinations'&&old.id==='buenos-aires'){
    assert(actual.heroPhoto.includes('next-cities/buenos-aires-0'));assert.equal(actual.photoCredits.length,old.photoCredits.length+1)
    actual.heroPhoto=old.heroPhoto;actual.photoCredits=actual.photoCredits.filter(c=>!c.photo.includes('next-cities/buenos-aires-0'))
   }
   if(kind==='destinations'&&["guadalajara","tulum","san-juan","antigua-guatemala","santiago"].includes(old.id)){const additions=photos.filter(p=>p.city===old.id&&p.key.includes('extra'));assert.equal(actual.photoCredits.length,old.photoCredits.length+additions.length);actual.photoCredits=actual.photoCredits.filter(c=>!additions.some(p=>c.photo.endsWith('/next-cities/'+p.key+'.webp')))}
   assert.deepEqual(actual,old,`Existing ${kind} changed: ${old.id}`)
  }
 }
 const cusco=data.getGuide('wp-2149').body
 assert(!/higher elevations like Machu Picchu|Coca tea is a local remedy/.test(cusco))
 fs.mkdirSync('visual-qa',{recursive:true});fs.writeFileSync('visual-qa/26-city-audit.json',JSON.stringify(audit,null,2))
 const urls=[...new Set([...editorialLinks.map(a=>a.url),...added.flatMap(id=>[...data.getGuidesByDestination(id).map(g=>g.sourceUrl),...data.getPlacesByDestination(id).map(p=>p.sourceUrl)])])]
 fs.writeFileSync('visual-qa/next-city-links.json',JSON.stringify(urls,null,2))
 console.log(`26 cities: four distinct primary photos each, unique Journal covers, all available in Plan. Original 19 cities preserved except the approved Buenos Aires hero. Seven cities, 56 places, 21 stories, 7 isolated starters; ${photos.length} WebP photos (${photos.reduce((n,p)=>n+p.bytes,0)} bytes).`)
}finally{await server.close()}
