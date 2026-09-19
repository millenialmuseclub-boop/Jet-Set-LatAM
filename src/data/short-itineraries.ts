import type { Itinerary } from '@/types'
export const shortItineraries: Itinerary[] = [
 {id:'it-tulum-short',destinationId:'tulum',title:'Two unhurried days in Tulum',isReadyMade:true,days:[
  {day:1,theme:'Ruins + a beach afternoon',activities:[
   {id:'tulum-ruins',time:'Morning',label:'Culture',placeId:'pl-tulum-ruins',notes:'Make the ruins the anchor of the morning. Check current admission and access before setting out.'},
   {id:'tulum-lunch',time:'Lunch',label:'Time for lunch',notes:'Choose a table near your next stop; leave room for the transfer to the coast.'},
   {id:'tulum-beach',time:'Afternoon',label:'Beach',placeId:'pl-papaya-playa-project',notes:'Confirm current day access and any minimum spend before making this your afternoon plan.'}]},
  {day:2,theme:'One cenote, then slow down',activities:[
   {id:'tulum-cenote',time:'Morning',label:'Swim',placeId:'pl-cenote-cristalino',notes:'Choose one cenote rather than racing between three. Plan the return transfer before leaving.'},
   {id:'tulum-reset',time:'Afternoon',label:'Open afternoon',notes:'Keep the afternoon free for a meal, rest and your return journey. Add a spa only after confirming an appointment.'}]}]},
 {id:'it-playa-short',destinationId:'playa-del-carmen',title:'Two days: Playa + Xcaret',isReadyMade:true,days:[
  {day:1,theme:'Garden breakfast + waterfront',activities:[
   {id:'playa-breakfast',time:'9:00',label:'Breakfast',placeId:'pl-la-cueva-del-chango'},
   {id:'playa-cacao',time:'Afternoon',label:'Chocolate break',placeId:'pl-ah-cacao'},
   {id:'playa-square',time:'Sunset',label:'Waterfront',placeId:'pl-parque-fundadores'},
   {id:'playa-dinner',time:'Evening',label:'Dinner',placeId:'pl-el-fogon'}]},
  {day:2,theme:'Leave a full day for Xcaret',activities:[
   {id:'playa-xcaret',time:'Daytime',label:'Park day',placeId:'pl-xcaret-butterfly-sanctuary',notes:'The sanctuary is inside Xcaret. Choose your park admission and transport separately; allow time for the wider park, not just this stop.'},
   {id:'playa-return',time:'Evening',label:'Return + rest',notes:'Keep the evening flexible around your transport back and energy after the park.'}]}]},
 {id:'it-guadalajara-short',destinationId:'guadalajara',title:'Guadalajara: murals + a slow afternoon',isReadyMade:true,days:[
  {day:1,theme:'Centro + Colonia Americana',activities:[
   {id:'gdl-murals',time:'Morning',label:'Art',placeId:'pl-instituto-cabanas',notes:'Check opening days before you build the morning around the murals.'},
   {id:'gdl-lunch',time:'Lunch',label:'A table in Centro',notes:'Leave space to choose lunch in the historic center rather than booking a cross-city detour.'},
   {id:'gdl-americana',time:'Afternoon',label:'Colonia Americana',notes:'Make a separate neighborhood wander of the art deco streets and galleries. Allow transfer time from Centro.'}]}]},
]
