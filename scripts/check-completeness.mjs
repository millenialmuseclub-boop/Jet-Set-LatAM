import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createServer} from 'vite'
const server=await createServer({server:{middlewareMode:true,hmr:false}})
try {
 const data=await server.ssrLoadModule('/src/data/index.ts')
 const reading=await server.ssrLoadModule('/src/lib/destinationReading.ts')
 const links=await server.ssrLoadModule('/src/lib/companionLinks.ts')
 const {intentCollections}=await server.ssrLoadModule('/src/lib/discovery.ts')
 const {editorialLinks}=await server.ssrLoadModule('/src/data/editorial-links.ts')
 const {shopmyEdits}=await server.ssrLoadModule('/src/data/shopmy.ts')
 const baseline=fs.existsSync('visual-qa/completeness-baseline.json')?JSON.parse(fs.readFileSync('visual-qa/completeness-baseline.json','utf8')):null
 const imported=JSON.parse(fs.readFileSync('docs/COMPLETENESS_ARTICLE_IMPORT.json','utf8')); const updatedIds=new Set(imported.map(g=>g.guideId))
 if(baseline)for(const key of ['destinations','places','itineraries'])assert.deepEqual(baseline[key].map(old=>{const current=JSON.parse(JSON.stringify(data[key].find(x=>x.id===old.id)));if(key==='destinations'&&old.id==='buenos-aires'){assert(current.heroPhoto.endsWith('/next-cities/buenos-aires-0.webp'));current.heroPhoto=old.heroPhoto;current.photoCredits=current.photoCredits.filter(p=>!p.photo.endsWith('/next-cities/buenos-aires-0.webp'))}if(key==='destinations'&&["guadalajara","tulum","san-juan","antigua-guatemala","santiago"].includes(old.id))current.photoCredits=current.photoCredits.filter(p=>!p.photo.includes('/next-cities/'+old.id+'-extra'));return current}),baseline[key],`${key}: original content changed`)
 if(baseline)for(const old of baseline.guides){const g=data.guides.find(o=>o.id===old.id);assert(g);if(!updatedIds.has(g.id))assert.deepEqual(JSON.parse(JSON.stringify(g)),old);else {for(const field of ['id','destinationId','placeIds','relatedGuideIds','heroPhoto','photoCredit'])assert.deepEqual(g[field],old[field]);assert(g.body.length>3000);assert(!g.editorialSource);}}
 assert.equal(imported.length,11);assert.equal(new Set(imported.map(g=>g.url)).size,11);assert.equal(data.guides.length,168);
 const {internalArticleLink,guideSourceLink}=await server.ssrLoadModule('/src/lib/articleLinks.ts');assert.equal(internalArticleLink(imported[0].url),'/guides/'+imported[0].guideId);assert.equal(internalArticleLink('https://booking.tpk.lv/RToNWjCl'),undefined);assert.equal(internalArticleLink(imported[0].url+'?ref=123'),undefined);
 for(const record of imported){const guide=data.getGuide(record.guideId);for(const url of record.sourceLinks)assert(guide.body.includes(url),'Lost source/affiliate link '+url)}
 assert.equal(data.destinations.length,29)
 const audit=data.destinations.map(d=>{
  const guides=data.getGuidesByDestination(d.id),places=data.getPlacesByDestination(d.id)
  const sections=Object.fromEntries(['stay','eat','experiences','shop'].map(section=>[section,{guides:reading.guidesForSection(guides,section).length,published:editorialLinks.filter(g=>g.destinationId===d.id&&g.section===section).length}]))
  assert(d.itineraryIds.length&&guides.length); assert(sections.stay.guides||d.neighborhoods.length||places.some(p=>p.category==="hotel"),d.id+" has no stay path")
  assert(sections.eat.guides||sections.eat.published||places.some(p=>['restaurant','cafe'].includes(p.category)),d.id+' has no food path')
  return {city:d.city,id:d.id,sections,placeCount:places.length,guideCount:guides.length,distinctJournalCards:reading.distinctStories(guides).length,uniqueCovers:new Set(guides.map(g=>g.heroPhoto)).size}
 })
 assert(intentCollections.Eat.some(x=>x.destination.id==='tulum'))
 assert(intentCollections['First Trip'].length&&intentCollections.Romantic.length)
 assert.equal(links.destinationFoodCompanion('lima'),undefined);assert(links.destinationFoodCompanion('buenos-aires').url.endsWith('/cookie_alfajor'));assert(links.destinationFoodCompanion('montevideo'));
 assert.equal(guideSourceLink('https://www.afar.com/places/in-situ-mezcaleria-oaxaca').url,'https://insitumezcaleria.com/');
 for(const d of data.destinations)assert.equal(links.familyCompanion(d.id,false),undefined)
 assert(links.familyCompanion('san-jose-costa-rica',true))
 assert.equal(links.familyCompanion('antigua-guatemala',true),undefined)
 assert.equal(links.foodCompanion('pizza, tacos and bread'),undefined,'Unsupported worlds should stay hidden')
 assert(links.foodCompanion('homemade pasta').url.endsWith('/noodles'))
 assert(links.foodCompanion('alfajores').url.endsWith('/cookies'))
 assert.equal(links.foodCompanion('shopping and nightlife'),undefined)
 assert.equal(links.railCompanions['lima'],undefined,'No guessed nearby rail')
 const beach={days:[],answers:{interests:['beach']}}
 assert.equal(new URL(links.wardrobeCompanion('rio-de-janeiro',beach).url).searchParams.get('intent'),'Beach Week')
 const original=data.guides[0], duplicate={...original,id:'test-duplicate'}
 assert.equal(reading.distinctStories([original,duplicate]).length,1)
 assert.equal(reading.distinctStories([original,{...duplicate,destinationId:'different-city'}]).length,2)
 const urls=[...new Set([...data.guides.map(g=>g.sourceUrl),...imported.flatMap(g=>g.sourceLinks),...editorialLinks.map(g=>g.url),...data.places.map(p=>p.offer?.affiliateUrl),...Object.values(shopmyEdits).map(e=>e.url),links.destinationFoodCompanion('buenos-aires').url,guideSourceLink('https://www.afar.com/places/in-situ-mezcaleria-oaxaca').url,...['alfajores','pasta','ramen','cake'].map(text=>links.foodCompanion(text).url),links.railCompanions['el-chepe-express'].url,...data.destinations.map(d=>links.wardrobeCompanion(d.id).url)].filter(Boolean))]
 fs.mkdirSync('visual-qa',{recursive:true});fs.writeFileSync('visual-qa/completeness-audit.json',JSON.stringify({audit,collections:Object.fromEntries(Object.entries(intentCollections).map(([k,v])=>[k,v.length])),foodGuides:data.guides.filter(g=>(['eat','drink'].includes(g.section)||g.categories?.includes('Food'))&&(links.foodCompanion(g.title+' '+g.dek)||links.destinationFoodCompanion(g.destinationId))).map(g=>({id:g.id,title:g.title,url:(links.foodCompanion(g.title+' '+g.dek)||links.destinationFoodCompanion(g.destinationId)).url}))},null,2))
 fs.writeFileSync('visual-qa/completeness-link-list.json',JSON.stringify(urls))
 console.log(`29 cities audited; original places and itineraries unchanged; 11 prior imports retained with stable IDs/covers. Context links and collection coverage passed; ${urls.length} URLs queued for network audit.`)
} finally {await server.close()}
