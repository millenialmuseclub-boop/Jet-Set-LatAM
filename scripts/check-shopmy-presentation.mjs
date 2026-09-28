import assert from 'node:assert/strict'
import fs from 'node:fs'
import {execFileSync} from 'node:child_process'
import {createServer} from 'vite'
const server=await createServer({server:{middlewareMode:true,hmr:false}})
try{
 const {destinations}=await server.ssrLoadModule('/src/data/index.ts')
 const {shopmyPresentation}=await server.ssrLoadModule('/src/lib/shopmyPresentation.ts')
 const {shopmyEdits}=await server.ssrLoadModule('/src/data/shopmy.ts')
 const allowed=new Set(Object.values(shopmyEdits).map(e=>e.url)),audit=[]
 for(const d of destinations)for(const packing of [false,true]){
  const edits=shopmyPresentation(d.id,packing)
  assert.equal(edits.length,2);assert.equal(new Set(edits.map(e=>e.photo?.src)).size,2,d.id+' repeated shopping image')
  for(const e of edits){assert(allowed.has(e.url));assert(e.photo?.src&&e.photo.caption&&e.label&&e.note);assert(fs.existsSync('.'+e.photo.src),d.id+' missing local asset')}
  audit.push({city:d.city,packing,edits:edits.map(e=>({label:e.label,url:e.url,photo:e.photo}))})
 }
 const paths=['src/data/shopmy.ts','src/data/style.ts','src/components/ShopMyEdit.tsx']
 for(const path of paths){const old=execFileSync('git',['show','828abf0110c5c32f38a0e080c4d838b4bdfcdc27:'+path],{encoding:'utf8'});const now=fs.readFileSync(path,'utf8');for(const url of old.match(/https:\/\/shopmy\.us\/[^'"\s]+/g)||[])assert(now.includes(url),'Original ShopMy URL changed: '+url)}
 const ui=fs.readFileSync('src/components/ShopMyEdit.tsx','utf8');assert(ui.includes('<Carousel'));assert(!ui.includes('priority='));assert(ui.includes('Destination inspiration'));assert(ui.includes('AffiliateDisclosure'))
 fs.writeFileSync('visual-qa/shopmy-presentation-audit.json',JSON.stringify(audit,null,2))
 console.log(`${destinations.length} city edits: two distinct local photos each; existing ShopMy URLs exact; no retailer images, eager loading or invented inventory.`)
}finally{await server.close()}
