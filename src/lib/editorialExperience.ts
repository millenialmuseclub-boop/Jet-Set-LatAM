import type { Guide, Place, Destination } from '@/types'
import { articleBlocks, decodeArticleText } from './article'
const normalize=(s:string)=>decodeArticleText(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()
export function storyHighlights(guide:Guide){return articleBlocks(guide.body).filter(b=>(b.kind==='h2'||b.kind==='h3')&&b.text.length<110&&!/jet set shopping notes|avenida|source|further reading|continue|quick links|about our|plan your|luxe jetter|rallii|explore more/i.test(b.text)).slice(0,3)}
export function neighborhoodReads(destination:Destination,name:string,guides:Guide[]){const n=normalize(name);if(n.length<4)return[];return guides.filter(g=>g.destinationId===destination.id&&normalize(g.title+' '+g.dek+' '+g.body.replace(/<[^>]+>/g,' ')).includes(n)).slice(0,2)}
export function sameNeighborhoodPlaces(mentioned:Place[],all:Place[]){const neighborhoods=new Set(mentioned.map(p=>p.neighborhood).filter(Boolean));return all.filter(p=>!mentioned.some(m=>m.id===p.id)&&neighborhoods.has(p.neighborhood)&&['restaurant','cafe','shop'].includes(p.category)&&!/(day trip|valley|excursion)/i.test(p.neighborhood||'')).slice(0,2)}
export function placeStoryLinks(place:Place,guides:Guide[]){return guides.filter(g=>g.placeIds.includes(place.id)).slice(0,2)}
