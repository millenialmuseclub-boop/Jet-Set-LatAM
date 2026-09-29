import assert from 'node:assert/strict'
import fs from 'node:fs'
import {execFileSync} from 'node:child_process'
import {createServer} from 'vite'
const server=await createServer({server:{middlewareMode:true,hmr:false}})
try{
 const {destinations}=await server.ssrLoadModule('/src/data/index.ts')
 const {shopmyPresentation}=await server.ssrLoadModule('/src/lib/shopmyPresentation.ts')
 const {shopmyEdits}=await server.ssrLoadModule('/src/data/shopmy.ts')
 const {collectionProducts,emptyCollections,destinationProductOffset}=await server.ssrLoadModule('/src/data/shopmy-products.ts')
 const allPreviewImages=[]
 for(const [key,products] of Object.entries(collectionProducts)){
  assert(key in shopmyEdits,'Preview has no verified collection')
  assert(!emptyCollections.has(key),'Empty collection has product previews')
  for(const product of products){assert(product.name.trim());assert.equal(new URL(product.image).protocol,'https:')}
 }
 for(const [city,key] of Object.entries({cartagena:'cartagena','mexico-city':'cdmx','rio-de-janeiro':'rio',merida:'resort',salvador:'resort','panama-city':'resort'})){
  const offset=destinationProductOffset[city]||0,products=collectionProducts[key].slice(offset,offset+3)
  assert.equal(products.length,3,city+' missing preview products')
  assert.equal(shoppingCollection(city),shopmyEdits[key].url,city+' preview collection mismatch')
  allPreviewImages.push(...products.map(p=>p.image))
 }
 assert.equal(new Set(allPreviewImages).size,18,'Featured cities repeat product images')
 function shoppingCollection(city){return shopmyPresentation(city,false)[0].url}
 const allowed=new Set(Object.values(shopmyEdits).map(e=>e.url)),audit=[]
 for(const d of destinations)for(const packing of [false,true]){
  const edits=shopmyPresentation(d.id,packing)
  assert.equal(edits.length,2);assert.equal(new Set(edits.map(e=>e.photo?.src)).size,2,d.id+' repeated shopping image')
  for(const e of edits){assert(allowed.has(e.url));assert(e.photo?.src&&e.photo.caption&&e.label&&e.note);assert(fs.existsSync('.'+e.photo.src),d.id+' missing local asset')}
  audit.push({city:d.city,packing,edits:edits.map(e=>({label:e.label,url:e.url,photo:e.photo}))})
 }
 const paths=['src/data/shopmy.ts','src/data/style.ts','src/components/ShopMyEdit.tsx']
 for(const path of paths){const old=execFileSync('git',['show','828abf0110c5c32f38a0e080c4d838b4bdfcdc27:'+path],{encoding:'utf8'});const now=fs.readFileSync(path,'utf8');for(const url of old.match(/https:\/\/shopmy\.us\/[^'"\s]+/g)||[])assert(now.includes(url),'Original ShopMy URL changed: '+url)}
 const ui=fs.readFileSync('src/components/ShopMyEdit.tsx','utf8');assert(ui.includes('edit-products'));assert(ui.includes('emptyCollections.has(key)'));assert(!ui.includes('priority='));assert(ui.includes('Destination inspiration'));assert(ui.includes('AffiliateDisclosure'))
 fs.writeFileSync('visual-qa/shopmy-presentation-audit.json',JSON.stringify(audit,null,2))
 console.log(`${destinations.length} city edits: two distinct local photos each; existing ShopMy URLs exact; destination context preserved; product previews checked separately; no eager loading or invented inventory.`)
}finally{await server.close()}
