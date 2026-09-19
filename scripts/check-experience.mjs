import assert from 'node:assert/strict'
import {createServer} from 'vite'
const values=new Map()
globalThis.localStorage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)}
globalThis.window={dispatchEvent:()=>{}}
const server=await createServer({server:{middlewareMode:true}})
try{
 const data=await server.ssrLoadModule('/src/data/index.ts')
 const {generateItinerary}=await server.ssrLoadModule('/src/lib/planner.ts')
 const {adjustDay,dayAdjustments,familySuitable,dayAdvice}=await server.ssrLoadModule('/src/lib/dayAdjustments.ts')
 const memory=await server.ssrLoadModule('/src/lib/travelMemory.ts')
 let cases=0
 for(const d of data.destinations.filter(d=>d.status==='live'))for(const pace of ['slow','balanced','pack-it-in'])for(const companions of ['family','friends']){
  const it=generateItinerary({destinationId:d.id,days:3,interests:['food','culture'],companions,pace,style:'comfortable'})
  it.days[0].activities[0].notes='Reservation: keep this'
  const before=JSON.stringify(it)
  for(const [kind]of dayAdjustments){
   const result=adjustDay(it,0,kind)
   assert.equal(JSON.stringify(it),before,'Preview must not mutate source')
   assert.deepEqual(result.day.activities.find(a=>a.id===it.days[0].activities[0].id),it.days[0].activities[0],'Preserve reservation activity')
   const ids=result.day.activities.map(a=>a.placeId).filter(Boolean)
   assert.equal(ids.length,new Set(ids).size,'No day duplicates')
   for(const a of result.day.activities){
    if(a.placeId){assert(d.placeIds.includes(a.placeId));assert.notEqual(data.getPlace(a.placeId).category,'hotel');if(companions==='family')assert(familySuitable(data.getPlace(a.placeId)))}
    assert.equal(a.time,it.days[0].activities.find(old=>old.id===a.id).time,'Keep time slots')
   }
   if(kind==='lighter'&&result.changed)assert(result.day.activities.length<it.days[0].activities.length)
   cases++
  }
 }
 const visited=generateItinerary({destinationId:'mexico-city',days:3,interests:['culture'],companions:'solo',pace:'balanced',style:'comfortable'})
 const protectedIds=visited.days[0].activities.map(a=>a.id)
 for(const [kind]of dayAdjustments)assert.deepEqual(adjustDay(visited,0,kind,protectedIds).day,visited.days[0],'Confirmed visits protected')
 for(const d of data.destinations.filter(d=>d.status==='live'&&data.getPlacesByDestination(d.id).some(p=>p.category==='cafe'))){const it=generateItinerary({destinationId:d.id,days:3,interests:['food','culture'],companions:'solo',pace:'balanced',style:'comfortable'});for(const day of it.days)assert.equal(data.getPlace(day.activities[0].placeId).category,'cafe','Breakfast prioritizes cafés')}
 assert(dayAdvice({day:1,theme:'Test',activities:[{id:'a',time:'13:00',label:'Lunch'},{id:'b',time:'12:00',label:'Walk'}]}).some(s=>s.includes('backwards')))
 const protectedTrip=generateItinerary({destinationId:'mexico-city',days:3,interests:['food'],companions:'solo',pace:'balanced',style:'value'})
 protectedTrip.days[0].activities.forEach(a=>a.notes='Keep')
 assert.equal(adjustDay(protectedTrip,0,'lighter').changed,false)
 const args={destinationId:'mexico-city',days:3,interests:['food','culture'],companions:'solo',pace:'balanced',style:'comfortable'}
 const base=generateItinerary(args)
 const cafe=data.getPlacesByDestination(args.destinationId).find(p=>p.category==='cafe'&&p.id!==base.days[0].activities[0].placeId)
 assert(cafe)
 assert.equal(generateItinerary(args,[cafe.id]).days[0].activities[0].placeId,cafe.id,'Saved breakfast gets priority')
 values.set('jsl.savedTrips.v1','untouched')
 values.set('jsl.experience.v1','{"recent":null,"preferences":{"days":999}}')
 assert.deepEqual(memory.getTravelMemory(),{recent:[],preferences:undefined})
 for(const id of ['a','b','c','d','e','c'])memory.rememberDestination(id)
 assert.deepEqual(memory.getTravelMemory().recent,['c','e','d','b'])
 memory.rememberPreferences(args)
 assert.equal(memory.getTravelMemory().preferences.destinationId,'mexico-city')
 memory.clearTravelMemory()
 assert.equal(values.get('jsl.savedTrips.v1'),'untouched')
 assert.deepEqual(memory.getTravelMemory().recent,[])
 console.log(`Experience: ${cases} adjustment scenarios, note protection, duplicate/meal/family constraints, saved-place priority, conflict advice and isolated local preferences passed.`)
}finally{await server.close()}
