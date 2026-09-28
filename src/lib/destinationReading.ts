import type { Guide } from '@/types'

export const readingSections = ['stay','eat','experiences','shop'] as const
const normalizedTitle = (title:string) => title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'')

/** Hide duplicate article cards, while retaining every original saved guide route. */
export function distinctStories(stories:Guide[]) {
 const preferred = [...stories].sort((a,b)=>Number(b.id.startsWith('wp-'))-Number(a.id.startsWith('wp-')))
 const seen = new Set<string>(), selected = new Set<string>()
 for (const g of preferred) {
  const title = `${g.destinationId}:${normalizedTitle(g.title)}`
  if (!seen.has(title)) {seen.add(title);selected.add(g.id)}
 }
 return stories.filter(g=>selected.has(g.id))
}

export function isFirstVisitGuide(g:Guide) {
 return /first[- ’']?(?:timer|visit|weekend)|first two days|choose a base|pick your neighborhoods|capital worth a city day/i.test(g.title)
}

export function guidesForSection(stories:Guide[], section:string) {
 return distinctStories(stories).filter(g=>{
  const title=[g.title,...(g.categories||[])].join(' ')
  if(section==='stay') return g.section==='stay'||/where to stay|choos.*base|boutique hotels|hotel review|hoteles/i.test(title)||isFirstVisitGuide(g)&&/base|stay|hotel|neighborhood/i.test(g.body)
  if(section==='eat') return ['eat','drink'].includes(g.section)||/food|restaurants|coffee|caf[eé]|markets|seafood/i.test(title)
  if(section==='shop') return g.section==='shop'||/shopping|style|craft|boutiques|designers/i.test(title)
  if(section==='experiences') return ['experiences','beaches','see'].includes(g.section)
  if(section==='see') return g.section==='see'
  if(section==='drink') return g.section==='drink'||/coffee|caf[eé]|nightlife|after dark/i.test(title)
  return false
 }).sort((a,b)=>Number(b.id.startsWith('wp-'))-Number(a.id.startsWith('wp-'))||(b.publishedAt||'').localeCompare(a.publishedAt||''))
}
