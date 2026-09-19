import type { TripQuizAnswers } from '@/types'
const KEY='jsl.experience.v1'
type Memory={recent:string[]; preferences?:TripQuizAnswers}
export function getTravelMemory():Memory {
  try {
    const raw=JSON.parse(localStorage.getItem(KEY)||'{}')
    const p=raw?.preferences
    const valid=p&&typeof p.destinationId==='string'&&[3,4,5,7].includes(p.days)&&['solo','couple','friends','family'].includes(p.companions)&&['slow','balanced','pack-it-in'].includes(p.pace)&&['value','comfortable','luxe'].includes(p.style)&&Array.isArray(p.interests)&&p.interests.length>0&&p.interests.every((i:unknown)=>['food','culture','beach','shopping','nightlife','relaxation'].includes(String(i)))
    return {recent:Array.isArray(raw?.recent)?raw.recent.filter((id:unknown)=>typeof id==='string').slice(0,4):[],preferences:valid?p:undefined}
  } catch {return {recent:[]}}
}
function write(value:Memory){try{localStorage.setItem(KEY,JSON.stringify(value))}catch{/* Browsing still works without storage. */}}
export function rememberDestination(id:string){const m=getTravelMemory();write({...m,recent:[id,...m.recent.filter(v=>v!==id)].slice(0,4)})}
export function rememberPreferences(preferences:TripQuizAnswers){write({...getTravelMemory(),preferences})}
export function clearTravelMemory(){try{localStorage.removeItem(KEY)}catch{/* Optional local history only. */}}
