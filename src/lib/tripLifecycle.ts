import type { SavedTrip, Itinerary } from '@/types'
export const destinationZones: Record<string,string> = {'rio-de-janeiro':'America/Sao_Paulo','sao-paulo':'America/Sao_Paulo','buenos-aires':'America/Argentina/Buenos_Aires',cartagena:'America/Bogota','mexico-city':'America/Mexico_City',guadalajara:'America/Mexico_City',tulum:'America/Cancun','playa-del-carmen':'America/Cancun'}
export function calendarDate(now=new Date(),destinationId='') { const p=new Intl.DateTimeFormat('en-US',{timeZone:destinationZones[destinationId]||Intl.DateTimeFormat().resolvedOptions().timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);return ['year','month','day'].map(t=>p.find(x=>x.type===t)!.value).join('-') }
export function dayNumber(date:string) { if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return NaN;const ms=Date.parse(date+'T12:00:00Z');return Number.isFinite(ms)&&new Date(ms).toISOString().slice(0,10)===date?Math.floor(ms/86400000):NaN }
export function dateAfter(date:string,days:number) {const n=dayNumber(date);return Number.isFinite(n)?new Date((n+days)*86400000).toISOString().slice(0,10):''}
export function tripPhase(trip:SavedTrip,itinerary:Itinerary|undefined,now=new Date()):'undated'|'upcoming'|'active'|'ended' {
 if(trip.status==='past')return 'ended'
 if(!trip.startDate||!Number.isFinite(dayNumber(trip.startDate))||!itinerary?.days.length)return 'undated'
 const day=dayNumber(calendarDate(now,trip.destinationId))-dayNumber(trip.startDate)
 return day<0?'upcoming':day<itinerary.days.length?'active':'ended'
}
export function activeDayIndex(trip:SavedTrip,now=new Date()) {return dayNumber(calendarDate(now,trip.destinationId))-dayNumber(trip.startDate||'')}
export function activityVisitKey(day:number,id:string) {return day+':'+id}
