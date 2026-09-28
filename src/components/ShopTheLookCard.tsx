import { styleOffers } from '@/data/style'
import { ShopMyStayCard } from './ShopMyEdit'
// Historical component name retained; this is the verified stays collection.
export function ShopTheLookCard({placeName}:{placeName:string}) {
 const offer=styleOffers.find(o=>o.id==='rio-stays'&&o.status==='active'); if(!offer?.affiliateUrl) return null
 return <ShopMyStayCard destinationId="rio-de-janeiro" title={offer.title} description={`A collection including ${placeName} and other Rio hotels. Check availability with the provider.`} url={offer.affiliateUrl} cta={offer.cta}/>
}
