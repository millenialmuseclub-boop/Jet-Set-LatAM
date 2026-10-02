import fs from 'node:fs'
import {createServer} from 'vite'
import * as cheerio from 'cheerio'
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
const plain=s=>cheerio.load(s||'').text().replace(/\s+/g,' ').trim()
const server=await createServer({server:{middlewareMode:true}})
try {
 const {guides,destinations,places}=await server.ssrLoadModule('/src/data/index.ts')
 const {publishedGuideSection}=await server.ssrLoadModule('/src/lib/guideTopics.ts')
 const posts=JSON.parse(fs.readFileSync('archive-source/blog-review.json','utf8')).posts
 const urls=new Set(guides.map(g=>g.sourceUrl.replace(/\/$/,'')))
 const ids=new Set(guides.map(g=>g.id))
 const records=fs.existsSync('src/data/blog-update.json')?JSON.parse(fs.readFileSync('src/data/blog-update.json','utf8')):[],skipped=[]
 const added=[], incomplete=[], excluded=[]
 for(const p of posts) {
  if(urls.has(p.URL.replace(/\/$/,''))||ids.has(`wp-${p.ID}`))continue
  const title=plain(p.title),t=normalize(title)
  if(/fifa|world cup|let them eat|introducing rallii|rallii (green|mtb|snow|rail|trail)|introducing luxe|meet luxe|shop the edit/.test(t)){excluded.push({id:p.ID,title,url:p.URL});continue}
  const matches=destinations.filter(d=>d.status!=='coming-soon'&&[d.city,d.name,d.id.replaceAll('-',' ')].filter(Boolean).some(n=>new RegExp(`(^|[^a-z])${normalize(n).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}([^a-z]|$)`).test(t)))
  const regional=/latin america|latin american|south america|latin designers|mexic|colombi|brazil|peru\b|peruvian|argentin|uruguay|chile\b|chilean|ecuador|costa rica|guatemala|panama|puerto rico|cuba\b|bolivia|paraguay|nicaragua|dominican republic|dominica\b|patagonia|galapagos|sacred valley|machu picchu|riviera maya|cancun|punta cana|bavaro|paraty|trancoso|caraiva|boquete|monteverde|arenal|la fortuna|nicoya|el chalten|el calafate|torres del paine|guna yala|san blas|iguazu|pantanal|jericoacoara|bahia|puerto vallarta|tepoztlan|jose ignacio|cali\b|ipanema|puerto varas|recife|antigua shopping|chepe express|copper canyon|san andres|monterrey|ixtapa|costa mujeres/.test(t)
  if(!matches.length&&!regional){skipped.push({id:p.ID,title,url:p.URL});continue}
  const $=cheerio.load(p.content)
  $('script,style,iframe,form,nav,img,figure,.sharedaddy,.jp-relatedposts,.wp-block-jetpack-related-posts,.wp-block-jetpack-subscriptions,.wp-block-latest-posts,.wp-block-kadence-posts,.wp-block-query').remove()
  $('a[href]').each((_,el)=>{try {const href=$(el).attr('href');if(href.startsWith('/')||href.startsWith('./')||href.startsWith('../'))$(el).attr('href',new URL(href,p.URL).href)} catch { /* Ignore malformed source links. */ }})
  const body=$('body').html()?.trim()||''
  if(plain(body).length<200){incomplete.push({id:p.ID,title,url:p.URL});continue}
  const destinationId=matches[0]?.id||''
  const section=publishedGuideSection(title)
  const named=places.filter(pl=>matches.some(d=>d.city===pl.city)&&normalize(pl.name.split(' (')[0]).length>5&&normalize(plain(body)).includes(normalize(pl.name.split(' (')[0])))
  records.push({id:`wp-${p.ID}`,title,destinationId,section,dek:plain(p.excerpt).slice(0,400)||plain(body).slice(0,240),body,placeIds:named.map(pl=>pl.id),sourceUrl:p.URL,publishedAt:p.date,relatedDestinationIds:matches.map(d=>d.id),categories:Object.keys(p.categories||{}),relatedGuideIds:guides.filter(g=>g.destinationId===destinationId&&g.section===section).slice(0,3).map(g=>g.id)})
  ids.add(`wp-${p.ID}`);urls.add(p.URL.replace(/\/$/,''));added.push(records.at(-1))
 }
 fs.writeFileSync('src/data/blog-update.json',JSON.stringify(records,null,2)+'\n')
 fs.writeFileSync('docs/BLOG_REVIEW_2026_10_02.json',JSON.stringify({checkedAt:'2026-10-02',scanned:posts.length,added:added.map(({body:_body,...g})=>g),outsideCurrentDestinations:skipped,incomplete,excluded},null,2)+'\n')
 console.log(JSON.stringify({scanned:posts.length,added:added.length,totalImports:records.length,regional:records.filter(g=>!g.destinationId).length,outsideCurrentDestinations:skipped.length,incomplete:incomplete.length,bySection:added.reduce((a,g)=>(a[g.section]=(a[g.section]||0)+1,a),{})}))
} finally {await server.close()}
