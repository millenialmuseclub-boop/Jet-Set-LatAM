import type { Itinerary } from '@/types'
import type { Trail } from '@/data/trails'
export function appendTrailToDay(itinerary:Itinerary,trail:Trail,dayIndex:number):Itinerary {
 if(itinerary.destinationId!==trail.destinationId||!itinerary.days[dayIndex])throw new Error('Choose a matching trip and day.')
 return {...itinerary,days:itinerary.days.map((d,i)=>i!==dayIndex?d:{...d,activities:[...d.activities,...trail.placeIds.filter(id=>!d.activities.some(a=>a.placeId===id)).map((placeId,n)=>({id:'trail-'+trail.id+'-'+d.day+'-'+placeId,time:'Flexible',label:'Trail stop '+(n+1),placeId,notes:trail.title}))]})}
}
