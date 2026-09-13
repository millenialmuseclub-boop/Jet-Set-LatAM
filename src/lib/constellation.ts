import type { Itinerary } from '@/types'
import { getPlace } from '@/data'
import { relevantRalliiConnections } from './ralliiHandoff'
export function tripExtensions(itinerary:Itinerary) {
 const activities=itinerary.days.flatMap(d=>d.activities);const food=activities.filter(a=>a.placeId&&['cafe','restaurant'].includes(getPlace(a.placeId)?.category||''))
 return {style:true,family:itinerary.answers?.companions==='family',food:itinerary.answers?.interests.includes('food')||new Set(food.map(a=>a.placeId)).size>=3&&food.length/Math.max(1,activities.length)>=0.6,adventure:relevantRalliiConnections(itinerary.destinationId,itinerary).length>0}
}
