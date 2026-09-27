import type { Destination, Guide, Place } from '@/types'
import { storyCovers } from './story-photography'
import { finalTravelPhotos } from './final-travel-photos'
import cafeTortoni from '@/assets/story-covers/ba-cafe.webp'
import teatroColon from '@/assets/story-covers/ba-theater.webp'
import chapultepec from '@/assets/story-covers/cdmx-park.webp'
import palermo from '@/assets/story-covers/ba-palermo.webp'
import recoleta from '@/assets/story-covers/ba-hotel.webp'
import waterfront from '@/assets/story-covers/ba-waterfront.webp'
import centro from '@/assets/story-covers/ba-subte.webp'

type CardPhoto = { src?: string; caption: string; context: boolean }
// Only these additions are verified photographs of the named place.
const verifiedPlacePhotos: Record<string,string> = {'pl-cafe-tortoni':cafeTortoni,'pl-teatro-colon':teatroColon,'pl-chapultepec-park':chapultepec}
// Existing stock/context images must not be presented as photographs of a named business.
const contextualPlaceIds = new Set(['pl-santa-teresa-hotel','pl-carmen-medellin','pl-plaza-santo-domingo','pl-blue-apple-resort'])
const normalize = (text:string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
const categoryScenes: Partial<Record<Place['category'],RegExp>> = {
  cafe:/cafe|coffee|pastry/,restaurant:/food|market|meal|cafe/,
  nightlife:/tango|night|music/,bar:/night|drink|tango/,hotel:/hotel|architecture/,
  park:/park|forest|garden|jacaranda/,beach:/beach|shore|coast/,
  museum:/art|gallery|mural|theater/,shop:/design|market|shop|street/,
}

export function buildPlacePhotography(destinations: Destination[], places: Place[], guides: Guide[]) {
  const result = new Map<string,CardPhoto>()
  for (const destination of destinations) {
    const local = places.filter(p=>destination.placeIds.includes(p.id))
    const candidates: {src:string;caption:string}[] = []
    const add = (src: string | undefined, caption: string) => {
      if(src && src!==destination.heroPhoto && !candidates.some(p=>p.src===src)) candidates.push({src,caption})
    }
    const archiveKey = destination.id==='rio-de-janeiro'?'rio':destination.id
    for(const p of finalTravelPhotos[archiveKey as keyof typeof finalTravelPhotos]||[]) {
      if(!/traveler/i.test(p.caption)) add(p.src,p.caption)
    }
    for(const guide of guides.filter(g=>g.destinationId===destination.id)) {
      const cover=storyCovers[guide.id]
      const caption=cover?.caption||guide.photoCaption||`${destination.city} travel context`
      // Keep regional excursions and personal portraits out of unrelated city venue cards.
      if(!/Amazon|Manaus|Teotihuac|Valladolid|Mérida|Guatapé|Casablanca|Tequila|traveler|portrait|selfie|butterfly sanctuary/i.test(caption)) add(guide.heroPhoto,caption)
    }
    for(const p of local) for(const photo of p.photos) if(!contextualPlaceIds.has(p.id)) add(photo,p.name)
    for(const n of destination.neighborhoods) add(n.heroPhoto,n.name)
    add(destination.cardPhoto,`${destination.city} streets`)
    // Count verified images too, so fallback cards first use photos not already in the place list.
    const uses=new Map<string,number>()
    for(const place of local) {
      const src=verifiedPlacePhotos[place.id]||(!contextualPlaceIds.has(place.id)?place.photos[0]:undefined)
      if(src){result.set(place.id,{src,caption:place.name,context:false});uses.set(src,(uses.get(src)||0)+1)}
    }
    let previous=''
    for(const place of local) {
      const actual=result.get(place.id)
      if(actual){previous=actual.src||'';continue}
      const areas=normalize(place.neighborhood||'').split(/[(),/&]/).map(s=>s.trim()).filter(s=>s.length>4)
      function score(photo:{src:string;caption:string}) {
        const caption=normalize(photo.caption)
        return (uses.get(photo.src)||0)*5 - (areas.some(area=>caption.includes(area))?3:0) - (categoryScenes[place.category]?.test(caption)?3:0)
      }
      const choice=candidates.filter(p=>p.src!==previous).sort((a,b)=>score(a)-score(b))[0]||candidates[0]
      const src=choice?.src||destination.cardPhoto||destination.heroPhoto
      result.set(place.id,{src,caption:`City context · ${choice?.caption||destination.city}`,context:true})
      uses.set(src,(uses.get(src)||0)+1);previous=src
    }
  }
  return result
}

export function supplementPhotoCredits(destinations: Destination[], guides: Guide[]) {
  for(const destination of destinations) {
    const credits=[...(destination.photoCredits||[])]
    for(const guide of guides.filter(g=>g.destinationId===destination.id)) {
      if(guide.photoCredit&&guide.heroPhoto&&!credits.some(c=>c.photo===guide.heroPhoto)) {
        const c=guide.photoCredit;credits.push({photo:guide.heroPhoto,credit:`Photo by ${c.author} / Wikimedia Commons, ${c.license}`,sourceUrl:c.sourceUrl,licenseUrl:c.licenseUrl})
      }
      const credit=credits.find(c=>c.photo===guide.heroPhoto)
      if(!guide.photoCredit&&credit) {
        const license=credit.credit.split(', ').pop()||''
        const version=license.match(/[\d.]+$/)?.[0]
        if(version)guide.photoCredit={author:credit.credit.replace(/^Photo by /,'').split(' / Wikimedia')[0],license,sourceUrl:credit.sourceUrl,licenseUrl:credit.licenseUrl||`https://creativecommons.org/licenses/${license.includes('SA')?'by-sa':'by'}/${version}/`}
      }
    }
    destination.photoCredits=credits
  }
  // Neighborhood photos are actual views from these areas, rather than unrelated place images.
  const ba=destinations.find(d=>d.id==='buenos-aires')
  const neighborhoodPhotos:Record<string,string>={'nb-palermo-soho':palermo,'nb-recoleta':recoleta,'nb-centro-ba':centro,'nb-puerto-madero':waterfront}
  for(const n of ba?.neighborhoods||[]) if(neighborhoodPhotos[n.id])n.heroPhoto=neighborhoodPhotos[n.id]
}
