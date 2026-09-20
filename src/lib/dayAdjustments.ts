import type { Itinerary, ItineraryDay, Place } from '@/types'
import { getPlace, getPlacesByDestination } from '@/data'
import { REPEATABLE_CATEGORIES, suitableDaypart } from './planner'
export const dayAdjustments=[['lighter','Leave room to wander'],['food','More food'],['culture','More art & culture'],['outdoors','More outdoors'],['shopping','More shopping'],['value','Spend less'],['family','Family adjustment']] as const
export type DayAdjustment=typeof dayAdjustments[number][0]
const categories:Partial<Record<DayAdjustment,Place['category'][]>>={food:['restaurant','cafe'],culture:['museum','landmark'],outdoors:['park','beach','experience'],shopping:['shop']}
export function familySuitable(p:Place){return !['bar','nightlife'].includes(p.category)&&!p.tags.some(t=>/tequila|adults.only/i.test(t))}
export function dayAdvice(day:ItineraryDay):string[] {
  const places=day.activities.map(a=>a.placeId?getPlace(a.placeId):undefined).filter(p=>!!p)
  const notes:string[]=[]
  if(new Set(places.map(p=>p.neighborhood).filter(Boolean)).size>2)notes.push('Several neighborhoods in one day. Leave room for transfers.')
  const times=day.activities.map(a=>/^\d{1,2}:\d{2}$/.test(a.time)?Number(a.time.split(':')[0])*60+Number(a.time.split(':')[1]):null).filter(t=>t!==null)
  if(times.some((t,i)=>i>0&&t<=times[i-1]))notes.push('Some times overlap or run backwards. Check your order.')
  if(day.activities.length>5)notes.push('A full day. Try a lighter version if you want more breathing room.')
  return notes
}
/** Preview only. Never mutates the source, other days, activity IDs, times or personal notes. */
export function adjustDay(itinerary:Itinerary,index:number,kind:DayAdjustment, protectedIds:string[]=[]):{day:ItineraryDay;message:string;changed:boolean} {
  const source=itinerary.days[index]
  const day={...source,activities:source.activities.map(a=>({...a}))}
  const current=day.activities.map(a=>a.placeId?getPlace(a.placeId):undefined)
  if(kind==='lighter') {
    const candidates=day.activities.map((a,i)=>({a,i})).filter(({a})=>!protectedIds.includes(a.id)&&!a.notes&&!['Breakfast','Lunch','Dinner'].includes(a.label)&&a.placeId)
    const item=candidates[candidates.length-1]
    if(item&&day.activities.length>2)day.activities.splice(item.i,1)
  } else {
    const usedOther=new Set(itinerary.days.filter((_,i)=>i!==index).flatMap(d=>d.activities.map(a=>a.placeId)))
    const usedToday=new Set(day.activities.map(a=>a.placeId))
    const neighborhoods=new Set(current.map(p=>p?.neighborhood).filter(Boolean))
    const family=kind==='family'||itinerary.answers?.companions==='family'
    for(let i=0;i<day.activities.length;i++){
      const activity=day.activities[i],old=current[i]
      // Personal notes may contain reservations; never silently replace those activities.
      if(activity.notes||protectedIds.includes(activity.id))continue
      if(kind==='family'&&(!old||familySuitable(old)))continue
      if(kind==='value'&&(!old?.priceLevel||old.priceLevel.length<=2))continue
      if(categories[kind]?.includes(old?.category as Place['category']))continue
      if(['Breakfast','Lunch','Dinner'].includes(activity.label)&&kind!=='food'&&kind!=='value'&&kind!=='family')continue
      const pool=getPlacesByDestination(itinerary.destinationId).filter(p=>p.category!=='hotel'&&suitableDaypart(p,activity.time)&&(!family||familySuitable(p))&&!usedToday.has(p.id)&&(!usedOther.has(p.id)||REPEATABLE_CATEGORIES.has(p.category))&&(!categories[kind]||categories[kind]!.includes(p.category))&&(!['Breakfast','Lunch','Dinner'].includes(activity.label)||['cafe','restaurant'].includes(p.category))&&(kind!=='value'||!!p.priceLevel&&p.priceLevel.length<(old?.priceLevel?.length||0)))
      pool.sort((a,b)=>Number(neighborhoods.has(b.neighborhood))-Number(neighborhoods.has(a.neighborhood))||Number(usedOther.has(a.id))-Number(usedOther.has(b.id))||(a.priceLevel?.length||2)-(b.priceLevel?.length||2))
      const next=pool[0]
      if(!next)continue
      usedToday.delete(activity.placeId);usedToday.add(next.id)
      day.activities[i]={...activity,placeId:next.id,label:['Breakfast','Lunch','Dinner'].includes(activity.label)?activity.label:next.category[0].toUpperCase()+next.category.slice(1)}
      if(kind!=='family'&&kind!=='value')break
    }
  }
  const changed=JSON.stringify(day)!==JSON.stringify(source)
  const stillAdult=kind==='family'&&day.activities.some(a=>a.placeId&&getPlace(a.placeId)&&!familySuitable(getPlace(a.placeId)!))
  return {day,message:stillAdult?'Some adult-oriented stops remain. Activities with notes or confirmed visits are protected; review those individually.':changed?'A suggestion from our curated places. Notes and other days stay intact. Confirm opening hours and transfers before you go.':'No suitable change in the current collection. Activities with notes or confirmed visits are protected.',changed}
}
