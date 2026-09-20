import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
import sharp from 'sharp'
import { createHash } from 'node:crypto'
const values = new Map()
globalThis.localStorage = {getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)}
globalThis.window = {dispatchEvent:()=>{}}
const server = await createServer({server:{middlewareMode:true}})
try {
 const data = await server.ssrLoadModule('/src/data/index.ts')
 const {generateItinerary,REPEATABLE_CATEGORIES} = await server.ssrLoadModule('/src/lib/planner.ts')
 const {adjustDay,dayAdjustments,familySuitable} = await server.ssrLoadModule('/src/lib/dayAdjustments.ts')
 const storage = await server.ssrLoadModule('/src/lib/storage.ts')
 let plans=0,adjustments=0
 function verify(it) {
  const seen=new Set()
  for(const day of it.days){
   const today=new Set()
   const times=day.activities.map(a=>a.time.split(':').map(Number)).map(([h,m])=>h*60+m)
   assert(times.every((t,i)=>i===0||t>times[i-1]),'Monotonic time slots')
   for(const a of day.activities){if(!a.placeId)continue
    const p=data.getPlace(a.placeId)
    assert(p && data.getDestinationById(it.destinationId).placeIds.includes(p.id))
    assert(!today.has(p.id),'No same-day duplicates');today.add(p.id)
    assert(!seen.has(p.id)||REPEATABLE_CATEGORIES.has(p.category),'No repeated one-time attractions');seen.add(p.id)
    assert.notEqual(p.category,'hotel');if(['bar','nightlife'].includes(p.category))assert(Number(a.time.split(':')[0])>=19,'Nightlife belongs in the evening')
    if(it.answers.companions==='family')assert(familySuitable(p))
    if(['Breakfast','Lunch','Dinner'].includes(a.label))assert(['cafe','restaurant'].includes(p.category))
   }
  }
 }
 for(const d of data.destinations.filter(d=>d.status==='live'))for(const days of [3,4,5,7])for(const companions of ['solo','couple','friends','family'])for(const style of ['value','comfortable','luxe'])for(const pace of ['slow','balanced','pack-it-in'])for(const interests of [['food'],['culture'],['beach','relaxation'],['shopping'],['nightlife'],['food','culture','shopping']]){
  const it=generateItinerary({destinationId:d.id,days,companions,style,pace,interests})
  verify(it);assert.equal(it.days[0].activities.length,{slow:3,balanced:4,'pack-it-in':6}[pace]);if(companions!=='family'&&interests.includes('nightlife'))assert.equal(it.days[0].activities[it.days[0].activities.length-1].time,'21:00');plans++
  // Exercise changes on the exhausted final day as well as the arrival day.
  for(const index of [0,days-1])for(const [kind] of dayAdjustments){
   const before=JSON.stringify(it), result=adjustDay(it,index,kind)
   assert.equal(JSON.stringify(it),before)
   verify({...it,days:it.days.map((day,i)=>i===index?result.day:day)})
   adjustments++
  }
 }
 const it=generateItinerary({destinationId:'mexico-city',days:7,companions:'family',style:'value',pace:'slow',interests:['food']})
 it.days[0].activities[0].notes='Reservation 123';it.days[0].activities[0].time='10:45'
 storage.saveUserItinerary(it)
 const trip={id:'rc-test',itineraryId:it.id,destinationId:it.destinationId,title:'Legacy trip',createdAt:'2026-09-20',status:'upcoming'}
 storage.addUpcomingTrip(trip);storage.setTripStartDate(trip.id,'2028-02-29')
 assert.equal(storage.getTrip(trip.id).startDate,'2028-02-29')
 assert.throws(()=>storage.setTripStartDate(trip.id,'2026-02-29'))
 assert.deepEqual(storage.getEffectiveItinerary(it.id),it)
 storage.setTripStartDate(trip.id,'');assert.equal(storage.getTrip(trip.id).startDate,undefined)
 console.log(`RC: ${plans} plans and ${adjustments} adjustments passed; legacy trip, note/time and date persistence passed.`)
 const manifest=JSON.parse(readFileSync('docs/FINAL_PHOTOGRAPHY.json','utf8')),hashes=new Set()
 for(const photo of manifest.photos){
  const file='src/assets/final-travel-photos/'+photo.file, bytes=readFileSync(file), meta=await sharp(bytes).metadata()
  assert(Math.max(meta.width,meta.height)<=1440);assert(bytes.length<450000);assert(photo.alt)
  const hash=createHash('sha256').update(bytes).digest('hex');assert(!hashes.has(hash));hashes.add(hash)
 }
 console.log(`Photography: ${hashes.size} unique final-batch assets, max 1440px, each under 450KB.`)
 const src=readFileSync('src/lib/links.ts','utf8').replace(/^import .*$/gm,'')
 const js=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText
 const calls=[];let native=false,completed=true,browserFails=false
 const context={exports:{},URL,Capacitor:{isNativePlatform:()=>native,getPlatform:()=> 'ios'},AppLauncher:{openUrl:async args=>{calls.push(['app',args.url]);return {completed}}},Browser:{open:async args=>{calls.push(['browser',args.url]);if(browserFails)throw Error('unavailable')}},window:{location:{assign:url=>calls.push(['web',url])},alert:msg=>calls.push(['alert',msg])}}
 vm.runInNewContext(js,context)
 const url='https://example.com/booking?affiliate=abc&destination=rio#hotel'
 context.exports.openExternal(url);assert.deepEqual(calls.pop(),['web',url])
 native=true;context.exports.openExternal(url);await new Promise(setImmediate);assert.deepEqual(calls.pop(),['app',url])
 completed=false;context.exports.openExternal(url);await new Promise(setImmediate);assert.deepEqual(calls.pop(),['browser',url])
 browserFails=true;context.exports.openExternal(url);await new Promise(setImmediate);assert.equal(calls.pop()[0],'alert')
 completed=true;context.exports.openMap('https://www.google.com/maps/search/?api=1&query=Rio%20de%20Janeiro');await new Promise(setImmediate);assert.deepEqual(calls.pop(),['app','https://maps.apple.com/?q=Rio%20de%20Janeiro'])
 console.log('External links: web, iOS handoff, fallback, failure and map query encoding passed; tracking preserved.')
} finally {await server.close()}
