import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createServer} from 'vite'
import sharp from 'sharp'
const server=await createServer({server:{middlewareMode:true}})
try {
 const data=await server.ssrLoadModule('/src/data/index.ts')
 const {websiteGuides}=await server.ssrLoadModule('/src/data/website-guides.ts')
 const {articleBlocks}=await server.ssrLoadModule('/src/lib/article.ts')
 const photos=JSON.parse(readFileSync('docs/WEBSITE_REFRESH_PHOTOGRAPHY.json','utf8'))
 assert.equal(websiteGuides.length,22)
 for(const guide of websiteGuides){
  assert.equal(data.guides.filter(g=>g.id===guide.id).length,1,'Stable article IDs must be unique')
  assert(data.getGuidesByDestination(guide.destinationId).some(g=>g.id===guide.id))
  assert(guide.sourceUrl.startsWith('https://thebrunchmanifesto.blog/'))
  const blocks=articleBlocks(guide.body)
  assert(blocks.some(b=>b.kind==='h2')&&blocks.some(b=>b.kind==='paragraph'))
  assert(blocks.map(b=>b.text).join(' ').split(/\s+/).length>200)
  assert(!/<(?:script|style|iframe|img)\b/i.test(guide.body),'Site embeds must not enter offline article content')
  for(const id of guide.placeIds){const place=data.getPlace(id);assert(place?.relatedGuideIds.includes(guide.id));assert(data.getDestinationById(guide.destinationId).placeIds.includes(id))}
  for(const id of guide.relatedGuideIds)assert(data.getGuide(id),`Missing related article ${id}`)
 }
 for(const id of ['wp-14174','wp-14176']){
  const guide=data.getGuide(id),text=articleBlocks(guide.body).map(b=>b.text).join('\n')
  assert(text.includes('https://booking.tpk.lv/RToNWjCl')&&text.includes('https://viator.tpk.lv/Pt3lq4fE'),'Preserve existing affiliate destinations')
  assert(text.includes('Affiliate links may earn us a commission'),'Preserve the disclosure')
  assert(text.includes('Breakfast option:')||text.includes('Start with:'),'Definition lists must render separated labels and values')
 }
 assert.deepEqual(data.getGuide('wp-14176').placeIds,['pl-ag-fernandos','pl-ag-condesa'])
 assert.equal(data.getGuide('wp-14174').placeIds.length,4)
 for(const id of data.getGuide('wp-14180').placeIds)assert(!/Tequila|agave/i.test(data.getPlacePhoto(data.getPlace(id)).caption),'City restaurant cards must not use out-of-town agave fields')
 let bytes=0,count=0
 for(const photo of photos.photos.filter(p=>!p.reused)){
  const buffer=readFileSync(photo.file),meta=await sharp(buffer).metadata()
  assert.equal(meta.format,'webp');assert(meta.width<=960&&meta.height<=760&&buffer.length<160000)
  assert(photo.author&&/^CC BY/.test(photo.license)&&photo.licenseUrl.startsWith('https://creativecommons.org/'))
  assert.equal(photo.bytes,buffer.length);bytes+=buffer.length;count++
 }
 assert.equal(bytes,photos.newImageBytes);assert.equal(count,photos.newImageCount)
 console.log(`Website refresh: ${websiteGuides.length} linked articles across ${new Set(websiteGuides.map(g=>g.destinationId)).size} cities; food places, rendered headings, affiliate links/disclosures and ${count} licensed optimized photos (${bytes} bytes) verified.`)
}finally{await server.close()}
