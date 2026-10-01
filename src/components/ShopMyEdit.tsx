import { useState } from 'react'
import { shopmyProfile, shopmyEdits } from '@/data/shopmy'
import { collectionProducts, emptyCollections, destinationProductOffset, type ShopMyProduct } from '@/data/shopmy-products'
import { shopmyPresentation, shopmyPhotos } from '@/lib/shopmyPresentation'
import { openExternal } from '@/lib/links'
import { AffiliateDisclosure } from './AffiliateDisclosure'
import { appFamily } from '@/config/appFamily'
import { getDestinationById } from '@/data'
import { Photo } from './Photo'
import { wardrobeCompanion } from '@/lib/companionLinks'

function ProductPreview({ product, url }: {product: ShopMyProduct; url: string}) {
 const [failed, setFailed] = useState(false)
 const [brand, ...description] = product.name.split(' | ')
 return <button type="button" className="edit-product" onClick={()=>openExternal(url)} aria-label={`Find ${product.name} in the ShopMy collection`}>
  <span className="edit-product-image">{failed ? <span>See this piece on ShopMy</span> : <img src={product.image} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={()=>setFailed(true)}/>}</span>
  <span className="edit-product-brand">{description.length ? brand : 'The selection'}</span>
  <span className="edit-product-name">{description.length ? description.join(' | ') : brand}</span>
  <span className="edit-product-action">Find in collection ↗</span>
 </button>
}

export function ShopMyEdit({destinationId, packing=false, compact=false, wardrobe=true}: {destinationId?:string;packing?:boolean;compact?:boolean;wardrobe?:boolean}) {
 const edits=shopmyPresentation(destinationId,packing)
 const destination=destinationId?getDestinationById(destinationId):undefined
 const city=destinationId==='rio-de-janeiro'?'Rio':destination?.city
 const available=edits.filter(edit=>!Object.entries(shopmyEdits).some(([key,value])=>value.url===edit.url&&emptyCollections.has(key)))
 const primary=available[0]
 const key=Object.entries(shopmyEdits).find(([,value])=>value.url===primary?.url)?.[0]
 const offset=destinationId?destinationProductOffset[destinationId]||0:0
 const products=(collectionProducts[key||'']||[]).slice(offset,offset+3)
 const photo=edits[0]?.photo
 const tone=destinationId==='mexico-city'?'emerald':destinationId==='rio-de-janeiro'?'rose':destinationId==='cartagena'?'tropical':destinationId==='salvador'?'sun':destinationId==='panama-city'?'city':'sand'
 return <aside aria-label={city?`ShopMy edit for ${city}`:'ShopMy travel edits'} className={`shopping-editorial shopping-feature edit-tone-${tone} ${compact?'shopping-compact':''}`}>
  <div className="edit-opening">
   {photo&&<figure className="edit-destination-photo"><Photo src={photo.src} seed={destinationId||'travel-edit'} alt={photo.caption} rounded=""/><figcaption>Destination inspiration</figcaption></figure>}
   <div className="edit-introduction"><p className="eyebrow">The Jet Set Edit · {city||'In transit'}</p>
    <h3>{packing?city?`A suitcase for ${city}.`:'A wardrobe for the journey.':primary?.title||`A little ${city||'travel'} inspiration.`}</h3>
    <p>{edits[0]?.note}</p>
    {primary&&<button type="button" className="edit-primary-link" onClick={()=>openExternal(primary.url)}>Explore {primary.title} ↗</button>}
   </div>
  </div>
  <div className="shopping-copy">
   {products.length>0&&<><div className="edit-selection-heading"><p className="eyebrow">From the collection</p><span>A few pieces to start with</span></div><div className="edit-products">{products.map(product=><ProductPreview key={product.image} product={product} url={primary!.url}/>)}</div><p className="edit-availability">Product previews from {primary!.title}. Find current details and availability on ShopMy.</p></>}
   {available.slice(1).map(edit=><button key={edit.url} type="button" className="edit-companion" onClick={()=>openExternal(edit.url)}><span><span className="eyebrow">For the rest of the journey</span><strong>{edit.title}</strong></span><span aria-hidden="true">↗</span></button>)}
   {!compact&&wardrobe&&<button type="button" onClick={()=>openExternal(destinationId?wardrobeCompanion(destinationId,undefined,packing).url:appFamily['luxe-jetter'].iOSURL)} className="luxe-shopping-link"><img src={appFamily['luxe-jetter'].iconUrl} alt="" loading="lazy" decoding="async" width="44" height="44"/><span><strong>Plan my wardrobe in Luxe Jetter</strong><span>Turn your trip plans into a wardrobe ↗</span></span></button>}
   {!compact&&<button type="button" onClick={()=>openExternal('https://thebrunchmanifesto.blog/latin-america-shopping-guides/#shop-destination-edits')} className="edit-companion"><span><span className="eyebrow">The Brunch Manifesto</span><strong>Shop the destination edits</strong><span className="block text-xs mt-1">Explore the latest city guides and shopping collections</span></span><span aria-hidden="true">↗</span></button>}
   <button type="button" onClick={()=>openExternal(shopmyProfile)} className="min-h-11 text-xs underline underline-offset-4 text-ink-soft">Browse the full ShopMy shop ↗</button>
   <AffiliateDisclosure className="mt-2"/>
  </div>
 </aside>
}
export function ShopMyStayCard({destinationId,title,description,url,cta}:{destinationId:string;title:string;description:string;url:string;cta:string}) {
 const photo=shopmyPhotos(destinationId)[1]
 return <aside aria-label={title+' on ShopMy'} className="shopping-editorial shopping-stay">
  {photo&&<figure className="shopping-image"><Photo src={photo.src} seed={destinationId} alt={photo.caption} rounded=""/><figcaption>Destination inspiration · not a room preview</figcaption></figure>}
  <div className="shopping-copy"><p className="eyebrow text-terracotta">Stays + experiences · ShopMy</p><h3 className="mt-2 font-display text-2xl">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p><button type="button" onClick={()=>openExternal(url)} className="shopping-stay-link">{cta} ↗</button><AffiliateDisclosure className="mt-2"/></div>
 </aside>
}
export function CartagenaShopMyStays() {
 return <ShopMyStayCard destinationId="cartagena" title="Stay a little longer in Cartagena." description="Explore the existing collection of hotels, island tours and dining spots. Check current availability with the provider." url="https://shopmy.us/shop/collections/2823918" cta="Explore Destination Cartagena"/>
}
