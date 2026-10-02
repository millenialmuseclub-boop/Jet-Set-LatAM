import { guides, destinations } from '@/data'

// Match published story URLs only. Tracking queries and anchors remain external
// and untouched; affiliate URLs never enter this index.
const storyRoutes = new Map(guides.filter(g=>g.sourceUrl&&g.editorialSource!=='researched').map(g=>[g.sourceUrl.replace(/\/$/,''),`/guides/${g.id}`]))
const slug = (text:string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
const locationRoutes = new Map<string,string>([
  ...guides.flatMap(g=>(g.storyLocations||[]).filter(location=>location!=='Latin America').map(location=>[`/${slug(location)}`,`/explore?destination=${encodeURIComponent(`reading:${location}`)}`] as const)),
  ...[...new Set(guides.flatMap(g=>g.countries||[]))].map(country=>[`/${slug(country)}`,`/explore?country=${encodeURIComponent(country)}`] as const),
  ...destinations.filter(d=>d.status!=='coming-soon').flatMap(d=>[d.slug,d.id,slug(d.city)].map(path=>[`/${path}`,`/destinations/${d.slug}`] as const)),
])
export function internalArticleLink(url:string) {
  try {
    const parsed=new URL(url)
    if(parsed.search||parsed.hash)return undefined
    if(!['thebrunchmanifesto.blog','jetsetlatam.com','www.jetsetlatam.com'].includes(parsed.hostname))return undefined
    return storyRoutes.get(url.replace(/\/$/,'')) || locationRoutes.get(parsed.pathname.replace(/\/$/,''))
  } catch {return undefined}
}

/** Two legacy AFAR paths returned 404. Retain the archived source in data,
 * but label the alternative honestly rather than sending readers to a dead page. */
export function guideSourceLink(sourceUrl:string) {
  if(sourceUrl==='https://www.afar.com/places/in-situ-mezcaleria-oaxaca')return {url:'https://insitumezcaleria.com/',label:'Visit In Situ’s official website'}
  if(sourceUrl==='https://www.afar.com/travel-tips/where-to-eat-in-oaxaca')return {url:guides.find(g=>g.id==='wp-14143')!.sourceUrl,label:'Read more Oaxaca food stories'}
  return {url:sourceUrl,label:undefined}
}
