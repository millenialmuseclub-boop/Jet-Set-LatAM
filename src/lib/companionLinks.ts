import { appFamily, type AppFamilyId } from '@/config/appFamily'
import { luxeJetterLink, wardrobeIntentForTrip } from './luxeJetterLinks'
import type { Itinerary } from '@/types'

export interface CompanionLink {
  app: AppFamilyId
  url: string
  fallbackUrl: string
  cta: string
  detail: string
}

// Receiving routes/catalogs checked 2026-09-27. No unverified native schemes.
// Little Jetter has these cities, but no destination URL receiver: use an honest
// App Store fallback, with instructions to choose the city inside the app.
const familyCities: Record<string,string> = {
  'mexico-city':'Mexico City', cartagena:'Cartagena', 'san-jose-costa-rica':'San José',
  lima:'Lima', 'buenos-aires':'Buenos Aires', 'rio-de-janeiro':'Rio de Janeiro',
}
const foodWorlds = [
  {match:/\b(alfajores?|cookies?|galletas?)\b/i,path:'/cookies',name:'Cookies'},
  {match:/\b(ramen)\b/i,path:'/ramen',name:'Ramen'},
  {match:/\b(pasta|noodles?|fideos?|gnocchi|ravioli|tagliatelle)\b/i,path:'/noodles',name:'Noodles'},
  {match:/\b(cakes?|tortes?|tres leches)\b/i,path:'/atlas/cakes',name:'Cake'},
]
export function foodCompanion(text:string): CompanionLink | undefined {
  const world=foodWorlds.find(world=>world.match.test(text))
  if(!world)return undefined
  return {app:'let-them-eat',url:`https://letthemeatcake.netlify.app${world.path}`,
    fallbackUrl:appFamily['let-them-eat'].iOSURL!,cta:`Explore the Food · ${world.name}`,
    detail:`Follow this flavor into the ${world.name} world in Let Them Eat.`}
}
// The receiving app's Alfajor record explicitly covers Argentina and Uruguay.
// Only use this destination match at an already food-focused moment.
export function destinationFoodCompanion(destinationId:string): CompanionLink | undefined {
  if(!['buenos-aires','montevideo'].includes(destinationId))return undefined
  return {app:'let-them-eat',url:'https://letthemeatcake.netlify.app/cookies/encyclopedia/cookie_alfajor',
    fallbackUrl:appFamily['let-them-eat'].iOSURL!,cta:'Explore the Food · Alfajores',
    detail:'A sweet detour: explore the story and variations of alfajores in Let Them Eat.'}
}
export function familyCompanion(destinationId:string, familyIntent:boolean): CompanionLink | undefined {
  const city=familyCities[destinationId]
  if(!familyIntent||!city)return undefined
  return {app:'little-jetter',url:appFamily['little-jetter'].iOSURL!,fallbackUrl:appFamily['little-jetter'].iOSURL!,
    cta:'Explore with Little Jetter',detail:`Traveling with kids? Choose ${city} in Little Jetter for destination dress-up and discoveries. Opens the App Store.`}
}
export function wardrobeCompanion(destinationId:string,itinerary?:Itinerary,packing=!!itinerary) {
  const link=luxeJetterLink(destinationId,packing?'packing':'looks',wardrobeIntentForTrip(itinerary))
  return {...link,app:'luxe-jetter' as const,fallbackUrl:appFamily['luxe-jetter'].iOSURL!,
    cta:packing?'Pack for This Trip':'What to Wear',detail:'Build a wardrobe around your destination.'}
}
// An editorial journey, never presented as nearby or as a connection from a city.
export const railCompanions: Record<string,CompanionLink> = {
  'el-chepe-express':{app:'rallii',url:'https://rallii-kappa.vercel.app/routes/el-chepe-express/',
    fallbackUrl:appFamily.rallii.iOSURL!,cta:'Explore El Chepe in Rallii',detail:'Los Mochis to Creel · a separate journey in northern Mexico.'},
}
