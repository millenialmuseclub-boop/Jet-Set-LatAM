import assert from 'node:assert/strict'
import {createServer} from 'vite'
const values = new Map()
globalThis.localStorage = {getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)}
globalThis.window = {dispatchEvent:()=>{}}
const server = await createServer({server:{middlewareMode:true}})
try {
 const data = await server.ssrLoadModule('/src/data/index.ts')
 const storage = await server.ssrLoadModule('/src/lib/storage.ts')
 const {generateItinerary} = await server.ssrLoadModule('/src/lib/planner.ts')
 for(const id of ['tulum','playa-del-carmen','guadalajara']) {
  const d=data.getDestinationById(id),template=data.getItinerary(d.itineraryIds[0])
  assert(template?.days.length, id+' needs a usable template')
  for(const day of template.days) for(const a of day.activities) if(a.placeId) assert(d.placeIds.includes(a.placeId))
 }
 assert.equal(data.getDestinationForPlace(data.getPlace('pl-matices-hotel-de-barricas')).id,'guadalajara')
 let cases=0
 for(const d of data.destinations.filter(d=>d.status==='live')) for(const pace of ['slow','balanced','pack-it-in']) for(const style of ['value','comfortable','luxe']) {
  const it=generateItinerary({destinationId:d.id,days:3,pace,style,companions:'family',interests:['food','culture']})
  for(const day of it.days) {
   assert.equal(day.activities.at(-1).time,'19:30','Every pace spans the full day')
   for(const a of day.activities) if(a.placeId) assert(!['hotel','bar','nightlife'].includes(data.getPlace(a.placeId).category))
  }
  cases++
 }
 values.set('jsl.savedLibrary.v1',JSON.stringify({savedPlaceIds:['old-id','old-id']}))
 assert.deepEqual(storage.getLibrary().savedPlaceIds,['old-id'])
 assert.deepEqual(storage.getLibrary().savedGuideIds,[])
 const template=data.getItinerary('it-tulum-short'), before=JSON.stringify(template)
 storage.saveUserItinerary({...structuredClone(template),id:'copy'})
 storage.addUpcomingTrip({id:'trip-copy',itineraryId:'copy',destinationId:'tulum',title:'Original',createdAt:'2026-01-01',status:'upcoming'})
 storage.setTripStartDate('trip-copy','2026-10-01')
 storage.saveStoryNote('trip-copy',1,'My note')
 storage.setTripStatus('trip-copy','past')
 storage.addUpcomingTrip({id:'trip-copy',itineraryId:'copy',destinationId:'tulum',title:'Renamed',createdAt:'2026-09-19',status:'upcoming'})
 assert.equal(storage.getSavedTrips().length,1)
 assert.equal(storage.getTrip('trip-copy').startDate,'2026-10-01')
 assert.equal(storage.getTrip('trip-copy').storyNotes[1],'My note')
 assert.equal(storage.getTrip('trip-copy').status,'past')
 assert(!storage.getLibrary().upcomingTripIds.includes('trip-copy'))
 const copy=storage.getEffectiveItinerary('copy')
 assert.equal(storage.addPlaceToTripItinerary(copy,'pl-tulum-ruins',0).days[0].activities.length,copy.days[0].activities.length)
 assert.equal(JSON.stringify(template),before,'Template remains untouched')
 console.log(`Product depth: ${cases} family/budget/pace scenarios, 3 templates, legacy library and repeat-save preservation passed.`)
} finally { await server.close() }
