import { Link } from 'react-router-dom'
import type { Destination, Guide } from '@/types'
import { guidesForSection } from '@/lib/destinationReading'
import { editorialLinks } from '@/data/editorial-links'
import { openExternal } from '@/lib/links'
import { Carousel } from './Carousel'
import { StoryCard } from './StoryCard'

const titles:Record<string,string>={stay:'Find your base',eat:'At the table',drink:'Coffee and after dark',shop:'Style and local finds',see:'A closer look',experiences:'Make a day of it'}
export function DestinationReading({destination,guides,section}:{destination:Destination;guides:Guide[];section:string}) {
 const stories=guidesForSection(guides,section)
 const published=editorialLinks.filter(g=>g.destinationId===destination.id&&g.section===section)
 return <section className="space-y-4" aria-label={`${destination.city} ${section} reading`}>
  {(stories.length>0||published.length>0)&&<div className="section-heading"><h2>{titles[section]||'From the Journal'}</h2><Link to={`/explore?destination=${destination.id}`}>City journal ↗</Link></div>}
  {stories.length>0&&<Carousel label={`${destination.city} ${section} stories`}>{stories.slice(0,6).map(g=><StoryCard key={g.id} guide={g} compact/>)}</Carousel>}
  {published.map(g=><button key={g.id} onClick={()=>openExternal(g.url)} className="block w-full rounded-2xl bg-cream p-5 text-left ring-1 ring-ink/5"><span className="eyebrow text-terracotta">Latest from the website · opens online</span><span className="mt-2 block font-display text-2xl">{g.title} ↗</span></button>)}
  {section==='stay'&&!stories.length&&destination.neighborhoods.length>0&&<Link to={`/destinations/${destination.slug}?tab=neighborhoods`} className="block rounded-2xl bg-cream p-5"><span className="eyebrow text-terracotta">Choose your neighborhood</span><span className="mt-2 block font-display text-2xl">Get to know {destination.city} before choosing a base →</span><span className="mt-2 block text-sm text-ink-soft">{destination.neighborhoods.map(n=>n.name).join(' · ')}</span></Link>}
 </section>
}
