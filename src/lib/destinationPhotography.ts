import { destinations, getGuidesByDestination } from '@/data'
import type { Destination, Guide } from '@/types'
import { guidesForSection, distinctStories } from './destinationReading'
import { readingPhotos } from '@/data/reading-photography'

const moodSections:Record<string,string>={'Food + nights':'eat',Eat:'eat',Fashion:'shop',Style:'shop',Culture:'see','Art + culture':'see','Beach days':'experiences',Beach:'experiences',Nature:'experiences',Nightlife:'drink',Adventure:'experiences','First Trip':'stay',Weekend:'experiences',Romantic:'stay'}
const regionalScene=/Guatapé|Casablanca|Teotihuac|Valladolid|Mérida|Amazon|Manaus|Tequila|Sacred Valley|traveler|portrait|selfie/i
// Build once from the bundled, credited city library. No random images or network requests.
const cityStories=new Map(destinations.map(d=>[d.id,distinctStories(getGuidesByDestination(d.id)).filter(g=>g.heroPhoto&&!regionalScene.test(g.photoCaption||''))]))
export function destinationCardPhoto(d:Destination,context:'atlas'|'plan'|'related'='atlas',mood='Every mood') {
 const stories=cityStories.get(d.id)||[]
 const card=d.cardPhoto&&d.cardPhoto!==d.heroPhoto&&!/guatape|casablanca|teotihuac/i.test(d.cardPhoto)?d.cardPhoto:stories.find(g=>g.heroPhoto!==d.heroPhoto)?.heroPhoto
 const alternate=stories.filter(g=>g.heroPhoto!==d.heroPhoto&&g.heroPhoto!==card)
 const matching=moodSections[mood]?guidesForSection(alternate,moodSections[mood]):[]
 const choice=matching[0]||(context==='plan'?alternate[0]:context==='related'?alternate[1]||alternate[0]:undefined)
 return choice?{src:choice.heroPhoto,caption:choice.photoCaption||`${d.city} · destination context`}:{src:card||d.heroPhoto,caption:`${d.city} · destination context`}
}
/** Lead with distinct photographs without removing any story or changing its saved ID. */
export function destinationOverviewStories(d:Destination,stories:Guide[]) {
 const seen=new Set([d.heroPhoto]),fresh:Guide[]=[],repeated:Guide[]=[]
 for(const g of stories){if(g.heroPhoto&&!seen.has(g.heroPhoto)){fresh.push(g);seen.add(g.heroPhoto)}else repeated.push(g)}
 return [...fresh,...repeated]
}

export function websiteReadingPhoto(d:Destination,section:string,used:Set<string>) {
 const stories=cityStories.get(d.id)||[]
 const ordered=[...guidesForSection(stories,section),...stories]
 const g=ordered.find(g=>g.heroPhoto&&g.heroPhoto!==d.heroPhoto&&g.heroPhoto!==d.cardPhoto&&!used.has(g.heroPhoto))
 const extra=readingPhotos[d.id]?.find(p=>!used.has(p.src))
 const spare=[d.cardPhoto,d.heroPhoto].find(src=>src&&!used.has(src))
 const photo=extra&&!used.has(extra.src)?{src:extra.src,caption:extra.caption+' · destination context'}:g?{src:g.heroPhoto,caption:g.photoCaption||`${d.city} · destination context`}:spare?{src:spare,caption:`${d.city} · destination context`}:destinationCardPhoto(d,'related')
 if(photo.src)used.add(photo.src)
 return photo
}
