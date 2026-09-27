import type { Destination, Place, Guide, Itinerary } from '@/types'
import { expansionPhotos as photos } from '../expansion-photography'

// Researched city entries, not firsthand endorsements. Each listing retains its source.
const sjTourism = 'https://www.discoverpuertorico.com/regions/san-juan'
const agTourism = 'https://visitguatemala.gt/ciudades/antigua-guatemala/'
type Entry = [string, string, Place['category'], string, string, string, (keyof typeof photos)?]
function cityPlaces(city: string, country: string, entries: Entry[]): Place[] {
  return entries.map(([id, name, category, neighborhood, description, sourceUrl, photo]) => ({
    id, name, city, country, category, neighborhood, description, sourceUrl, website: sourceUrl,
    photos: photo ? [photos[photo].src] : [], isJetSetPick: false, tags: [neighborhood, category],
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${city} ${country}`)}`,
  }))
}
export const sanJuanPlaces = cityPlaces('San Juan', 'Puerto Rico', [
  ['pl-sj-el-morro', 'Castillo San Felipe del Morro', 'landmark', 'Old San Juan', 'Seaward fortifications and open lawns at the western tip of Old San Juan. Allow time for exposed walkways and check the National Park Service for access and tickets.', 'https://www.nps.gov/saju/planyourvisit/index.htm', 'sj-morro'],
  ['pl-sj-san-cristobal', 'Castillo San Cristóbal', 'landmark', 'Old San Juan', 'The landward fortress gives a different perspective on the old city’s defenses. Pair it with a street walk rather than rushing through both forts in the midday heat.', 'https://www.nps.gov/saju/planyourvisit/index.htm'],
  ['pl-sj-paseo', 'Paseo de la Princesa', 'park', 'Old San Juan', 'A waterfront promenade below the city walls, useful for a slower late-afternoon walk.', sjTourism],
  ['pl-sj-cuatro-sombras', 'Café Cuatro Sombras', 'cafe', 'Old San Juan', 'Puerto Rican coffee on Calle del Recinto Sur. A practical pause before or after exploring the historic streets.', 'https://www.discoverpuertorico.com/profile/cafe-cuatro-sombras/7080'],
  ['pl-sj-finca-cialitos', 'Finca Cialitos', 'cafe', 'Old San Juan', 'A coffee shop serving Puerto Rican beans in the old city; ask what is being brewed and leave space for a slow coffee break.', 'https://www.discoverpuertorico.com/article/where-to-taste-puerto-rican-coffee'],
  ['pl-sj-marmalade', 'Marmalade', 'restaurant', 'Old San Juan', 'A fine-dining option on Calle Fortaleza. Review the current menu and reserve directly if this is your special dinner.', 'https://www.marmaladepr.com/'],
  ['pl-sj-ropa-vieja', 'Ropa Vieja Grill', 'restaurant', 'Condado', 'A Cuban and Puerto Rican dining stop in Condado, useful when spending the afternoon in the beach district.', 'https://www.discoverpuertorico.com/article/exploring-neighborhood-condado'],
  ['pl-sj-mapr', 'Museo de Arte de Puerto Rico', 'museum', 'Santurce', 'Puerto Rican art in Santurce. Check the museum’s exhibitions and visiting hours before making it the anchor of your day.', 'https://mapr.org/en'],
  ['pl-sj-placita', 'La Placita de Santurce', 'nightlife', 'Santurce', 'The market and its surrounding bars change pace after dark. Visit for the neighborhood atmosphere and choose a return ride before the evening gets busy.', sjTourism, 'sj-placita'],
  ['pl-sj-condado', 'Condado Beach', 'beach', 'Condado', 'An urban Atlantic beachfront with nearby cafés and shops. Ocean conditions vary: a beach walk does not require a swim, and posted warnings take priority.', 'https://www.discoverpuertorico.com/article/exploring-neighborhood-condado', 'sj-condado'],
  ['pl-sj-ashford', 'Ashford Avenue', 'shop', 'Condado', 'Condado’s shopping corridor, where browsing boutiques can sit between a beach walk and lunch.', sjTourism],
  ['pl-sj-el-convento', 'Hotel El Convento', 'hotel', 'Old San Juan', 'A historic hotel in a former convent in Old San Juan. Compare room access and the exact location against the walking days you want to have.', 'https://www.elconvento.com/about-us'],
])
export const antiguaPlaces = cityPlaces('Antigua Guatemala', 'Guatemala', [
  ['pl-ag-arch', 'Arco de Santa Catalina', 'landmark', 'Calle del Arco & La Merced', 'The yellow arch above Calle del Arco is a useful orientation point for a first walk through Antigua.', 'https://www.sicultura.gob.gt/directory-directorio_c/listing/arco-de-santa-catalina/', 'ag-arch'],
  ['pl-ag-merced', 'Iglesia de La Merced', 'landmark', 'Calle del Arco & La Merced', 'A richly decorated yellow-and-white church north of the arch. Respect services and confirm separate access to any convent areas.', agTourism, 'ag-merced'],
  ['pl-ag-capuchinas', 'Convento de las Capuchinas', 'museum', 'Eastern Historic Center', 'Historic convent architecture and courtyards. Check admission and access before visiting; pair it with the eastern streets rather than a cross-city transfer.', 'https://visitguatemala.gt/en/blog/museums-antigua-guatemala/', 'ag-capuchinas'],
  ['pl-ag-parque', 'Parque Central', 'park', 'Parque Central & Market', 'The shaded central square provides a natural meeting point and a pause between Antigua’s museums, cafés and streets.', agTourism, 'ag-plaza'],
  ['pl-ag-santa-clara', 'Convento de Santa Clara', 'museum', 'Eastern Historic Center', 'Another of Antigua’s surviving convent complexes. Choose it for a quieter architecture stop and verify the day’s visitor access.', 'https://visitguatemala.gt/en/blog/museums-antigua-guatemala/'],
  ['pl-ag-artisan-market', 'Mercado Municipal de Artesanías', 'shop', 'Parque Central & Market', 'A municipal craft market on 4a Calle Poniente. Ask who made a piece and where it comes from before choosing textiles or a gift.', 'https://www.sicultura.gob.gt/directory-directorio_c/listing/mercado-municipal-de-artesanias/'],
  ['pl-ag-condesa', 'Café Condesa', 'cafe', 'Parque Central & Market', 'A café with patios in a historic house on Parque Central, serving Antiguan coffee and food made on site.', 'https://www.cafecondesa.com.gt/'],
  ['pl-ag-fernandos', 'Fernando’s Kaffee', 'cafe', 'Calle del Arco & La Merced', 'A coffee roastery and chocolate producer focused on Guatemalan coffee and cacao. Check the current café offering before visiting.', 'https://www.fernandoskaffee.com/'],
  ['pl-ag-sky', 'Café Sky', 'restaurant', 'Eastern Historic Center', 'A rooftop restaurant and bar on 1a Avenida Sur. Weather and visibility shape the view; keep an indoor alternative in mind.', 'https://cafeskyantigua.com/'],
  ['pl-ag-refectorio', 'El Refectorio', 'restaurant', 'Eastern Historic Center', 'Casa Santo Domingo’s restaurant offers a more deliberate sit-down meal. Consult the current menu and reserve directly.', 'https://www.casasantodomingo.com.gt/es/gastronomia/el-refectorio'],
  ['pl-ag-santo-domingo', 'Hotel Museo Casa Santo Domingo', 'hotel', 'Eastern Historic Center', 'A hotel incorporating the remains of the former Santo Domingo convent, with museum and dining spaces. Confirm which areas are open to non-guests.', 'https://www.casasantodomingo.com.gt/'],
  ['pl-ag-cabildo', 'Bar Cabildo', 'bar', 'Eastern Historic Center', 'Casa Santo Domingo’s cocktail bar, convenient after dinner at the hotel complex. Check current service directly.', 'https://www.casasantodomingo.com.gt/es/'],
])

