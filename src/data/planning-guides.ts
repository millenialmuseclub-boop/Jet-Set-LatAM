import type { Guide } from '@/types'
import { bogotaPhotos } from '@/assets/bogota'
import { medellinPhotos } from '@/assets/medellin'
import { santiagoPhotos } from '@/assets/santiago'
import { oaxacaPhotos } from '@/assets/oaxaca'

// Original planning copy based on the linked tourism sources and existing verified places.
export const planningGuides: Guide[] = [
  {
    id:'gd-bogota-first-weekend',destinationId:'bogota',title:'Your First Weekend in Bogotá',section:'experiences',
    dek:'Two neighborhoods, a museum anchor and enough breathing room for the mountain city.',
    heroPhoto:bogotaPhotos.plazaDeBolivar,photoCaption:'Plaza de Bolívar, Bogotá',
    placeIds:['pl-plaza-de-bolivar','pl-museo-del-oro','pl-cafe-san-alberto-oro','pl-monserrate','pl-usaquen-flea-market'],
    relatedGuideIds:['gd-bogota-candelaria','gd-bogota-monserrate','gd-bogota-usaquen'],sourceUrl:'https://colombia.travel/es/bogota',
    body:`## Start with a small first day

Bogotá sits high in the Andes. Keep arrival day light, with a short walk and an unhurried meal rather than a race up the mountain. Group Plaza de Bolívar and the historic center into one outing; choose the Gold Museum or Museo Botero as the main indoor stop, checking its current hours first.

## Let weather shape the view

Monserrate works best as a separate decision once you have settled in. Check the official operating information and visibility before committing to the trip up. If clouds swallow the skyline, keep the museum day and move the viewpoint. You do not need to force both into the same afternoon.

## A second neighborhood

Use the next day for Usaquén if the market is operating, or choose a slower meal and a walk in Chapinero. These areas are away from the historic center, so allow for traffic. A weekend will feel fuller if you spend time in two areas than if you keep crossing the city.

Save your museum, one coffee stop and the second neighborhood’s anchor below. Build around those, then leave a flexible afternoon in the planner.`
  },
  {
    id:'gd-bogota-stay-museum-days',destinationId:'bogota',title:'Where to Stay in Bogotá for Museum Days and Good Dinners',section:'stay',
    dek:'Historic-center access or a Chapinero base: make the tradeoff before booking.',
    heroPhoto:bogotaPhotos.museoDelOro,photoCaption:'Inside the Museo del Oro, Bogotá',
    placeIds:['pl-casa-legado','pl-museo-del-oro','pl-museo-botero','pl-leo-cocina-y-cava'],
    relatedGuideIds:['gd-bogota-chapinero','gd-bogota-candelaria'],sourceUrl:'https://colombia.travel/es/bogota',
    body:`## Match the base to your evenings

If most evenings end around Chapinero’s restaurants, compare accommodation there before defaulting to the historic center. Casa Legado in Quinta Camacho is an existing option in the destination list. Check the exact block, room arrangements and transport plans directly with the property.

## Cluster the museums

La Candelaria is the natural focus for the historic-city portion of the trip, with Museo Botero nearby and the Gold Museum to the north. Check each museum’s calendar, then place the visits on a day when both work. Pick a main collection and treat the second as optional so lunch and travel time remain realistic.

## Reserve only the anchors

If Leo is the dinner you are traveling for, confirm availability before arranging the rest of that day. Otherwise keep a short food shortlist around your base and decide closer to the time. Avoid scheduling a museum exit and dinner reservation on opposite sides of the city with no travel buffer.

Pack comfortable walking shoes and layers for cool days. The existing layering edit can sit beside your trip notes; saved places and the planner keep the actual route in one place.`
  },
  {
    id:'gd-medellin-first-weekend',destinationId:'medellin',title:'Medellín in a Weekend: Choose Three Anchors',section:'experiences',
    dek:'Downtown art, a neighborhood visit and a slower coffee morning.',
    heroPhoto:medellinPhotos.puebloitoPaisa,photoCaption:'Pueblito Paisa on Cerro Nutibara, Medellín',
    photoCredit:{author:'RH Ruggles',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',sourceUrl:'https://commons.wikimedia.org/wiki/File:Pueblito_Paisa,_Medellin,_Antioquia,_Colombia.jpg'},
    placeIds:['pl-plaza-botero','pl-museo-de-antioquia','pl-comuna-13','pl-pergamino-cafe','pl-pueblito-paisa'],
    relatedGuideIds:['gd-medellin-centro-comuna-13','gd-medellin-poblado-laureles'],sourceUrl:'https://www.medellin.travel/guias-de-ciudad/',
    body:`## One art-led morning

Pair Plaza Botero with the Museo de Antioquia after checking the museum’s opening hours. Let the collection set the pace and keep lunch nearby. This gives downtown more attention than a quick photograph between transfers.

## Give a neighborhood visit its own time

Comuna 13 deserves more than an escalator ride and a mural checklist. Consider a local guide, ask before photographing residents and avoid treating the neighborhood as a stage set. Leave room for the journey there and back instead of stacking it against a fixed dinner reservation.

## A softer second day

Start with coffee in El Poblado, then choose between another neighborhood walk and a visit to Pueblito Paisa. You do not need to add Guatapé to make a two-day city stay complete. That excursion involves its own travel time and works better when you can give it a full day.

Save one cultural stop, one neighborhood experience and one café. Use them as the anchors of your trip, and let the remaining time follow the weather and your energy. The existing city guides below add detail when you want a deeper route.`
  },
  {
    id:'gd-medellin-stay-get-around',destinationId:'medellin',title:'Medellín: Choosing a Base and Planning the Journey',section:'stay',
    dek:'El Poblado, Laureles and how to avoid a weekend spent in transfers.',
    heroPhoto:medellinPhotos.metrocable,photoCaption:'Metrocable above Medellín',
    photoCredit:{author:'Bernard Gagnon',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',sourceUrl:'https://commons.wikimedia.org/wiki/File:L%C3%ADnea_K_(Medell%C3%ADn_Metrocable)_01.jpg'},
    placeIds:['pl-pergamino-cafe','pl-parque-lleras','pl-estadio-atanasio-girardot','pl-metrocable','pl-parque-arvi'],
    relatedGuideIds:['gd-medellin-poblado-laureles','gd-medellin-guatape'],sourceUrl:'https://www.medellin.travel/guias-de-ciudad/',
    body:`## El Poblado or Laureles?

Start by marking your likely dinners and daytime stops. El Poblado makes sense when those plans revolve around its cafés and evening scene. Laureles offers a different neighborhood rhythm, but the exact block still matters. Ask about noise, slopes and the walk to transport instead of choosing by district name alone.

## Plan the complete journey

A station on the map is only part of a trip. Allow for walking, transfers and queues, and check the Metro’s current service information. The Metrocable network is everyday public transport; be considerate of commuters and avoid obstructing doors for photographs. Do not assume every cable route leads to Parque Arví.

## Separate the excursion day

Parque Arví and Guatapé are different outings. Choose one for a longer stay rather than trying to attach both to a crowded city weekend. Verify the relevant transport and access before making a timed booking elsewhere that evening.

Keep the city’s existing saved places as your shortlist. A good base reduces repeated journeys; it does not need to be close to everything. Use the planner to group nearby stops, then add realistic breathing room between areas.`
  },
  {
    id:'gd-santiago-where-to-stay',destinationId:'santiago',title:'Where to Stay in Santiago: Plan by Neighborhood',section:'stay',
    dek:'Lastarria for a culture-led stay, or a broader base with transport in mind.',
    heroPhoto:santiagoPhotos.providenciaArchitecture,photoCaption:'Architecture in Providencia, Santiago',
    placeIds:['pl-the-singular-santiago','pl-gam-centro-cultural','pl-bocanariz','pl-plaza-de-armas'],
    relatedGuideIds:['gd-santiago-lastarria','gd-santiago-centro'],sourceUrl:'https://chile.travel/en/blog/neighborhoods-of-santiago-walking-the-capitals-best-spots/',
    body:`## Start with Lastarria

For a first stay built around culture and dinner, compare the streets around Lastarria with your saved stops. The Singular is one existing hotel option, while GAM and nearby dining give the area a useful daytime-to-evening rhythm. Check the property’s actual location and room access before booking.

## Compare the wider city

Providencia is another area to consider if you prefer a broader choice of accommodation. Look at the walk to transport and the restaurants you actually want, not just the district label. A central map pin can still leave you with long journeys if every day points somewhere different.

## Group your sightseeing

Keep the historic center together, give Bellavista and the hill their own outing, and let Lastarria hold a slower afternoon. Check current transport and opening information before committing to the sequence. If a dinner reservation is fixed, leave the preceding stop flexible.

Choose your accommodation after sketching those days. That makes the tradeoff between a convenient walking base and a larger room much easier to judge. Save the city and its useful places, then build the trip around the two or three experiences you would most regret missing.`
  },
  {
    id:'gd-santiago-market-weekend',destinationId:'santiago',title:'A Santiago Weekend: Markets, Culture and a View',section:'eat',
    dek:'Keep the city days compact and let wine country wait for a longer trip.',
    heroPhoto:santiagoPhotos.mercadoCentral,photoCaption:'Mercado Central, Santiago',
    placeIds:['pl-mercado-central-santiago','pl-donde-augusto','pl-gam-centro-cultural','pl-cerro-san-cristobal','pl-bocanariz'],
    relatedGuideIds:['gd-santiago-centro','gd-santiago-bellavista','gd-santiago-casablanca'],sourceUrl:'https://visitsantiago.travel/en/ruta-gastronomica/',
    body:`## A market-centered first day

Start with the historic center and make Mercado Central the food anchor. Browse before deciding where to sit, check the menu and prices, and keep the meal unhurried. Donde Augusto is already in the destination list if you want a named option to research in advance.

## Culture after lunch

Move toward Lastarria and check what is on at GAM. An exhibition, a street walk and a dinner are enough for an afternoon; they do not need another major attraction wedged between them. If Bocanáriz is a priority, confirm a table directly and leave time to reach it comfortably.

## Let the second day look outward

Cerro San Cristóbal offers a different view of the city. Check operating conditions and visibility before heading up, and keep an indoor alternative for a cloudy day. Pair the outing with a slower neighborhood lunch instead of a long transfer across the capital.

Casablanca wine country belongs in a separate excursion plan, especially when you have only a weekend. Save that guide for a longer stay. The places below connect the compact city version to your existing itinerary and saved list.`
  },
  {
    id:'gd-oaxaca-craft-shopping',destinationId:'oaxaca',title:'Buying Craft in Oaxaca: Ask About the Maker',section:'shop',
    dek:'Textiles and pottery, with time to understand what you are bringing home.',
    heroPhoto:oaxacaPhotos.alebrijesCraft,photoCaption:'Painted alebrije craft in Oaxaca',
    placeIds:['pl-teotitlan-del-valle','pl-san-bartolo-coyotepec','pl-zocalo-oaxaca'],
    relatedGuideIds:['gd-oaxaca-valles-centrales','gd-oaxaca-centro-landmarks'],sourceUrl:'https://www.oaxaca.travel/index.php/es/mercados/mercado-de-artesanias',
    body:`## Browse before choosing

Begin with a small amount of research and a little luggage space. Oaxaca’s craft traditions are varied: a bright color or a familiar pattern does not tell you who made an object. Ask about the material, technique and community of origin, and listen to the answer before discussing a price.

## Give a village visit a purpose

Teotitlán del Valle is the textile-focused option already in this app; San Bartolo Coyotepec provides a different pottery-led outing. They are separate communities, so do not treat them as adjacent city shops. Arrange transport and decide which tradition interests you most before adding a stop to your itinerary.

## Think beyond the purchase

Ask permission before taking photographs of people or workshop interiors. If a demonstration takes time, be respectful about the visit even when you decide not to buy. Ask about care, wrapping and shipping before choosing something fragile or large.

A single piece whose maker and use you understand can be a better souvenir than a bag of impulse purchases. Save the relevant village or market alongside your trip, then leave enough time to browse without an immediate departure deadline.`
  },
  {
    id:'gd-oaxaca-first-weekend',destinationId:'oaxaca',title:'A First Oaxaca Weekend: City Days or a Textile Detour?',section:'experiences',
    dek:'A practical choice between staying in the center and giving one craft village a full outing.',
    heroPhoto:oaxacaPhotos.teotitlanWeaving,photoCaption:'A rug on the loom in Teotitlán del Valle, Oaxaca',
    placeIds:['pl-templo-santo-domingo','pl-mercado-20-noviembre','pl-zocalo-oaxaca','pl-teotitlan-del-valle','pl-la-catedral-oaxaca'],
    relatedGuideIds:['gd-oaxaca-eat','gd-oaxaca-valles-centrales','gd-oaxaca-craft-shopping'],sourceUrl:'https://www.oaxaca.travel/index.php/es/all-destinations-es/teotitlan-del-valle',
    body:`## Give the center a complete day

Start with Santo Domingo and a walk toward the Zócalo, then let the market become the main food stop. Browse Mercado 20 de Noviembre before committing to lunch. Keep room for a café or chocolate pause and choose dinner near the end of your walk rather than crossing town for another checklist item.

## Decide what day two is for

If textiles are the reason you came, give Teotitlán del Valle an outing of its own. The community’s weaving tradition deserves time for questions and browsing. Arrange the return journey before setting out and leave a buffer before dinner back in the city.

If this is a very short stay, keeping both days in the center is equally valid. Museums, food and neighborhood walks can fill a weekend without a rushed excursion. Monte Albán is another distinct choice; do not automatically combine it with several craft villages in a single day.

## Keep the plan editable

Use the existing Oaxaca itinerary as a starting point and remove what does not fit your interests. Save a few places before you travel, check current visitor information, and let the second day stay flexible until you know how much time you really have.`
  },
].map(g => ({...g, publishedAt:'2026-09-27', editorialSource:'researched'} as Guide))
