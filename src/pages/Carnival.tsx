import { CarnivalFlourish } from '@/components/CarnivalFlourish';
import { CarnivalSeasonNote } from '@/components/CarnivalSeasonNote';
import { StyleBridge } from '@/components/StyleBridge';
import { getDestinationById } from '@/data';
import { Link } from 'react-router-dom'
import { rio2025 } from '@/data/rio-2025'
import { getMediaMomentsByDestination, getGuide } from '@/data'
import { MediaMomentPlayer } from '@/components/MediaMoment'
import { StoryCard } from '@/components/StoryCard'
export function Carnival() { return <article className="carnival-page mx-auto max-w-4xl px-5 pt-7 pb-10"><CarnivalFlourish/>
<p className="eyebrow text-terracotta">The firsthand diaries · March 2025</p><h1 className="my-3 font-display text-5xl italic">Carnival in Rio</h1><p className="mb-6 text-sm text-ink-soft">Rio de Janeiro · Brazil</p>
<CarnivalSeasonNote/>
<figure><img src={rio2025[1].src} alt={rio2025[1].subject} fetchPriority="high" style={{objectPosition:rio2025[1].focalPoint}} className="aspect-[4/3] w-full rounded-2xl object-cover"/><figcaption className="mt-2 text-xs text-ink-soft">Daytime street celebration · Rio Carnival, 2025</figcaption></figure>
<p className="my-7 max-w-xl font-display text-2xl leading-relaxed">Costumes, crowds and the view from the shade. A street-level photo diary from Rio in March 2025.</p>
<p className="mb-7 max-w-xl text-sm leading-relaxed text-ink-soft">The Jet Set LatAm archive connects Rio’s live culture with Carnival samba parades and Copacabana concerts. <a href="https://thebrunchmanifesto.blog/2025/11/02/experiencing-brazil-through-live-events-with-stubhub/" target="_blank" rel="noopener noreferrer" className="underline">Read the related events story ↗</a></p>
<div className="grid grid-cols-2 gap-3">{[2,3].map(i=><figure key={i}><img src={rio2025[i].src} alt={rio2025[i].subject} loading="lazy" style={{objectPosition:rio2025[i].focalPoint}} className="aspect-[3/4] w-full rounded-xl object-cover"/><figcaption className="mt-2 text-xs text-ink-soft">{rio2025[i].subject}</figcaption></figure>)}</div>
<figure className="mx-auto my-8 max-w-sm"><img src={rio2025[5].src} alt={rio2025[5].subject} loading="lazy" className="w-full rounded-2xl"/><figcaption className="mt-2 text-xs text-ink-soft">A personal postcard from the crowd · March 2025</figcaption></figure>
<section className="my-8"><p className="eyebrow text-terracotta">After the street scenes</p><h2 className="my-3 font-display text-3xl">A night at the Sambadrome</h2><div className="max-w-md">{getMediaMomentsByDestination('rio-de-janeiro').map(m=><MediaMomentPlayer key={m.id} moment={m} className="aspect-[3/4] w-full"/>)}</div></section>
<div className="my-8 flex flex-wrap gap-3"><Link className="rounded-full bg-ink px-5 py-3 text-sm text-cream" to="/plan?destination=rio-de-janeiro">Plan your Rio trip →</Link><Link className="px-5 py-3 text-sm text-terracotta" to="/guides/rio-carnival-2025">Save this photo diary ↗</Link></div>
<StyleBridge destination={getDestinationById('rio-de-janeiro')!} carnival />
<h2 className="mt-9 mb-4 font-display text-3xl">Keep a little Rio with you.</h2><div className="grid gap-5 sm:grid-cols-3">{['rio-centro-2025','gd-rio-etiquette-nightlife','wp-2135'].map(id=>{const g=getGuide(id);return g?<StoryCard key={id} guide={g}/>:null})}</div></article> }
