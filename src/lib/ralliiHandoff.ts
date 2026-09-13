import type { Itinerary, TripContext } from '@/types'
import { getPlace } from '@/data'
import { ralliiDestinationMap, type RalliiConnection } from '@/data/rallii'
export function relevantRalliiConnections(destinationId:string,itinerary?:Itinerary,placeId?:string,map:Record<string,RalliiConnection[]>=ralliiDestinationMap) {
 return (map[destinationId]||[]).filter(c=>c.verified&&c.destinationId===destinationId&&c.routeId&&(!itinerary||itinerary.days.some(d=>d.activities.some(a=>a.placeId&&c.placeIds.includes(a.placeId))))&&(!placeId||c.placeIds.includes(placeId)))
}
export function buildRalliiHandoff(context:TripContext,itinerary:Itinerary) {
 const connections=relevantRalliiConnections(context.destinationId,itinerary)
 if(!connections.length)return undefined
 return {version:1 as const,source:'jet-set-latam' as const,destinationId:context.destinationId,destinationName:context.destinationName,country:context.country,startDate:context.startDate,endDate:context.endDate,days:context.days,adventures:connections.map(c=>({mode:c.mode,routeId:c.routeId,region:c.region,places:c.placeIds.filter(id=>itinerary.days.some(d=>d.activities.some(a=>a.placeId===id))).map(id=>({id,name:getPlace(id)?.name,coordinates:getPlace(id)?.coordinates}))}))}
}