function story(id: string, destinationId: string, title: string, section: Guide['section'], dek: string, photo: keyof typeof photos, placeIds: string[], sourceUrl: string, body: string): Guide {
  const image = photos[photo]
  return { id, destinationId, title, section, dek, heroPhoto: image.src, photoCaption: image.caption, photoCredit: image.credit, placeIds, sourceUrl, body, publishedAt: '2026-09-27', editorialSource: 'researched' }
}
export const expansionCityGuides: Guide[] = [
  story('gd-san-juan-first-weekend', 'san-juan', 'A First Weekend in San Juan', 'experiences', 'Two city days: forts and coffee, then Santurce and the coast.', 'sj-morro', ['pl-sj-cuatro-sombras','pl-sj-el-morro','pl-sj-paseo','pl-sj-mapr','pl-sj-condado','pl-sj-placita'], 'https://www.nps.gov/saju/planyourvisit/index.htm', `## Day one: keep the old city together

Begin with coffee at Cuatro Sombras, then give El Morro an unhurried morning. Its open lawns and fort walkways make shade and water part of the plan. Read the National Park Service’s current access information before you go. If military history is your main interest, add San Cristóbal; otherwise keep the afternoon for a slow street walk and Paseo de la Princesa.

## Day two: art before the coast

Make the Museo de Arte de Puerto Rico the anchor of a Santurce morning after confirming its opening hours. Move to Condado for lunch and an Atlantic beach walk. Leave swimming dependent on local conditions, flags and your ability. A city beach is still open ocean. Return to Santurce for La Placita only if you want a lively late evening; arrange the ride back before setting out.

## Give the weekend room

These are two city days, not a promise to cover all Puerto Rico. Keep arrival and departure time outside the sightseeing plan. Save the places below, then add the ones you actually want to your trip. If you only have one day, choose the old city rather than trying to sample every district.`),
  story('gd-san-juan-where-to-stay', 'san-juan', 'Where to Stay: Old San Juan, Condado or Santurce?', 'stay', 'Choose a base around the days you want, from historic streets to oceanfront walks.', 'sj-condado', ['pl-sj-el-convento','pl-sj-condado','pl-sj-ashford','pl-sj-mapr'], sjTourism, `## Old San Juan for a walking weekend

Choose the old city when forts, architecture and long café pauses are the point of the trip. Hotel El Convento is one existing option to compare. Check the exact room, step-free access and luggage drop-off arrangements rather than assuming every historic building works the same way. Pack shoes that feel good on uneven streets.

## Condado for the coast

Condado puts the beach district and Ashford Avenue shopping close at hand. It works well when an oceanfront walk belongs in each day, but you will still need to plan trips to the old city and Santurce. Compare the hotel’s actual beach access with its map pin. A sea view and a suitable swimming spot are different questions.

## Santurce for art and evenings

Santurce is a large district, so choose a specific location around your plans rather than booking on the neighborhood name alone. The art museum and La Placita serve very different kinds of outings. Ask about nighttime noise if rest matters, and allow for transport between them.

## Before booking

Sketch one morning, one dinner and your airport transfer first. That makes the location tradeoff much clearer than a list of amenities. Use the existing packing edit for city walks and beach layers, then save the destination so the choice stays beside your trip.`),
  story('gd-san-juan-coffee-dinner', 'san-juan', 'San Juan: Coffee, a Special Dinner and a Night Out', 'eat', 'A food plan that leaves time to enjoy the neighborhoods around the table.', 'sj-placita', ['pl-sj-cuatro-sombras','pl-sj-finca-cialitos','pl-sj-marmalade','pl-sj-ropa-vieja','pl-sj-placita'], 'https://www.discoverpuertorico.com/article/where-to-taste-puerto-rican-coffee', `## Start with Puerto Rican coffee

Cuatro Sombras and Finca Cialitos make useful old-city stops. Pick one near the start of your walk and keep the other as an option for another morning. Ask about the beans and the preparation rather than ordering in a rush. A coffee stop is also a chance to check your map and decide what to leave out.

## Give dinner its own space

For a planned evening, Marmalade publishes its current menu and reservation information on its own site. Check dietary needs directly and leave a buffer after sightseeing so the meal does not become a race. If your day is centered on Condado, Ropa Vieja Grill offers another neighborhood dining option; verify service before heading over.

## Choose the energy of the evening

La Placita is a different outing from a quiet dinner. Its market surroundings become a social hub after dark, with bars and music nearby. Decide whether you want that atmosphere before combining it with a long tasting-menu evening. Keep the journey home simple, particularly if you are staying in the old city.

## Build a small food shortlist

Save a café, a dinner and one backup near your accommodation. The linked places below keep maps and direct sources beside the itinerary controls. Menus and availability change, so use those sources when you are ready to book.`),
  story('gd-antigua-first-weekend', 'antigua-guatemala', 'Antigua Guatemala: Your First Two Days', 'experiences', 'A compact city stay built around courtyards, the arch and time to linger.', 'ag-capuchinas', ['pl-ag-parque','pl-ag-arch','pl-ag-merced','pl-ag-capuchinas','pl-ag-santa-clara','pl-ag-condesa'], agTourism, `## Day one: get your bearings

Start at Parque Central and follow the streets toward the Santa Catalina Arch and La Merced. Keep this first walk light: stop for coffee, notice the courtyards and leave room to orient yourself. Antigua rewards short distances taken slowly, especially when the cobblestones demand more attention than the map suggests.

## Day two: choose your architecture

Make Capuchinas the anchor of the second morning. If you still want more convent architecture, continue to Santa Clara after checking visitor access; otherwise use the afternoon for a craft-market visit. Two thoughtful stops are more satisfying than a checklist of every ruin. A café pause near Parque Central makes the day easy to shorten.

## Keep transfers separate

Arrange your arrival transfer and allow a generous buffer for the return journey before filling your departure day. The route and traffic matter more than a neat distance estimate. A volcano excursion needs its own planning, operator checks and weather decision; this itinerary is intentionally a city weekend.

## Make it yours

Save the places you care about and use the ready-made two-day trip as a starting point. Swap a museum for a slow lunch when that suits the day. Confirm opening hours with the linked sources and carry a light rain layer so a shower does not force the whole afternoon indoors.`),
  story('gd-antigua-cafes-courtyards', 'antigua-guatemala', 'Antigua at the Table: Coffee, Courtyards and Rooftops', 'eat', 'A café-led day, with a rooftop pause and an optional reservation dinner.', 'ag-plaza', ['pl-ag-condesa','pl-ag-fernandos','pl-ag-sky','pl-ag-refectorio','pl-ag-cabildo'], 'https://www.cafecondesa.com.gt/', `## Coffee with time around it

Café Condesa’s patios make it a practical pause beside Parque Central. Fernando’s Kaffee adds a different focus: Guatemalan coffee roasting and chocolate. Put them on different mornings rather than treating both as boxes to tick before lunch. Ask what is available that day and leave time for the conversation.

## A rooftop is a weather plan

Café Sky offers food and drinks above the eastern streets. Go for a relaxed break when visibility and weather cooperate, and keep your expectations flexible. A clouded afternoon can still be a good meal; it simply should not carry the entire weight of the day’s sightseeing. Check access if stairs are a concern.

## Dinner as an anchor

El Refectorio at Casa Santo Domingo is an option for a more deliberate evening. Read the current menu and book with the restaurant if it is important to your trip. Bar Cabildo is in the same hotel complex, so an after-dinner drink can stay close by without creating another transfer.

## Leave room for discovery

Choose one reserved meal and let the remaining meals follow your walks. The place cards keep direct sources and map links together. Save your shortlist before leaving the hotel, and use Add to Trip only for the stops that need a place in the schedule.`),
  story('gd-antigua-stay-shop', 'antigua-guatemala', 'Where to Stay and What to Bring Home from Antigua', 'shop', 'Choose a walkable base, then buy fewer things with a better story.', 'ag-merced', ['pl-ag-santo-domingo','pl-ag-artisan-market','pl-ag-parque','pl-ag-arch'], 'https://www.sicultura.gob.gt/directory-directorio_c/listing/mercado-municipal-de-artesanias/', `## Choose the block before the room

Parque Central makes an easy orientation point for a first stay. The streets around Calle del Arco put you close to the best-known landmark, while the eastern historic center gives access to convent visits and Casa Santo Domingo. Compare each hotel’s exact address with your saved places. A courtyard photograph does not tell you how quiet the bedroom will be.

## A hotel with historic surroundings

Casa Santo Domingo incorporates the remains of a convent into its hotel and museum setting. Check which areas are included in a room booking and which require separate visitor arrangements. For any historic property, ask directly about stairs, room ventilation and luggage access if those affect your stay.

## Shop with questions

The municipal craft market on 4a Calle Poniente is a starting point for browsing. Ask where a textile was made, what the material is and whether the seller knows the maker. Compare workmanship and buy something you will use rather than choosing only by color. Ask permission before photographing a stall or a person.

## Pack for the real day

Comfortable walking shoes matter on cobblestones; a light layer gives an outdoor dinner more flexibility. Leave luggage space for fragile purchases and ask about wrapping. The existing style and packing links can help organize what you already own before adding anything new.`),
]

