import { shoppingEdits, shopmyProfile } from '@/data/shopmy'
import { openExternal } from '@/lib/links'
import { AffiliateDisclosure } from './AffiliateDisclosure'
import { appFamily } from '@/config/appFamily'
import { getDestinationById } from '@/data'
import { Photo } from './Photo'
import { destinationStyle } from '@/data/style'

export function ShopMyEdit({destinationId, packing=false, compact=false}: {destinationId?:string;packing?:boolean;compact?:boolean}) {
 const edits = shoppingEdits(destinationId, packing).filter(edit => /^https:\/\/shopmy\.us\//.test(edit.url))
 const destination = destinationId ? getDestinationById(destinationId) : undefined
 const style = destinationId ? destinationStyle[destinationId] : undefined
 if (!edits.length) return null
 return <aside aria-label="ShopMy travel edits" className={`shopping-editorial ${compact ? 'shopping-compact' : ''}`}>
  {!compact && destination?.heroPhoto && <figure className="shopping-scene"><Photo src={destination.cardPhoto || destination.heroPhoto} seed={destination.id} alt={`${destination.city} · travel inspiration`} className="h-40 w-full"/><figcaption>{destination.city} · the inspiration</figcaption></figure>}
  <div className="shopping-copy"><p className="eyebrow text-terracotta">The Jet Set Edit · ShopMy</p>
  <h3 className="mt-2 font-display text-3xl">{packing && destination ? `What we’d bring to ${destination.city}` : packing ? 'Jet Set essentials' : 'A little of the trip, in your wardrobe.'}</h3>
  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{style?.body || 'From the journey there to your first evening out. Explore Jordy’s existing fashion and accessory edits.'}</p>
  <div className="shopping-collection-grid">{edits.map((edit, i) => <button key={edit.url} type="button" onClick={()=>openExternal(edit.url)} className="shopping-collection"><span className="eyebrow">{i === 0 ? 'The travel edit' : packing ? 'For the journey' : 'The finishing touch'}</span><strong>{edit.title}</strong><span>Explore collection ↗</span></button>)}</div>
  <p className="my-3 text-xs text-ink-soft">Collections open on ShopMy. Check current prices and availability there; individual pieces may change.</p>
  {!compact && <button type="button" onClick={() => openExternal(appFamily['luxe-jetter'].iOSURL)} className="luxe-shopping-link"><img src={appFamily['luxe-jetter'].iconUrl} alt="" loading="lazy" decoding="async" width="44" height="44"/><span><strong>Want the whole wardrobe?</strong><span>Build your trip edit in Luxe Jetter ↗</span></span></button>}
  <button type="button" onClick={()=>openExternal(shopmyProfile)} className="min-h-11 text-xs underline underline-offset-4 text-ink-soft">Browse the full ShopMy shop ↗</button>
  <AffiliateDisclosure className="mt-2"/></div>
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
