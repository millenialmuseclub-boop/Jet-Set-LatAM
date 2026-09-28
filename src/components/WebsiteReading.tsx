import { editorialLinks } from '@/data/editorial-links'
import { getDestinationById } from '@/data'
import { openExternal } from '@/lib/links'
import { websiteReadingPhoto } from '@/lib/destinationPhotography'
import { Carousel } from './Carousel'
import { Photo } from './Photo'

const sections:Record<string,string[]>={Food:['eat','drink'],'City Guides':['stay','experiences'],Shopping:['shop'],Style:['shop'],'Art + Design':['see'],'Weekend Somewhere':['experiences']}
const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
export function WebsiteReading({destination='',category='All',query='',excludedPhotos}:{destination?:string;category?:string;query?:string;excludedPhotos?:string[]}) {
 const articles=editorialLinks.filter(a=>(!destination||a.destinationId===destination)&&(category==='All'||sections[category]?.includes(a.section))&&(!query||normalize(a.title+' '+getDestinationById(a.destinationId)?.city).includes(normalize(query))))
 if(!articles.length)return null
 const used=new Set(excludedPhotos)
 return <section className="mt-8" aria-label="Latest website reading"><div className="section-heading"><h2>Fresh from the website</h2></div><Carousel label="Published city reading">{articles.map(a=>{
  const city=getDestinationById(a.destinationId)!
  const photo=websiteReadingPhoto(city,a.section,used)
  return <button key={a.id} onClick={()=>openExternal(a.url)} className="w-[255px] shrink-0 snap-start text-left"><Photo src={photo.src} seed={a.id} alt={photo.caption} className="aspect-[4/3] w-full"/><p className="mt-3 text-[10px] uppercase tracking-wider text-terracotta">{city.city} · Opens online</p><h3 className="mt-1 font-display text-[23px] leading-tight">{a.title} ↗</h3><p className="mt-2 text-[10px] text-ink-soft">Photo: {photo.caption}</p></button>
 })}</Carousel></section>
}
