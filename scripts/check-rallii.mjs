import assert from 'node:assert/strict'
import {createServer} from 'vite'
const server=await createServer({server:{middlewareMode:true}})
try {
 const {relevantRalliiConnections,buildRalliiHandoff}=await server.ssrLoadModule('/src/lib/ralliiHandoff.ts')
 const {ralliiDestinationMap,outdoorStoryIds}=await server.ssrLoadModule('/src/data/rallii.ts')
 const data=await server.ssrLoadModule('/src/data/index.ts')
 for(const id of Object.keys(ralliiDestinationMap))assert.equal(relevantRalliiConnections(id).length,0,'Unverified local route promoted')
 for(const id of outdoorStoryIds)assert(data.getGuide(id),'Missing outdoor story '+id)
 const connection={id:'fixture',destinationId:'guadalajara',mode:'rail',routeId:'fixture-route',routeName:'Test route',region:'Test',guideIds:[],placeIds:['pl-jose-cuervo-express'],evidence:'Test fixture only',verified:true}
 const map={guadalajara:[connection]}
 const trip={id:'test',destinationId:'guadalajara',title:'test',days:[{day:1,theme:'Rail',activities:[{id:'a',label:'Train',time:'09:00',placeId:'pl-jose-cuervo-express'}]}]}
 assert.equal(relevantRalliiConnections('guadalajara',trip,undefined,map).length,1)
 assert.equal(relevantRalliiConnections('guadalajara',{...trip,days:[]},undefined,map).length,0)
 assert.equal(relevantRalliiConnections('cartagena',trip,undefined,map).length,0)
 assert.equal(relevantRalliiConnections('guadalajara',trip,'pl-unknown',map).length,0)
 assert.equal(relevantRalliiConnections('guadalajara',trip,undefined,{guadalajara:[{...connection,verified:false}]}).length,0)
 assert.equal(buildRalliiHandoff({destinationId:'guadalajara'},trip),undefined)
 for(const id of ['tulum','playa-del-carmen']) assert(data.getGuidesByDestination(id).some(g=>g.id==='wp-1832'))
 console.log('Rallii coverage gating, negative trip/activity cases, and Tren Maya links passed.')
} finally {await server.close()}
