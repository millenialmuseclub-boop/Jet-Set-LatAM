import { Shirt, ArrowUpRight } from 'lucide-react'
import { openExternal } from '@/lib/links'
import { AffiliateDisclosure } from './AffiliateDisclosure'

// Real affiliate infrastructure, verified this pass (Pass 8): two ShopMy
// collection embeds found associated with Copacabana Palace content,
// consistent with the Jet Set LatAm creator's own real ShopMy platform.
// These are the ONLY two affiliate URLs wired into the app — do not add
// more without a URL verified the same way. ShopMy is inherently a wardrobe/
// shopping surface, so this is styled as a Luxe Jetter-flavored "shop the
// look" moment rather than a generic per-Place "Check Availability" button
// (no such per-place booking affiliate infra exists).
const SHOPMY_HOTEL_COLLECTION = 'https://shopmy.us/collections/embed/2799513'
const SHOPMY_CLOTHING_COLLECTION = 'https://shopmy.us/collections/embed/2687505'

export function ShopTheLookCard({ placeName }: { placeName: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-terracotta/10 via-cream to-cream p-4 ring-1 ring-terracotta/15">
      <div className="flex items-center gap-2">
        <Shirt size={16} className="text-terracotta" />
        <p className="text-[11px] uppercase tracking-[0.14em] text-terracotta">Luxe Jetter</p>
      </div>
      <p className="mt-1.5 font-display text-lg leading-tight text-ink">Shop the Look</p>
      <p className="mt-0.5 text-xs leading-relaxed text-ink-soft/65">
        What to wear for a stay at {placeName} — real pieces from the Jet Set LatAm wardrobe, hand-picked.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={() => openExternal(SHOPMY_HOTEL_COLLECTION)}
          className="flex items-center gap-1 rounded-full bg-ink px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-cream"
        >
          Hotel Edit <ArrowUpRight size={12} />
        </button>
        <button
          onClick={() => openExternal(SHOPMY_CLOTHING_COLLECTION)}
          className="flex items-center gap-1 rounded-full border border-ink/20 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-soft"
        >
          <Shirt size={12} /> Clothing Edit
        </button>
      </div>
      <AffiliateDisclosure className="mt-2.5" />
    </div>
  )
}
