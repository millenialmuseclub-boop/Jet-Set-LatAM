import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Photo } from './Photo'
import { discoveryIntents, intentCollections, intentTab, newDestinations, type DiscoveryIntent } from '@/lib/discovery'

export function DiscoveryCollections() {
  const [intent, setIntent] = useState<DiscoveryIntent | null>(null)
  const [surprise, setSurprise] = useState<string | null>(null)
  const collection = intent ? intentCollections[intent] : []
  const cities = intent ? collection.slice(0, 4).map(item => item.destination) : newDestinations
  const experiences = intent ? collection.flatMap(item => item.places.map(place => ({ place, destination: item.destination }))) : []
  const seen = new Set<string>()
  const photographed = experiences.filter(({ place }) => {
    const photo = place.photos[0]
    if (!photo || seen.has(photo)) return false
    seen.add(photo)
    return true
  }).slice(0, 4)
  const surpriseDestination = intentCollections[intent ?? 'Weekend'].find(item => item.destination.id === surprise)?.destination
  function surpriseMe() {
    const candidates = intentCollections[intent ?? 'Weekend'].filter(item => item.destination.id !== surprise)
    if (candidates.length) setSurprise(candidates[Math.floor(Math.random() * candidates.length)].destination.id)
  }
  return <section className="home-section discovery-collections" aria-labelledby="discovery-title">
    <div className="section-heading"><h2 id="discovery-title">Where will the mood take you?</h2></div>
    <div className="intent-strip" aria-label="Discovery intent">
      <button aria-pressed={!intent} onClick={() => { setIntent(null); setSurprise(null) }}>New to Jet Set</button>
      {discoveryIntents.map(value => <button key={value} aria-pressed={intent === value} onClick={() => { setIntent(value); setSurprise(null) }}>{value}</button>)}
    </div>
    <div className="section-heading mt-4"><h3 className="font-display text-2xl">{intent ? `${intent} energy` : 'Four fresh perspectives'}</h3><Link to="/destinations">All destinations ↗</Link></div>
    <div className="discovery-city-grid" aria-live="polite">
      {cities.map(d => <Link key={d.id} to={`/destinations/${d.slug}${intent ? `?tab=${intentTab[intent]}` : ''}`} className="discovery-city">
        <Photo src={d.cardPhoto || d.heroPhoto} seed={d.id} alt={d.city} className="h-44 w-full"/>
        <div><p className="text-[10px] uppercase tracking-wider">{d.country}</p><h3 className="font-display text-2xl">{d.city}</h3></div>
      </Link>)}
    </div>
    {photographed.length > 0 && <div className="mt-5"><h3 className="mb-3 font-display text-2xl">A few places to start</h3><div className="photo-rail">{photographed.map(({ place, destination }) => <Link className="w-44 shrink-0" key={place.id} to={`/destinations/${destination.slug}?tab=${intentTab[intent!]}`}><Photo src={place.photos[0]} seed={place.id} alt={place.name} className="h-32 w-full"/><p className="mt-2 text-xs text-terracotta">{place.city}</p><h4 className="font-display text-xl">{place.name}</h4><p className="line-clamp-2 text-xs text-ink-soft">{place.pickDetails?.goFor || place.description}</p></Link>)}</div></div>}
    <div className="surprise-strip"><button onClick={surpriseMe}>Surprise me ↗</button><div aria-live="polite">{surpriseDestination ? <Link to={`/destinations/${surpriseDestination.slug}`}><strong>{surpriseDestination.city}</strong> · {surpriseDestination.tagline} <span className="underline">Explore →</span></Link> : <p>A little spontaneity, from the Jet Set collection.</p>}</div></div>
  </section>
}
