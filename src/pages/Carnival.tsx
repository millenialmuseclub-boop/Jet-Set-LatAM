import { CarnivalFireworks } from '@/components/CarnivalFireworks';
import { rio2025 } from '@/data/rio-2025';
import { Link } from 'react-router-dom';
import { CarnivalFlourish } from '@/components/CarnivalFlourish';
import { CarnivalSeasonNote } from '@/components/CarnivalSeasonNote';
import { StyleBridge } from '@/components/StyleBridge';
import { getDestinationById, getMediaMomentsByDestination, getGuide } from '@/data';
import { sambadrome2025 as photos } from '@/data/sambadrome-2025';
import { MediaMomentPlayer } from '@/components/MediaMoment';
import { StoryCard } from '@/components/StoryCard';
function ArchiveFrame({ index, className = '', caption }: { index: number; className?: string; caption?: string }) {
  const photo = photos[index];
  return <figure className={className}><img src={photo.src} alt={photo.caption} loading="lazy" decoding="async"/><figcaption>{caption || photo.caption}</figcaption></figure>;
}
export function Carnival() {
  return <article className="carnival-page carnival-editorial mx-auto max-w-6xl pb-10">
    <header className="carnival-cover"><CarnivalFireworks/>
      <img src={photos[4].src} alt={photos[4].caption} fetchPriority="high" className="carnival-cover-photo"/>
      <div className="carnival-cover-shade"/>
      <div className="carnival-cover-copy"><p className="eyebrow">2025 · From the Jet Set archive</p><h1>Carnival<br/><em>in Rio.</em></h1><p>A night that stays with you.</p><a href="#/carnival#night" onClick={e=>{e.preventDefault();document.getElementById('night')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}} className="carnival-read">Step inside the Sambadrome ↓</a></div>
      <span className="carnival-cover-location">Rio de Janeiro · Brazil</span>
    </header>
    <section className="carnival-streets px-6 py-10 md:px-20"><p className="eyebrow text-terracotta">In the streets</p><h2 className="my-4 font-display text-4xl">Before the lights, <em>the city.</em></h2><p className="mb-6 max-w-lg text-sm leading-relaxed text-ink-soft">Sunlight, costumes and a place in the crowd. Another side of Carnival, from our March 2025 archive.</p><div className="grid grid-cols-[1.4fr_1fr] items-start gap-3">{[1,5].map((i,j)=><figure key={i} className={j?'pt-8':''}><img src={rio2025[i].src} alt={rio2025[i].subject} loading="lazy" className="aspect-[3/4] w-full object-cover" style={{objectPosition:rio2025[i].focalPoint}}/><figcaption className="pt-2 text-xs text-ink-soft">{j?'A personal postcard from the street.':'Daytime Carnival, Rio de Janeiro.'}</figcaption></figure>)}</div></section>
    <div className="carnival-night" id="night"><CarnivalFlourish/>
      <section className="carnival-intro motion-reveal"><p className="eyebrow">After dark / The Sambadrome</p><h2>Some nights<br/>deserve <em>the whole page.</em></h2><p>Floats like moving palaces. A stadium alive with color. Rio Carnival, through our lens — from the grandstands to the smallest golden detail.</p></section>
      <ArchiveFrame index={1} className="carnival-wide" caption="01 / The avenue becomes a stage. March 2025."/>
      <div className="carnival-pair"><ArchiveFrame index={2} caption="02 / Spectacle, built on an extraordinary scale."/><ArchiveFrame index={5} caption="03 / Blue, gold, and a thousand details."/></div>
      <section className="carnival-personal"><ArchiveFrame index={0} caption="04 / A little postcard from our night in the stands."/><div className="motion-reveal"><p className="eyebrow">Wish you were here</p><h2>In the crowd.<br/><em>In the moment.</em></h2><p>The view is spectacular. Being there is something else entirely.</p><span className="carnival-signature">With love, from Rio</span></div></section>
      <div className="carnival-detail"><div className="motion-reveal"><p className="eyebrow">The golden hour, after dark</p><h2>More is<br/><em>magnificent.</em></h2><p>A closer look at the light, craftsmanship and theatrical scale of the parade.</p></div><ArchiveFrame index={9} caption="05 / Gold catches every last light."/></div>
      <ArchiveFrame index={8} className="carnival-wide" caption="06 / Silver on the avenue. Phones in the air."/>
      <div className="carnival-pair carnival-final-pair"><ArchiveFrame index={6} caption="07 / Color in every direction."/><ArchiveFrame index={7} caption="08 / And above it all, the Rio night."/></div>
      <section className="carnival-film"><div><p className="eyebrow">Press play. Be there.</p><h2>The night,<br/><em>in motion.</em></h2><p>A moment from the Jet Set film archive.</p></div><div>{getMediaMomentsByDestination('rio-de-janeiro').map(m=><MediaMomentPlayer key={m.id} moment={m} className="aspect-[3/4] w-full"/>)}</div></section>
    </div>
    <div className="px-5 pt-8 md:px-10"><CarnivalSeasonNote/><div className="my-8 flex flex-wrap gap-3"><Link className="rounded-full bg-ink px-5 py-3 text-sm text-cream" to="/plan?destination=rio-de-janeiro">Plan your Rio trip →</Link><Link className="px-5 py-3 text-sm text-terracotta" to="/guides/rio-carnival-2025">The daytime Carnival diary ↗</Link></div><StyleBridge destination={getDestinationById('rio-de-janeiro')!} carnival/><h2 className="mt-9 mb-4 font-display text-3xl">Keep a little Rio with you.</h2><div className="grid gap-5 sm:grid-cols-3">{['rio-centro-2025','gd-rio-etiquette-nightlife','wp-2135'].map(id=>{const g=getGuide(id);return g?<StoryCard key={id} guide={g}/>:null})}</div></div>
  </article>;
}
