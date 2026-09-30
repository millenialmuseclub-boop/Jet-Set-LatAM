import fs from 'node:fs'
const upgrade=JSON.parse(fs.readFileSync('src/data/editorial-upgrade.json'))
const guideIds=new Set(upgrade.guides.map(g=>g.id)),placeIds=new Set(upgrade.places.map(p=>p.id))
// Older release baselines remain valid after these explicitly reviewed additions.
export function beforeEditorialAdditions(record,kind){
 const r=JSON.parse(JSON.stringify(record))
 if(kind==='destinations'){r.neighborhoods=r.neighborhoods.filter(n=>n.id!=='nb-santiago-barrio-italia');r.guideIds=r.guideIds.filter(id=>!guideIds.has(id));r.placeIds=r.placeIds.filter(id=>!placeIds.has(id))}
 if(kind==='guides')r.placeIds=r.placeIds.filter(id=>!upgrade.links.some(l=>l.guideId===r.id&&l.placeId===id))
 if(kind==='places'&&r.relatedGuideIds){r.relatedGuideIds=r.relatedGuideIds.filter(id=>!guideIds.has(id)&&!upgrade.links.some(l=>l.guideId===id&&l.placeId===r.id));if(!r.relatedGuideIds.length)delete r.relatedGuideIds}
 return r
}
