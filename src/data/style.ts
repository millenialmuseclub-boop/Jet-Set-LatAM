import type { StyleOffer } from '@/types'
export const styleOffers: StyleOffer[] = [
 {id:'rio-clothing',kind:'wardrobe',title:'The Rio wardrobe edit',network:'ShopMy',affiliateUrl:'https://shopmy.us/collections/embed/2687505',cta:'Shop the Edit',destinationIds:['rio-de-janeiro'],source:'Existing Copacabana Palace style module; live collection verified in browser',verifiedAt:'2026-09-13',status:'active',previewItems:['Agua by Agua Bendita · Raffia Sun Hat','Alexandre Birman · Clarita 75 Sandal','Derek Lam 10 Crosby · Linen-Blend Pleated Shorts']},
 {id:'rio-stays',kind:'stay',title:'Rio stays collection',network:'ShopMy',affiliateUrl:'https://shopmy.us/collections/embed/2799513',cta:'Explore the stays collection',destinationIds:['rio-de-janeiro'],source:'Existing hotel collection previously mislabeled as a wardrobe edit',verifiedAt:'2026-09-13',status:'active'}
]
export const destinationStyle: Record<string,{headline:string;body:string;occasions:string[]}> = {
 'mexico-city':{headline:'Build your CDMX wardrobe',body:'Museums, long lunches, design shops and dinner.',occasions:['Museum Morning','City Walk','Dinner']},
 'rio-de-janeiro':{headline:'What are you wearing in Rio?',body:'Beach by day. Centro by afternoon. Dinner and music after dark.',occasions:['Beach Day','Centro','Dinner','Night Out']},
 cartagena:{headline:'Dress for Cartagena',body:'Heat, color, linen, beach and dinner.',occasions:['Old City','Beach Day','Dinner']},
 'sao-paulo':{headline:'What are you wearing in São Paulo?',body:'Design, museums, dinner and a little nightlife.',occasions:['Museum Morning','Design Shops','Dinner','Night Out']},
 'buenos-aires':{headline:'Pack for Buenos Aires',body:'Long lunches, late dinners and polished city days.',occasions:['City Walk','Lunch','Dinner']},
 guadalajara:{headline:'Dress for Guadalajara',body:'Gallery visits, plaza walks and evenings around the table.',occasions:['City Walk','Gallery Visit','Dinner']},
 tulum:{headline:'Pack for Tulum',body:'Beach afternoons, ruins and an easy change for dinner.',occasions:['Beach Day','Excursion','Dinner']},
 'playa-del-carmen':{headline:'Your Playa del Carmen wardrobe',body:'Caribbean days, a walk through town and dinner by the coast.',occasions:['Beach Day','City Walk','Dinner']}
}
