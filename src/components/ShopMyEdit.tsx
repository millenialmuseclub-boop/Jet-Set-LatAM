import { shopmyProfile } from '@/data/shopmy'
import { shopmyPresentation, shopmyPhotos } from '@/lib/shopmyPresentation'
import { openExternal } from '@/lib/links'
import { AffiliateDisclosure } from './AffiliateDisclosure'
import { appFamily } from '@/config/appFamily'
import { getDestinationById } from '@/data'
import { Photo } from './Photo'
import { Carousel } from './Carousel'
import { wardrobeCompanion } from '@/lib/companionLinks'

export function ShopMyEdit({destinationId, packing=false, compact=false, wardrobe=true}: {destinationId?:string;packing?:boolean;compact?:boolean;wardrobe?:boolean}) {
 const edits=shopmyPresentation(destinationId,packing)
 const destination=destinationId?getDestinationById(destinationId):undefined
 const city=destinationId==='rio-de-janeiro'?'Rio':destination?.city
 return <aside aria-label={city?`ShopMy edit for ${city}`:'ShopMy travel edits'} className={`shopping-editorial ${compact?'shopping-compact':''}`}>
  <div className="shopping-copy"><p className="eyebrow text-terracotta">The Jet Set Edit · ShopMy</p>
   <h3 className="mt-2 font-display text-3xl">{city?`Pack for ${city}`:'A wardrobe for the journey'}</h3>
   <p className="mt-2 text-sm leading-relaxed text-ink-soft">{edits[0]?.note}</p>
   <Carousel label={city?`${city} shopping edits`:'travel shopping edits'} className="shopping-rail">
    {edits.map(edit=><button key={edit.url} type="button" onClick={()=>openExternal(edit.url)} className="shopping-collection" aria-label={`${edit.label}: ${edit.title}. Open collection on ShopMy`}>
     {edit.photo&&<span className="shopping-image"><Photo src={edit.photo.src} seed={edit.url} alt={edit.photo.caption} rounded=""/><span>Destination inspiration</span></span>}
     <span className="shopping-card-copy"><span className="eyebrow">{city||'The journey'} · The edit</span><strong>{edit.label}</strong><span className="shopping-inventory">{edit.title}</span><span className="shopping-open">Explore on ShopMy ↗</span></span>
    </button>)}
   </Carousel>
   <p className="my-3 text-xs leading-relaxed text-ink-soft">City photographs set the mood; they do not show products for sale. Collections, prices and availability are on ShopMy.</p>
   {!compact&&wardrobe&&<button type="button" onClick={()=>openExternal(destinationId?wardrobeCompanion(destinationId,undefined,packing).url:appFamily['luxe-jetter'].iOSURL)} className="luxe-shopping-link"><img src={appFamily['luxe-jetter'].iconUrl} alt="" loading="lazy" decoding="async" width="44" height="44"/><span><strong>Plan my wardrobe in Luxe Jetter</strong><span>Turn your trip plans into a wardrobe ↗</span></span></button>}
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
