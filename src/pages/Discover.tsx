import { CarnivalFireworks } from '@/components/CarnivalFireworks';
import { rioCity2025 } from '@/data/rio-city-2025';
import { CarnivalFlourish } from '@/components/CarnivalFlourish';
import { carnivalState } from '@/lib/carnivalSeason';
import { useSearchParams } from 'react-router-dom';
import { JetSetNow } from '@/components/JetSetNow';
import { useTripClock } from '@/lib/useTripClock';
import { getSavedTrips,getEffectiveItinerary } from '@/lib/storage';
import { tripPhase } from '@/lib/tripLifecycle';
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/Photo";
import { StoryCard } from "@/components/StoryCard";
import {
  destinations,
  guides,
  getJetSetPicks,
  getPlacePhoto,
} from "@/data";
import { sambadrome2025 } from "@/data/sambadrome-2025";
export function Discover() {
  const now=useTripClock(); const [params]=useSearchParams();
  if(params.get('discover')!=='1'&&getSavedTrips().some(t=>tripPhase(t,getEffectiveItinerary(t.itineraryId),now)==='active'))return <JetSetNow/>;
  const hero = sambadrome2025[3];
  const edit = ["wp-10093", "gd-rio-santa-teresa", "wp-8659"]
    .map((id) => guides.find((g) => g.id === id))
    .filter((g) => !!g);
  const picks = ["cartagena", "mexico-city", "sao-paulo"]
    .map(
      (id) =>
        getJetSetPicks(id).find((p) => p.photos.length) ||
        getJetSetPicks(id)[0],
    )
    .filter((p) => !!p);
  return (
    <div className="home-page mx-auto max-w-6xl pb-6">
      <section aria-label="Featured destination" className="px-5 pt-3 md:px-8">
        <div className="home-cover relative isolate overflow-hidden rounded-[24px] bg-jungle-dark">
          <CarnivalFireworks/>
          <Photo
            src={hero.src}
            seed="home-hero"
            alt={hero.caption}
            priority
            className="h-[460px] w-full md:h-[610px]"
            rounded="rounded-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-cream md:p-10">
            <div className="home-carnival-sparks"><CarnivalFlourish/></div>
            <p className="eyebrow carnival-accent text-gold-light">
              Rio de Janeiro · Carnival 2025
            </p>
            <h1 className="mt-2 font-display text-[52px] leading-none md:text-7xl">
              Rio, after dark.
            </h1>
            <p className="mt-3 max-w-sm text-sm text-cream/85">
              From the Jet Set archive. One extraordinary night, through our lens.
            </p>
            <Link
              to="/carnival"
              className="mt-5 inline-flex min-h-11 items-center gap-4 rounded-full bg-cream px-5 text-xs font-medium text-ink"
            >
              Enter Carnival <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section aria-labelledby="jetting-title" className="home-section">
        <div className="section-heading">
          <h2 id="jetting-title">Currently Jetting</h2>
          <Link to="/destinations">All destinations ↗</Link>
        </div>
        <div className="photo-rail">
          {destinations
            .filter((d) => d.status !== "coming-soon")
            .map((d) => (
              <Link
                key={d.id}
                to={`/destinations/${d.slug}`}
                className="w-[130px] shrink-0 snap-start"
              >
                <Photo
                  src={d.heroPhoto}
                  seed={d.id}
                  alt={d.city}
                  className="h-[110px] w-full"
                />
                <p className="mt-2 text-sm font-medium">{d.city}</p>
                <p className="text-[10px] uppercase tracking-wider text-ink-soft/60">
                  {d.country}
                </p>
              </Link>
            ))}
        </div>
      </section>
      <section aria-labelledby="edit-title" className="home-section">
        <div className="section-heading">
          <h2 id="edit-title">The Edit</h2>
          <Link to="/explore">Into the journal ↗</Link>
        </div>
        <div className="home-editorial-stack">
          {edit.map((g) => (
            <StoryCard key={g.id} guide={g} compact />
          ))}
        </div>
      </section>
      <section aria-labelledby="plan-title" className="home-section">
        <Link to="/plan" className="plan-postcard group relative grid grid-cols-[1fr_1.15fr] overflow-hidden border-y border-terracotta/25 bg-[#efe2d9] text-ink">
          <div className="relative min-h-[170px] overflow-hidden"><img src={rioCity2025[8].src} alt={rioCity2025[8].caption} loading="lazy" className="absolute inset-0 h-full w-full object-cover"/><span className="absolute bottom-3 left-3 text-[9px] uppercase tracking-[.16em] text-white [text-shadow:0_1px_4px_#000]">A postcard from Rio</span></div>
          <div className="relative flex flex-col justify-center px-5 py-4"><p className="text-[9px] uppercase tracking-[.19em] text-terracotta">A few days away</p><h2 id="plan-title" className="my-2 font-display text-[32px] italic leading-[.95]">Make room<br/>for a getaway.</h2><span className="mt-3 inline-flex items-center gap-3 text-xs">Plan your trip <ArrowRight size={15}/></span></div>
        </Link>
      </section>
      <section aria-labelledby="picks-title" className="home-section">
        <div className="section-heading">
          <h2 id="picks-title">Jet Set Picks</h2>
          <Link to="/destinations">Find your favorites ↗</Link>
        </div>
        <div className="home-pick-cabinet">
          {picks.map((p) => {
            const photo = getPlacePhoto(p);
            return (
              <Link
                key={p.id}
                to={`/destinations/${destinations.find((d) => d.city === p.city)?.slug}`}
                className="w-[200px] shrink-0 snap-start"
              >
                <Photo
                  src={photo.src}
                  seed={p.id}
                  alt={photo.caption}
                  className="h-36 w-full"
                />
                <p className="mt-2 text-[10px] uppercase tracking-wider text-terracotta">
                  {p.city}
                </p>
                <h3 className="font-display text-xl">{p.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-ink-soft/70">
                  {p.pickDetails?.goFor}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
      <section aria-label="Carnival seasonal feature" className="home-section">
        <Link
          to="/carnival"
          className="relative flex h-44 items-end overflow-hidden rounded-2xl p-5 text-cream"
        >
          <Photo
            src={sambadrome2025[7].src}
            seed="rio-feature"
            alt={sambadrome2025[7].caption}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />
          <div className="relative">
            <p className="eyebrow text-gold-light">
              Rio de Janeiro
            </p>
            <h2 className="mt-1 font-display text-3xl">
              {carnivalState(now)==='archive'?'Carnival Archive':carnivalState(now)==='during'?'Carnival in Rio':'Carnival is coming'}
            </h2>
            <p className="mt-1 text-xs">Experience Carnival →</p>
          </div>
        </Link>
      </section>
      <section aria-labelledby="continue-title" className="home-section">
        <Link
          to="/explore"
          className="flex items-center justify-between border-t border-ink/15 pt-6 pb-3"
        >
          <div>
            <p className="eyebrow text-terracotta">There’s more out there</p>
            <h2 id="continue-title" className="mt-1 font-display text-3xl">
              Continue Exploring
            </h2>
          </div>
          <ArrowRight size={22} />
        </Link>
        <nav aria-label="Discover explore shortcuts" className="grid grid-cols-4 gap-2 border-b border-ink/15 pb-4">
          {[["Ask", "/ask"], ["Trails", "/explore?category=Trails"], ["Carnival", "/carnival"], ["City Guides", "/explore?category=City+Guides"]].map(([label, to]) => (
            <Link key={label} to={to} className="flex min-h-11 items-center justify-center gap-1 rounded-md bg-cream px-1 text-[10px] text-terracotta transition-colors hover:bg-terracotta/10 focus-visible:outline-2 focus-visible:outline-terracotta">
              {label} <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </section>
    </div>
  );
}
