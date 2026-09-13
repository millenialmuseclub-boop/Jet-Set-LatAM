import type { SavedTrip,Itinerary } from '@/types'
import { getPlace } from '@/data'
import { activityVisitKey } from './tripLifecycle'
export function tripStoryStats(trip:SavedTrip,itinerary:Itinerary) {
 const all=itinerary.days.flatMap(d=>d.activities.filter(a=>a.placeId&&getPlace(a.placeId)).map(a=>({placeId:a.placeId!,visited:trip.visitedActivityIds?.includes(activityVisitKey(d.day,a.id))||false})))
 const planned=[...new Set(all.map(a=>a.placeId))];const visited=[...new Set(all.filter(a=>a.visited).map(a=>a.placeId))]
 return {days:itinerary.days.length,planned,visited,neighborhoods:[...new Set(planned.map(id=>getPlace(id)?.neighborhood).filter(Boolean))]}
}
export async function makeRecapPng(city:string,stats:ReturnType<typeof tripStoryStats>,dateLabel:string) {
 await document.fonts.ready
 const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;const c=canvas.getContext('2d');if(!c)throw new Error('Image export unavailable.')
 c.fillStyle='#fbf5f1';c.fillRect(0,0,1080,1350);c.strokeStyle='#a44760';c.lineWidth=2;c.strokeRect(60,60,960,1230)
 c.fillStyle='#a44760';c.font='22px Jost, sans-serif';c.fillText('JET SET LATAM  /  YOUR TRIP STORY',100,150)
 c.fillStyle='#38272e';c.font='italic 100px "Cormorant Garamond", serif';let y=340;let line='';for(const word of city.split(' ')){if(c.measureText(line+word).width>840&&line){c.fillText(line.trim(),100,y);y+=110;line=''}line+=word+' '}c.fillText(line.trim(),100,y)
 c.font='30px Jost, sans-serif';c.fillText(dateLabel,100,650);c.font='60px "Cormorant Garamond", serif';c.fillText(stats.days+' days · '+stats.planned.length+' planned places',100,820)
 c.font='30px Jost, sans-serif';c.fillText('Confirmed places visited: '+stats.visited.length,100,900);c.fillText(stats.neighborhoods.length+' neighborhoods in the plan',100,950)
 c.fillStyle='#a44760';c.font='24px Jost, sans-serif';c.fillText('A plan worth keeping. A story that is yours.',100,1130);c.fillText('Jet Set LatAm · @jordypop',100,1200)
 return new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('Could not create recap.')),'image/png'))
}
