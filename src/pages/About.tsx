import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { appFamilyList, CREATOR_PORTFOLIO_URL } from '@/config/appFamily'
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure'
import { openExternal } from '@/lib/links'
import aboutWide from '@/assets/about/blog-about-wide.webp'
import aboutPortrait from '@/assets/about/blog-about-portrait.webp'
import rioSunset from '@/assets/rio/christ-redeemer-sunset.jpg'

// About copy and photography aligned with the blog’s /about/ page, September 2026.
export function About() {
  return (
    <div className="animate-fade-in mx-auto max-w-xl space-y-8 px-5 pt-6 pb-10 md:px-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-ink-soft/60">
        <ArrowLeft size={14} /> Back
      </Link>

      <div className="space-y-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-terracotta">About</p>
        <h1 className="font-display text-4xl leading-tight text-ink">Jet Set LatAM</h1>
        <p className="font-display text-2xl leading-snug text-ink">
          What began as a love letter to stylish living has grown into something bigger:
          an exploration of Latin America through travel, culture and fashion.
        </p>
        <div className="space-y-5 text-[15px] leading-relaxed text-ink-soft">
          <p>
            Jet Set LatAM is the new incarnation of The Brunch Manifesto. Our mission is
            to bring the luxury spotlight to Latin America — celebrating the vibrant
            destinations, heritage, and artistry that define this region’s quiet elegance.
            From wine valleys in Argentina to colonial cities in Mexico, every journey
            we share is rooted in mindful travel and authentic cultural connection.
          </p>
          <p>
            It all began in <Link to="/destinations/guadalajara" className="underline underline-offset-4">Guadalajara</Link>,
            {' '}the creative heart of Jalisco, where our stay at the award-winning{' '}
            <button type="button" className="underline underline-offset-4" onClick={() => openExternal('https://www.tripadvisor.com/Hotel_Review-g150798-d660067-Reviews-La_Perla_BnB-Guadalajara_Guadalajara_Metropolitan_Area.html')}>La Perla BnB</button>
            {' '}sparked our devotion to Latin American boutique stays, exceptional hospitality,
            and meaningful storytelling. That inspiration continues to guide everything
            we create at Jet Set LatAM — a modern travel platform dedicated to showcasing
            Latin luxury, signature stays, and immersive cultural experiences.
          </p>
          <p>
            Explore curated fashion, beauty, and travel collections inspired by our journeys on{' '}
            <button type="button" className="underline underline-offset-4" onClick={() => openExternal('https://shopmy.us/jetsetjordy')}>ShopMy</button>
            {' '}and{' '}
            <button type="button" className="underline underline-offset-4" onClick={() => openExternal('https://www.shopltk.com/explore/Jordy_JetSetLatAM?utm_campaign=creator_shop_share_template_flow&utm_source=ioscreatorapp')}>LTK</button>,
            {' '}featuring the designers, rituals, and travel essentials that embody the
            spirit of quiet luxury across Latin America.
          </p>
          <p>
            I curate journeys through Latin America with openness, curiosity, and kindness.
            While I sometimes highlight luxury, I always like to find elegance in new or
            unexpected experiences — preferably while walking or taking the metro.
          </p>
          <p className="font-display text-2xl text-ink">If you’re a fellow traveler, come and join the journey.</p>
        </div>
        <div className="space-y-3 pt-3">
          <img src={aboutWide} alt="Colorful street mural with a woman’s face and toucans" width={1000} height={567} loading="lazy" className="h-auto w-full" />
          <div className="grid grid-cols-2 items-start gap-3">
            <img src={aboutPortrait} alt="Colorful Tequila letters and a gazebo beneath festive paper banners" width={1000} height={989} loading="lazy" className="h-auto w-full" />
            <img src={rioSunset} alt="Silhouette of Christ the Redeemer on Corcovado Mountain in Rio de Janeiro at sunset" loading="lazy" className="h-auto w-full" />
          </div>
        </div>
        <p className="text-sm text-ink-soft/50">
          ©{' '}2026{' '}
          <button type="button" onClick={() => openExternal(CREATOR_PORTFOLIO_URL)} className="underline decoration-ink-soft/20 underline-offset-2">
            @jordypop
          </button>
        </p>
      </div>

      <div className="border-t border-ink/10 pt-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink-soft/40">Affiliate Disclosure</p>
        <AffiliateDisclosure className="mt-2 text-xs" />
      </div>

      <div className="border-t border-ink/10 pt-6">
        <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-ink-soft/40">Our World</p>
        <p className="mb-4 text-xs text-ink-soft/50">The Jordypop family of travel apps — built for the same traveler.</p>
        <div className="space-y-2.5">
          {appFamilyList.map((app) => {
            const isHere = app.id === 'jet-set-latam'
            const href = isHere ? undefined : (app.iOSURL ?? app.webURL)
            const body = (
              <>
                {app.iconUrl ? <img src={app.iconUrl} alt={app.name + " app icon"} width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 rounded-xl" /> : <app.icon size={16} className="shrink-0 text-ink-soft/50" />}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink-soft/85">{app.name}</p>
                  <p className="text-[11px] text-ink-soft/45">{app.oneLiner}</p>
                </div>
                <span className="ml-auto shrink-0 text-[10px] uppercase tracking-[0.1em] text-ink-soft/35">
                  {isHere ? "You're here" : 'App Store ↗'}
                </span>
              </>
            )
            return href ? (
              <button
                key={app.id}
                type="button"
                onClick={() => openExternal(href)}
                className="family-row flex w-full items-center gap-3 rounded-xl bg-cream/60 p-3 text-left ring-1 ring-ink/5 transition-colors hover:bg-cream"
              >
                {body}
              </button>
            ) : (
              <div key={app.id} className="flex items-center gap-3 rounded-xl bg-cream/60 p-3 ring-1 ring-ink/5">
                {body}
              </div>
            )
          })}
        </div>
      </div>

      <p className="pt-4 text-center text-[11px] italic text-ink-soft/40">
        A{' '}
        <button type="button" onClick={() => openExternal(CREATOR_PORTFOLIO_URL)} className="underline decoration-ink-soft/20 underline-offset-2">
          @jordypop
        </button>
        {' '}project
      </p>
    </div>
  )
}
