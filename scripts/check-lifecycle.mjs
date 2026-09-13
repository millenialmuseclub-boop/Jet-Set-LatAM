import assert from 'node:assert/strict'
import {createServer} from 'vite'
const server=await createServer({server:{middlewareMode:true}})
try{
 const load=p=>server.ssrLoadModule('/src/'+p+'.ts')
 const {composeJetSetAnswer:ask}=await load('lib/askJetSet')
 const {tripPhase,calendarDate,dayNumber,dateAfter}=await load('lib/tripLifecycle')
 const {trails}=await load('data/trails');const {getPlace,getPlacesByDestination}=await load('data/index')
 const {appendTrailToDay}=await load('lib/trails');const {tripStoryStats}=await load('lib/tripStory');const {tripExtensions}=await load('lib/constellation');const {carnivalState,tripOverlapsCarnival}=await load('lib/carnivalSeason')
 const trip={id:'test',destinationId:'rio-de-janeiro',status:'upcoming',startDate:'2027-02-07'}
 const museum=getPlacesByDestination(trip.destinationId).find(p=>p.category==='museum')
 assert(museum,'museum and restaurant neighborhood fixture')
 const itinerary={id:'it',destinationId:trip.destinationId,days:[{day:1,theme:'Museum',activities:[{id:'a',placeId:museum.id}]},{day:2,theme:'Open',activities:[]}]}
 assert.equal(tripPhase(trip,itinerary,new Date('2027-02-07T02:00:00Z')),'upcoming');assert.equal(tripPhase(trip,itinerary,new Date('2027-02-07T03:00:00Z')),'active');assert.equal(tripPhase(trip,itinerary,new Date('2027-02-09T03:00:00Z')),'ended')
 assert.equal(tripPhase({...trip,startDate:undefined},itinerary),'undated');assert.equal(tripPhase({...trip,startDate:'2027-02-30'},itinerary),'undated');assert.equal(tripPhase({...trip,status:'past'},itinerary),'ended');assert(Number.isNaN(dayNumber('2025-02-29')));assert.equal(dateAfter('2024-02-28',1),'2024-02-29');assert.equal(dateAfter('2026-03-08',1),'2026-03-09');assert.equal(calendarDate(new Date('2027-02-07T02:59Z'),'rio-de-janeiro'),'2027-02-06')
 const requests=[['I have four hours in Roma before dinner.','mexico-city'],['What did Jet Set actually like in Cartagena?','cartagena'],['Give me an art afternoon in São Paulo.','sao-paulo'],['What can I do tonight in Buenos Aires?','buenos-aires']]
 for(const [question,id] of requests){const a=ask({question,trip,itinerary});assert.equal(a.destinationId,id,question);assert(a.places.length,question);assert(a.places.every(p=>getPlacesByDestination(id).some(x=>x.id===p.id)));if(question.includes('actually'))assert(a.places.every(p=>p.isJetSetPick));if(question.includes('four')){assert(a.places.every(p=>p.neighborhood.startsWith('Roma')));assert(a.trails.every(t=>t.estimatedHours<=4))}console.log(question,a.places.map(p=>p.name).join(' / '))}
 const near=ask({question:"Where should we eat near today's museum?",trip,itinerary,now:new Date('2027-02-07T15:00Z')});assert.equal(near.places.length,0,'No restaurant in this museum neighborhood; do not invent one');assert(near.places.every(p=>p.neighborhood===museum.neighborhood&&['restaurant','cafe'].includes(p.category)));assert(near.context.includes('Day 1'))
 const cartMuseum=getPlacesByDestination('cartagena').find(p=>p.category==='museum');const cartTrip={...trip,destinationId:'cartagena'};const cartIt={...itinerary,destinationId:'cartagena',days:[{day:1,activities:[{id:'museum',placeId:cartMuseum.id}]}]};const cartNear=ask({question:"Where should we eat near today's museum?",trip:cartTrip,itinerary:cartIt,now:new Date('2027-02-07T15:00Z')});assert(cartNear.places.length);assert(cartNear.places.every(p=>p.neighborhood===cartMuseum.neighborhood&&['restaurant','cafe'].includes(p.category)))
 assert.equal(ask({question:"Where should we eat near today's museum?",trip:{...trip,startDate:undefined},itinerary}).places.length,0)
 assert.equal(ask({question:'Where should we eat in Bangkok?',trip,itinerary}).places.length,0)
 assert.equal(ask({question:'Quantum spaceship parking',destinationId:'rio-de-janeiro'}).places.length,0)
 const savedId=getPlacesByDestination('cartagena')[0].id;assert.deepEqual(ask({question:'My saved places in Cartagena',savedPlaceIds:[savedId]}).places.map(p=>p.id),[savedId]);assert.equal(ask({question:'My saved places in Cartagena',savedPlaceIds:[]}).places.length,0)
 const trail=trails.find(t=>t.destinationId===trip.destinationId),before=JSON.stringify(itinerary);const appended=appendTrailToDay(itinerary,trail,1);assert.equal(appendTrailToDay(appended,trail,1).days[1].activities.length,trail.placeIds.length);assert.equal(JSON.stringify(itinerary),before);assert.throws(()=>appendTrailToDay(itinerary,trails[0],0));for(const t of trails)assert(t.placeIds.every(getPlace))
 assert.equal(tripStoryStats(trip,itinerary).visited.length,0);assert.deepEqual(tripStoryStats({...trip,visitedActivityIds:['1:a','1:removed']},itinerary).visited,[museum.id]);assert.equal(tripExtensions(itinerary).family,false);assert.equal(tripExtensions({...itinerary,answers:{companions:'family',interests:['food']}}).family,true);assert.equal(tripExtensions(itinerary).adventure,false)
 assert.equal(carnivalState(new Date('2026-09-13T15:00Z')),'archive');assert.equal(carnivalState(new Date('2027-01-20T15:00Z')),'upcoming');assert.equal(carnivalState(new Date('2027-02-08T15:00Z')),'during');assert.equal(carnivalState(new Date('2027-02-14T15:00Z')),'archive');assert(tripOverlapsCarnival(trip.destinationId,'2027-02-06',3));assert(!tripOverlapsCarnival('cartagena','2027-02-06',3))
 console.log('Lifecycle, trip truth, trails, constellation, Carnival and all Ask examples passed.')
}finally{await server.close()}
