import { shoppingEdits, shopmyProfile } from '@/data/shopmy'
import { openExternal } from '@/lib/links'
import { AffiliateDisclosure } from './AffiliateDisclosure'
export function ShopMyEdit({destinationId, packing=false, compact=false}: {destinationId?:string;packing?:boolean;compact?:boolean}) {
 return <aside aria-label="ShopMy travel edits" className={compact?'mt-5 border-t border-ink/15 pt-4':'my-6 border border-ink/15 bg-cream p-5'}>
  <p className="eyebrow text-terracotta">The Jet Set shopping edit · ShopMy</p>
  <h3 className="mt-2 font-display text-2xl">{packing?'A little outfit inspiration before you pack.':'Bring a little of the trip home.'}</h3>
  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{packing?'Browse Jordy’s fashion and accessory collections alongside your packing plans.':'Explore Jordy’s curated collections, inspired by travel, style and Latin America.'}</p>
  <div className="mt-3 divide-y divide-ink/10">{shoppingEdits(destinationId,packing).map(edit=><button key={edit.url} type="button" onClick={()=>openExternal(edit.url)} className="flex min-h-12 w-full items-center justify-between gap-3 py-3 text-left text-sm text-terracotta"><span>{edit.title}</span><span aria-hidden="true">↗</span></button>)}</div>
  <button type="button" onClick={()=>openExternal(shopmyProfile)} className="min-h-11 text-xs underline underline-offset-4 text-ink-soft">Browse the full ShopMy shop ↗</button>
  <AffiliateDisclosure className="mt-2"/>
 </aside>
}

export function CartagenaShopMyStays() {
 return <aside aria-label="Cartagena stays and experiences on ShopMy" className="my-6 border border-ink/15 bg-cream p-5">
 <p className="eyebrow text-terracotta">From Jordy’s ShopMy</p>
 <h3 className="mt-2 font-display text-2xl">Stay a little longer in Cartagena.</h3>
 <p className="mt-2 text-sm text-ink-soft">Explore the existing collection of Cartagena hotels, island tours and dining spots. Check current availability with the provider.</p>
 <button type="button" onClick={()=>openExternal('https://shopmy.us/shop/collections/2823918')} className="min-h-12 text-sm text-terracotta">Explore Destination Cartagena ↗</button>
 <AffiliateDisclosure className="mt-2"/>
 </aside>
}
