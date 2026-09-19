// Public collection URLs observed in Jordy's ShopMy shop, 2026-09-19.
// Keep collection names faithful; no inferred product links, pricing or availability.
export const shopmyProfile = 'https://shopmy.us/jetsetjordy'
export const shopmyEdits = {
 essentials: {title:'Jet Set Essentials', url:'https://shopmy.us/shop/collections/2819889'},
 airport: {title:'Airport to Aperitivo', url:'https://shopmy.us/shop/collections/2819878'},
 beach: {title:'Beach Guide', url:'https://shopmy.us/shop/collections/2852525'},
 resort: {title:'Latin Luxe Resort Wear', url:'https://shopmy.us/shop/collections/2819893'},
 layers: {title:'Quiet Luxury Layering', url:'https://shopmy.us/shop/collections/2819898'},
 accessories: {title:'Extras → Jewelry & Accessories', url:'https://shopmy.us/shop/collections/2819905'},
 rio: {title:'Rosè in Rio', url:'https://shopmy.us/shop/collections/3158487'},
 sp: {title:'Sapphire in São Paulo', url:'https://shopmy.us/shop/collections/3171401'},
 cdmx: {title:'Emerald in Mexico City', url:'https://shopmy.us/shop/collections/3147308'},
 cartagena: {title:'Agua by Agua Bendita', url:'https://shopmy.us/shop/collections/2697615'},
 ba: {title:'Tango and Latin Luxury', url:'https://shopmy.us/shop/collections/2722905'},
} as const
export function shoppingEdits(destinationId?:string, packing=false) {
 const regional: Record<string, keyof typeof shopmyEdits> = {'rio-de-janeiro':'rio','sao-paulo':'sp','mexico-city':'cdmx',cartagena:'cartagena','buenos-aires':'ba',tulum:'beach','playa-del-carmen':'resort',guadalajara:'layers'}
 const keys: (keyof typeof shopmyEdits)[] = [regional[destinationId || ''] || 'essentials', packing?'airport':'accessories']
 return [...new Set(keys)].map(key=>shopmyEdits[key])
}
