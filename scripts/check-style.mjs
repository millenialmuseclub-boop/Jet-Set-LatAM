import assert from 'node:assert/strict'
import { createServer } from 'vite'
const server=await createServer({server:{middlewareMode:true}})
try {
 const {buildStyleHandoff,formatStyleBrief}=await server.ssrLoadModule('/src/lib/styleHandoff.ts')
 const {styleOffers}=await server.ssrLoadModule('/src/data/style.ts')
 const context={tripId:'test',destinationId:'rio-de-janeiro',destinationName:'Rio de Janeiro',city:'Rio de Janeiro',country:'Brazil',days:2,companions:'solo',interests:['culture'],pace:'slow',style:'comfortable'}
 const itinerary={id:'test',destinationId:context.destinationId,title:'Test',days:[{day:1,theme:'Culture',activities:[{id:'a',time:'10:00',label:'Visit',placeId:'pl-theatro-municipal'},{id:'b',time:'19:00',label:'Dinner'}]},{day:2,theme:'A free day',activities:[]}]}
 const before=JSON.stringify({context,itinerary}); const result=buildStyleHandoff(context,itinerary)
 assert.equal(result.version,1);assert.equal(result.trip.pace,'slow');assert.equal(result.trip.companions,'solo')
 assert(result.occasions.includes('Centro'));assert(result.occasions.includes('Dinner'));assert(!result.occasions.includes('Carnival'));assert(!result.occasions.includes('Travel Day'))
 assert(formatStyleBrief(result).includes('Theatro Municipal'));assert.equal(JSON.stringify({context,itinerary}),before)
 itinerary.days[1].activities.push({id:'c',time:'12:00',label:'Carnival street day'})
 assert(buildStyleHandoff(context,itinerary).occasions.includes('Carnival'))
 assert.equal(styleOffers.filter(o=>o.status==='active').length,2);assert.equal(new Set(styleOffers.map(o=>o.affiliateUrl)).size,2)
 console.log('Style brief: provenance, actual occasions, current edits, and non-mutation checks passed.')
} finally {await server.close()}
