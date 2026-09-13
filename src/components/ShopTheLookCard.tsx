import { styleOffers } from '@/data/style'
import { openExternal } from '@/lib/links'
import { AffiliateDisclosure } from './AffiliateDisclosure'
// Historical component name retained; this is the verified stays collection.
export function ShopTheLookCard({placeName}:{placeName:string}) {
 const offer=styleOffers.find(o=>o.id==='rio-stays'&&o.status==='active'); if(!offer) return null
 return <aside className="rounded-2xl border border-ink/10 bg-cream p-4"><p className="eyebrow text-ink-soft">Related stays · ShopMy</p><h3 className="mt-2 font-display text-xl">{offer.title}</h3><p className="mt-2 text-xs text-ink-soft">A collection including {placeName} and other Rio hotels.</p><button onClick={()=>openExternal(offer.affiliateUrl)} className="min-h-11 text-sm text-terracotta">{offer.cta} ↗</button><AffiliateDisclosure className="mt-2"/></aside>
}