function city(id: string, city: string, country: string, hero: keyof typeof photos, card: keyof typeof photos, tagline: string, overview: string, neighborhoods: [string,string,keyof typeof photos][], places: Place[]): Destination {
  return {id,slug:id,city,country,heroPhoto:photos[hero].src,cardPhoto:photos[card].src,tagline,status:'guide',content:{overview,whyGo:tagline},
    neighborhoods:neighborhoods.map(([name,description,photo],i)=>({id:`nb-${id}-${i}`,name,city,description,heroPhoto:photos[photo].src})),
    placeIds:places.map(p=>p.id),guideIds:expansionCityGuides.filter(g=>g.destinationId===id).map(g=>g.id),itineraryIds:[`it-${id}-weekend`],
    photoCredits:Object.entries(photos).filter(([key])=>key.startsWith(id==='san-juan'?'sj-':'ag-')).map(([,p])=>({photo:p.src,credit:`Photo by ${p.credit.author} / Wikimedia Commons, ${p.credit.license}`,sourceUrl:p.credit.sourceUrl,licenseUrl:p.credit.licenseUrl}))}
}
export const expansionDestinations = [
  city('san-juan','San Juan','Puerto Rico','sj-street','sj-blue','Historic streets, Puerto Rican art and Atlantic afternoons.', 'San Juan works best as a collection of distinct days: forts and coffee in Old San Juan, Puerto Rican art and evening energy in Santurce, then an oceanfront pause in Condado. Start with a two-day city trip and leave the rest of the island for another chapter.', [
    ['Old San Juan','Historic streets, waterfront walks and the two major forts. Group these stops into one walking day.','sj-morro'],
    ['Santurce','Puerto Rican art and the market-centered evening scene around La Placita. Plan transport between stops in this larger district.','sj-placita'],
    ['Condado','Atlantic beachfront, Ashford Avenue browsing and dining. Check sea conditions before choosing to swim.','sj-condado'],
  ],sanJuanPlaces),
  city('antigua-guatemala','Antigua Guatemala','Guatemala','ag-arch','ag-street','Courtyards, coffee and craft beneath a volcanic skyline.', 'Antigua is a city for slow walking: start at Parque Central, follow the arch toward La Merced, and give its convent courtyards time. Coffee, craft browsing and a carefully chosen dinner are enough to make a full weekend without squeezing in an ambitious excursion.', [
    ['Calle del Arco & La Merced','The arch and La Merced form a natural northern walking route, with coffee stops nearby.','ag-merced'],
    ['Eastern Historic Center','Capuchinas, Santa Clara and the Casa Santo Domingo complex give this part of the center an architecture-led rhythm.','ag-capuchinas'],
    ['Parque Central & Market','The main square, cafés and western craft-market area make a practical orientation zone for a first stay.','ag-plaza'],
  ],antiguaPlaces),
]
export const expansionItineraries: Itinerary[] = [
  {id:'it-san-juan-weekend',destinationId:'san-juan',title:'Two Days in San Juan',isReadyMade:true,days:[
    {day:1,theme:'Old city, coffee and the fort',activities:[{id:'sj1',time:'09:00',label:'Coffee',placeId:'pl-sj-cuatro-sombras'},{id:'sj2',time:'10:00',label:'El Morro',placeId:'pl-sj-el-morro'},{id:'sj3',time:'13:00',label:'Lunch',notes:'Leave lunch open near your old-city walk.'},{id:'sj4',time:'16:00',label:'Waterfront walk',placeId:'pl-sj-paseo'},{id:'sj5',time:'19:00',label:'Dinner',placeId:'pl-sj-marmalade',notes:'Reserve directly; substitute a casual meal if preferred.'}]},
    {day:2,theme:'Art and the coast',activities:[{id:'sj6',time:'10:00',label:'Museum morning',placeId:'pl-sj-mapr',notes:'Check opening hours before setting out.'},{id:'sj7',time:'13:00',label:'Lunch',placeId:'pl-sj-ropa-vieja'},{id:'sj8',time:'15:00',label:'Beach walk',placeId:'pl-sj-condado'},{id:'sj9',time:'17:00',label:'Browse Ashford Avenue',placeId:'pl-sj-ashford'}]},
  ]},
  {id:'it-antigua-guatemala-weekend',destinationId:'antigua-guatemala',title:'Two Days in Antigua Guatemala',isReadyMade:true,days:[
    {day:1,theme:'A first city walk',activities:[{id:'ag1',time:'09:00',label:'Coffee',placeId:'pl-ag-condesa'},{id:'ag2',time:'10:00',label:'The arch',placeId:'pl-ag-arch'},{id:'ag3',time:'11:00',label:'La Merced',placeId:'pl-ag-merced'},{id:'ag4',time:'13:00',label:'Lunch',notes:'Choose a table along your walk.'},{id:'ag5',time:'15:00',label:'Craft browsing',placeId:'pl-ag-artisan-market'}]},
    {day:2,theme:'Courtyards and a long meal',activities:[{id:'ag6',time:'09:00',label:'Coffee and chocolate',placeId:'pl-ag-fernandos'},{id:'ag7',time:'10:30',label:'Capuchinas',placeId:'pl-ag-capuchinas'},{id:'ag8',time:'13:00',label:'Lunch',placeId:'pl-ag-sky'},{id:'ag9',time:'15:00',label:'Santa Clara',placeId:'pl-ag-santa-clara'},{id:'ag10',time:'19:00',label:'Dinner',placeId:'pl-ag-refectorio',notes:'Check the menu and reserve directly.'}]},
  ]},
]
for (const guide of expansionCityGuides) guide.relatedGuideIds = expansionCityGuides.filter(g=>g.destinationId===guide.destinationId&&g.id!==guide.id).map(g=>g.id)
