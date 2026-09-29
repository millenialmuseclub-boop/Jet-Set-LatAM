import type { StyleOffer } from '@/types'
export const styleOffers: StyleOffer[] = [
 {id:'rio-clothing',kind:'wardrobe',title:'The Rio wardrobe edit',network:'ShopMy',affiliateUrl:'https://shopmy.us/collections/embed/2687505',cta:'Shop the Edit',destinationIds:['rio-de-janeiro'],source:'Existing Copacabana Palace style module; live collection verified in browser',verifiedAt:'2026-09-13',status:'active',previewItems:['Agua by Agua Bendita · Raffia Sun Hat','Alexandre Birman · Clarita 75 Sandal','Derek Lam 10 Crosby · Linen-Blend Pleated Shorts']},
 {id:'rio-stays',kind:'stay',title:'Rio stays collection',network:'ShopMy',affiliateUrl:'https://shopmy.us/collections/embed/2799513',cta:'Explore the stays collection',destinationIds:['rio-de-janeiro'],source:'Existing hotel collection previously mislabeled as a wardrobe edit',verifiedAt:'2026-09-13',status:'active'}
]
export const destinationStyle: Record<string,{headline:string;body:string;occasions:string[]}> = {
"salvador":{"headline":"Pack for Salvador","body":"Bahian cooking, colorful streets and culture by the sea.","occasions":["City Walk","Coastal Day","Dinner"]},
"mendoza":{"headline":"Pack for Mendoza","body":"Leafy plazas, vineyard tables and an Andean horizon.","occasions":["City Walk","Wine Country","Dinner"]},
"punta-del-este":{"headline":"Pack for Punta del Este","body":"Coastal walks, art afternoons and long Uruguayan lunches.","occasions":["City Walk","Coastal Day","Dinner"]},
"bocas-del-toro":{"headline":"Pack for Bocas del Toro","body":"Island neighborhoods, Caribbean food and forest-fringed beaches.","occasions":["City Walk","Coastal Day","Dinner"]},
"merida":{"headline":"Pack for Mérida","body":"Yucatecan tables, shaded plazas and a museum-led city break.","occasions":["City Walk","Museum Morning","Dinner"]},
"arequipa":{"headline":"Pack for Arequipa","body":"Volcanic-stone streets, colorful cloisters and a regional table.","occasions":["City Walk","Museum Morning","Dinner"]},
"valparaiso":{"headline":"Pack for Valparaíso","body":"Hillside color, art stops and a different view of the Pacific.","occasions":["City Walk","Museum Morning","Dinner"]},
 quito:{headline:'Pack for Quito',body:'Historic plazas, chocolate and creative neighborhoods. Build around comfortable shoes and layers for your planned outings.',occasions:['City Walk','Gallery Visit','Dinner']},
 cusco:{headline:'Dress for Cusco',body:'Stone streets, a market morning and a table in town. Plan city clothes separately from equipment for any mountain excursion.',occasions:['City Walk','Craft Shopping','Dinner']},
 havana:{headline:'Pack for Havana',body:'Old-city plazas, art and a seafront pause. Choose breathable layers and comfortable shoes for the days you have planned.',occasions:['City Walk','Gallery Visit','Dinner']},
 lima:{headline:'Dress for Lima',body:'Coastal walks, museum afternoons and a change for dinner. Check the forecast before choosing your layers.',occasions:['City Walk','Museum Morning','Dinner']},
 montevideo:{headline:'Pack for Montevideo',body:'Historic streets, market lunches and time on the Rambla. Leave room for a layer when the waterfront breeze picks up.',occasions:['City Walk','Shopping','Dinner']},
 'panama-city':{headline:'Your Panama City wardrobe',body:'Casco streets, a canal outing and museum time. Choose comfortable footwear and check the forecast before you go.',occasions:['City Walk','Museum Morning','Dinner']},
 'san-jose-costa-rica':{headline:'Dress for San José',body:'Coffee, collections and a park afternoon, with an easy layer for changes in the day.',occasions:['Museum Morning','City Walk','Coffee']},
 florianopolis:{headline:'Pack for Florianópolis',body:'One beach, a market lunch and craft shopping in Centro. Build around the island days you actually have planned.',occasions:['Beach Day','Shopping','Dinner']},
 'san-juan':{headline:'Pack for San Juan',body:'Old-city walks, an art afternoon and a change for dinner.',occasions:['City Walk','Beach Day','Dinner']},
 'antigua-guatemala':{headline:'Dress for Antigua',body:'Courtyards, coffee and cobblestone walks, with a light layer for later.',occasions:['City Walk','Craft Shopping','Dinner']},
 'mexico-city':{headline:'Build your CDMX wardrobe',body:'Museums, long lunches, design shops and dinner.',occasions:['Museum Morning','City Walk','Dinner']},
 'rio-de-janeiro':{headline:'What are you wearing in Rio?',body:'Beach by day. Centro by afternoon. Dinner and music after dark.',occasions:['Beach Day','Centro','Dinner','Night Out']},
 cartagena:{headline:'Dress for Cartagena',body:'Heat, color, linen, beach and dinner.',occasions:['Old City','Beach Day','Dinner']},
 'sao-paulo':{headline:'What are you wearing in São Paulo?',body:'Design, museums, dinner and a little nightlife.',occasions:['Museum Morning','Design Shops','Dinner','Night Out']},
 'buenos-aires':{headline:'Pack for Buenos Aires',body:'Long lunches, late dinners and polished city days.',occasions:['City Walk','Lunch','Dinner']},
 guadalajara:{headline:'Dress for Guadalajara',body:'Gallery visits, plaza walks and evenings around the table.',occasions:['City Walk','Gallery Visit','Dinner']},
 tulum:{headline:'Pack for Tulum',body:'Beach afternoons, ruins and an easy change for dinner.',occasions:['Beach Day','Excursion','Dinner']},
 'playa-del-carmen':{headline:'Your Playa del Carmen wardrobe',body:'Caribbean days, a walk through town and dinner by the coast.',occasions:['Beach Day','City Walk','Dinner']},
 // Build 13 destinations — occasions drawn from each ready-made itinerary.
 santiago:{headline:'Dress for Santiago',body:'Plazas and markets, a hilltop view, then a day in wine country.',occasions:['City Walk','Wine Country','Dinner']},
 medellin:{headline:'What are you wearing in Medellín?',body:'Street art by day, El Poblado after dark and a lake-town day trip.',occasions:['City Walk','Excursion','Night Out']},
 bogota:{headline:'Layer up for Bogotá',body:'Cool mountain days: museums, a summit sunset and dinner in Chapinero.',occasions:['Museum Morning','City Walk','Dinner','Night Out']},
 oaxaca:{headline:'Dress for Oaxaca',body:'Market lunches, a mezcal tasting and a morning among the ruins.',occasions:['City Walk','Excursion','Dinner']}
}
