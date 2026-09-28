import { guides } from '@/data'

// Match published story URLs only. Tracking queries and anchors remain external
// and untouched; affiliate URLs never enter this index.
const storyRoutes = new Map(guides.filter(g=>g.sourceUrl&&g.editorialSource!=='researched').map(g=>[g.sourceUrl.replace(/\/$/,''),`/guides/${g.id}`]))
export function internalArticleLink(url:string) {
  try {
    const parsed=new URL(url)
    if(parsed.search||parsed.hash)return undefined
    if(!['thebrunchmanifesto.blog','jetsetlatam.com','www.jetsetlatam.com'].includes(parsed.hostname))return undefined
    return storyRoutes.get(url.replace(/\/$/,''))
  } catch {return undefined}
}

/** Two legacy AFAR paths returned 404. Retain the archived source in data,
 * but label the alternative honestly rather than sending readers to a dead page. */
export function guideSourceLink(sourceUrl:string) {
  if(sourceUrl==='https://www.afar.com/places/in-situ-mezcaleria-oaxaca')return {url:'https://insitumezcaleria.com/',label:'Visit In Situ’s official website'}
  if(sourceUrl==='https://www.afar.com/travel-tips/where-to-eat-in-oaxaca')return {url:guides.find(g=>g.id==='wp-14143')!.sourceUrl,label:'Read more Oaxaca food stories'}
  return {url:sourceUrl,label:undefined}
}
