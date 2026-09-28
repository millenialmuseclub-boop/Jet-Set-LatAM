import { getDestinationById, getGuidesByDestination } from '@/data'
import { shoppingEdits } from '@/data/shopmy'
import { nextCityPhotos } from '@/data/next-city-photography'
import { rioCity2025 } from '@/data/rio-city-2025'
import { destinationCardPhoto } from './destinationPhotography'

// Editorial direction for verified collection inventory, never inferred products.
const directions:Record<string,[string,string]>={
 'rio-de-janeiro':['Beach to Evening','Beach color, city plans and dinner by the coast.'],
 'buenos-aires':['Dinner Out','Polished city days with room for a late dinner.'],
 'mexico-city':['Art + City','Museum mornings, design browsing and an evening table.'],
 cartagena:['Warm Weather','Old-city color and a change for a warm evening.'],
 'sao-paulo':['Design + Dinner','Urban days, galleries and a night out.'],
 tulum:['Beach Edit','For the beach days in your actual itinerary.'],
 'playa-del-carmen':['Resort Edit','Coastal afternoons and a walk through town.'],
 lima:['Coastal Layers','City walks and an extra layer for the waterfront.'],
 montevideo:['Cool Evenings','A relaxed city wardrobe for the Rambla and dinner.'],
 'panama-city':['Tropical City','Casco streets, museums and dinner plans.'],
 'san-jose-costa-rica':['City Essentials','Coffee stops, museum time and a flexible city day.'],
 florianopolis:['Beach Edit','Beach days and a market lunch on the island.'],
 mendoza:['Cool Evenings','City plazas and a reserved wine-country table.'],
 cusco:['City Layers','Layers for town; mountain equipment is a separate decision.'],
 salvador:['Coastal Color','Historic streets, craft and a Bahian dinner.'],
 'punta-del-este':['Resort Edit','Art afternoons, coast time and dinner.'],
 'bocas-del-toro':['Beach Edit','Island days with your transfers already arranged.'],
 quito:['City Layers','Historic plazas and creative neighborhoods.'],
 havana:['Warm Weather','Old-city architecture and a seafront pause.'],
 guadalajara:['City Layers','Gallery visits and an evening around the table.'],
 bogota:['City Layers','Museums, neighborhood walks and a change for dinner.'],
 'antigua-guatemala':['City Layers','Courtyards, craft and coffee stops.'],
 'san-juan':['Beach Edit','Coastal days with time for Old San Juan.'],
 santiago:['Cool Evenings','City days and a separate wine-country outing.'],
 medellin:['City Essentials','Street art and neighborhood time.'],
 oaxaca:['City Essentials','Markets, galleries and an evening meal.'],
}
export function shopmyPhotos(destinationId?:string) {
 const id=destinationId||'rio-de-janeiro',destination=getDestinationById(id)
 if(id==='rio-de-janeiro')return [rioCity2025[8],rioCity2025[2]].map(p=>({src:p.src,caption:p.caption}))
 const fresh=Object.entries(nextCityPhotos).filter(([key])=>key.startsWith(id+'-')).map(([,p])=>p)
 if(fresh.length>=5)return id==='cusco'?[fresh[1],fresh[2]]:[fresh[3],fresh[4]]
 if(!destination)return []
 const pool=getGuidesByDestination(id).filter(g=>g.heroPhoto&&g.heroPhoto!==destination.heroPhoto&&!/portrait|selfie|Guatapé|Teotihuac|Casablanca|Tequila|Sacred Valley/i.test(g.photoCaption||''))
 const ordered=[...pool.filter(g=>g.section==='shop'),...pool.filter(g=>g.section==='experiences'||g.section==='see'),...pool]
 const seen=new Set<string>(),photos:{src:string;caption:string}[]=[]
 for(const g of ordered)if(g.heroPhoto&&!seen.has(g.heroPhoto)){seen.add(g.heroPhoto);photos.push({src:g.heroPhoto,caption:g.photoCaption||`${destination.city} · editorial inspiration`})}
 if(photos.length<2){const p=destinationCardPhoto(destination,'plan');if(p.src&&!seen.has(p.src))photos.push({src:p.src,caption:p.caption})}
 return photos.slice(0,2)
}
export function shopmyPresentation(destinationId?:string,packing=false) {
 const photos=shopmyPhotos(destinationId),direction=directions[destinationId||'rio-de-janeiro']
 return shoppingEdits(destinationId,packing).map((edit,i)=>({...edit,photo:photos[i],label:i===0?(destinationId?direction?.[0]||'Travel Edit':'Travel Essentials'):packing?'Airport to Evening':'Finishing Touches',note:i===0?(destinationId?direction?.[1]:'A considered starting point for your next journey.'):'Explore the existing collection and choose what fits your plans.'}))
}
