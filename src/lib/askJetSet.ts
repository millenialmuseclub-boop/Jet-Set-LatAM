import { destinations, getPlacesByDestination, getPlace, getGuidesByDestination } from '@/data'
import { trails } from '@/data/trails'
import type { Place, Guide, Itinerary, SavedTrip } from '@/types'
import type { Trail } from '@/data/trails'
import { activeDayIndex, tripPhase } from './tripLifecycle'
export interface AskRequest {question:string;destinationId?:string;trip?:SavedTrip;itinerary?:Itinerary;savedPlaceIds?:string[];now?:Date}
export interface AskAnswer {destinationId?:string;summary:string;places:Place[];guides:Guide[];trails:Trail[];context:string}
export interface JetSetAnswerProvider {answer(request:AskRequest):Promise<AskAnswer>}
const norm=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
const aliases:Record<string,string[]>={'mexico-city':['mexico city','ciudad de mexico','cdmx','roma','condesa'],'rio-de-janeiro':['rio'],'sao-paulo':['sao paulo'],'buenos-aires':['buenos aires'],'cartagena':['cartagena'],'guadalajara':['guadalajara'],'tulum':['tulum'],'playa-del-carmen':['playa del carmen']}
export function composeJetSetAnswer(r:AskRequest):AskAnswer {
 const q=norm(r.question),now=r.now||new Date();const explicit=destinations.find(d=>(aliases[d.id]||[norm(d.city)]).some(a=>new RegExp('(^|\\W)'+a+'($|\\W)').test(q)))
 const destinationId=explicit?.id||r.destinationId||r.trip?.destinationId;const dest=destinations.find(d=>d.id===destinationId)
 const base:AskAnswer={destinationId,summary:'Choose a destination so I can look through the right Jet Set collection.',places:[],guides:[],trails:[],context:'From the Jet Set collection'}
 if(!dest)return base
 const all=getPlacesByDestination(dest.id);
 const namedLocation=q.match(/\b(?:in|around|from) ([a-z][a-z ]+)[?.!]*$/)?.[1]?.trim()
 if(namedLocation&&!explicit&&!/^(the |my |this |today|our )/.test(namedLocation)&&!all.some(p=>p.neighborhood&&norm(p.neighborhood).includes(namedLocation))&&!norm(dest.city).includes(namedLocation))return {...base,summary:'That location is outside the destinations and neighborhoods I can match in the Jet Set collection. Try a city listed above.',context:'Collection coverage'}
 const relevantTrip=r.trip?.destinationId===dest.id&&r.itinerary?.destinationId===dest.id
 const active=relevantTrip&&tripPhase(r.trip!,r.itinerary,now)==='active';const day=active?r.itinerary?.days[activeDayIndex(r.trip!,now)]:undefined
 const todayPlaces=day?.activities.flatMap(a=>{const p=a.placeId?getPlace(a.placeId):undefined;return p?[p]:[]})||[]
 const food=/\beat\b|food|restaurant|lunch|breakfast/.test(q)||(/dinner/.test(q)&&!/before dinner/.test(q)),art=/\bart\b|museum|design/.test(q)&&!food,night=/tonight|after dark|cocktail|nightlife/.test(q),saved=/saved|favorites|favourites/.test(q),picks=/actually|firsthand|jet set pick|personally/.test(q)
 const explicitNeighborhood=[...new Set(all.map(p=>p.neighborhood).filter((n):n is string=>!!n))].find(n=>q.includes(norm(n))||norm(n).startsWith('roma')&&/\broma\b/.test(q))
 const wantsToday=/today|today’s|today's/.test(q),nearMuseum=wantsToday&&/museum/.test(q)
 const neighborhoods=explicitNeighborhood?[explicitNeighborhood]:wantsToday?(nearMuseum?todayPlaces.filter(p=>p.category==='museum'):todayPlaces).map(p=>p.neighborhood).filter((n):n is string=>!!n):[]
 if(wantsToday&&!day)return {...base,summary:'There is no active itinerary day for '+dest.city+'. Add dates to your saved trip, or ask about a neighborhood.',context:dest.city}
 if(nearMuseum&&!neighborhoods.length)return {...base,summary:'Today’s itinerary has no museum with a recorded neighborhood. Name a neighborhood to find food in the collection.',context:dest.city}
 const hours=q.match(/(\d+)\s*hours?/)?.[1]||(/four hours/.test(q)?'4':undefined)
 const tokens=q.split(/[^a-z0-9]+/).filter(t=>t.length>3&&!['what','where','should','have','give','some','before','hours','four','with','from','this','that','please','could','would','about','today','tonight','actually','liked','like','saved','places','favorites','favourites','afternoon','dinner'].includes(t)&&!norm(dest.city).includes(t))
 const intent=food||art||night||saved||picks||!!explicitNeighborhood||/trail|things to do|explore|highlights/.test(q)
 let candidates=all.filter(p=>(!food||['restaurant','cafe'].includes(p.category))&&(!art||['museum','shop','landmark'].includes(p.category))&&(!night||['restaurant','bar','nightlife'].includes(p.category))&&(!picks||p.isJetSetPick)&&(!saved||r.savedPlaceIds?.includes(p.id))&&(!neighborhoods.length||!!p.neighborhood&&neighborhoods.includes(p.neighborhood)))
 const score=(p:Place)=>tokens.filter(t=>norm([p.name,p.description,...p.tags].join(' ')).includes(t)).length
 if(!intent)candidates=candidates.filter(p=>tokens.length>0&&score(p)>0)
 candidates.sort((a,b)=>score(b)-score(a)||Number(b.isJetSetPick)-Number(a.isJetSetPick))
 const selected=candidates.slice(0,4),ids=new Set(selected.map(p=>p.id))
 const journal=getGuidesByDestination(dest.id).filter(g=>g.placeIds.some(id=>ids.has(id))||(!intent&&tokens.length>0&&tokens.some(t=>norm(g.title+' '+g.dek).includes(t)))).slice(0,2)
 const paths=trails.filter(t=>t.destinationId===dest.id&&(!hours||t.estimatedHours<=Number(hours))&&(!saved&&!picks)&&t.placeIds.some(id=>ids.has(id))).slice(0,1)
 const context=dest.city+(neighborhoods.length?' · '+[...new Set(neighborhoods)].join(' / '):'')+(wantsToday&&day?' · Day '+day.day:'')
 return {...base,places:selected,guides:journal,trails:paths,context,summary:selected.length?(saved?'From your saved places. ':picks?'These entries are marked as Jet Set Picks in the collection. ':'Here are places from the Jet Set collection. ')+(neighborhoods.length?'Matched by neighborhood, not walking distance. ':'')+(night?'Check opening hours and reservations before heading out. ':'')+(hours?'The trail duration is an estimate; check travel and opening times. ':''):journal.length?'The journal has these related stories.':'I couldn’t find a supported match in this destination’s Jet Set collection. Try a place, neighborhood, food, art, or nightlife.'}
}
export const localJetSetProvider:JetSetAnswerProvider={answer:async request=>composeJetSetAnswer(request)}
