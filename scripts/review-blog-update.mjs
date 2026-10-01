import fs from 'node:fs'
import {createServer} from 'vite'
import * as cheerio from 'cheerio'
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
const plain=s=>cheerio.load(s||'').text().replace(/\s+/g,' ').trim()
const server=await createServer({server:{middlewareMode:true}})
try {
 const {guides,destinations,places}=await server.ssrLoadModule('/src/data/index.ts')
 const posts=JSON.parse(fs.readFileSync('archive-source/blog-review.json','utf8')).posts
 const urls=new Set(guides.map(g=>g.sourceUrl.replace(/\/$/,'')))
 const ids=new Set(guides.map(g=>g.id))
 const records=fs.existsSync('src/data/blog-update.json')?JSON.parse(fs.readFileSync('src/data/blog-update.json','utf8')):[],skipped=[]
 for(const p of posts.filter(p=>p.date>='2026-09-27')) {
  if(urls.has(p.URL.replace(/\/$/,''))||ids.has(`wp-${p.ID}`))continue
  const title=plain(p.title),t=normalize(title)
  const matches=destinations.filter(d=>d.status!=='coming-soon'&&[d.city,d.name,d.id.replaceAll('-',' ')].filter(Boolean).some(n=>new RegExp(`(^|[^a-z])${normalize(n).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}([^a-z]|$)`).test(t)))
  const regional=/latin america|latin american|mexican fashion|colombian fashion|brazilian fashion|peruvian fashion|argentine and uruguayan|chilean and ecuadorian/.test(t)
  if(!matches.length&&!regional){skipped.push({id:p.ID,title,url:p.URL});continue}
  const $=cheerio.load(p.content)
  $('script,style,iframe,form,nav,img,figure,.sharedaddy,.jp-relatedposts,.wp-block-jetpack-related-posts,.wp-block-jetpack-subscriptions,.wp-block-latest-posts,.wp-block-query').remove()
  const body=$('body').html()?.trim()||''
  if(plain(body).length<200)throw Error(`Incomplete article ${p.ID}`)
  const destinationId=regional?'':matches[0].id
  const section=/fashion|designer|shopping|jewelry|textiles|wardrobe|souvenir|handbags|menswear/.test(t)?'shop':/where to stay/.test(t)?'stay':/eat|food|restaurants|cooking/.test(t)?'eat':/museum|art and design/.test(t)?'see':/beaches/.test(t)?'beaches':'experiences'
  const named=places.filter(pl=>matches.some(d=>d.city===pl.city)&&normalize(pl.name.split(' (')[0]).length>5&&normalize(plain(body)).includes(normalize(pl.name.split(' (')[0])))
  records.push({id:`wp-${p.ID}`,title,destinationId,section,dek:plain(p.excerpt).slice(0,400)||plain(body).slice(0,240),body,placeIds:named.map(pl=>pl.id),sourceUrl:p.URL,publishedAt:p.date,relatedDestinationIds:matches.map(d=>d.id),categories:Object.keys(p.categories||{}),relatedGuideIds:guides.filter(g=>g.destinationId===destinationId&&g.section===section).slice(0,3).map(g=>g.id)})
 }
 fs.writeFileSync('src/data/blog-update.json',JSON.stringify(records,null,2)+'\n')
 fs.writeFileSync('docs/BLOG_REVIEW_2026_10_01.json',JSON.stringify({checkedAt:'2026-10-01',scanned:posts.length,added:records.map(({body:_body,...g})=>g),outsideCurrentDestinations:skipped},null,2)+'\n')
 console.log(JSON.stringify({scanned:posts.length,added:records.length,regional:records.filter(g=>!g.destinationId).length,outsideCurrentDestinations:skipped.length,bySection:records.reduce((a,g)=>(a[g.section]=(a[g.section]||0)+1,a),{})}))
} finally {await server.close()}
