import assert from 'node:assert/strict'
import { createServer } from 'vite'
const server = await createServer({server:{middlewareMode:true}})
try {
 const {articleBlocks,safeArticleUrl,decodeArticleText} = await server.ssrLoadModule('/src/lib/article.ts')
 const {guides} = await server.ssrLoadModule('/src/data/index.ts')
 const {shoppingEdits,shopmyEdits} = await server.ssrLoadModule('/src/data/shopmy.ts')
 const html='<h2>Things to bring</h2><p>A <strong>small bag</strong> &amp; water.</p><ul><li>Hat</li><li>Sun cream</li></ul><script>alert(1)</script><p><a href="javascript:alert(1)">Unsafe</a> <a href="https://shopmy.us/shop/collections/2819889?ref=abc&amp;track=1">The edit</a></p>'
 const blocks=articleBlocks(html)
 assert.equal(blocks[0].kind,'h2');assert.equal(blocks[1].text,'A **small bag** & water.')
 assert.deepEqual(blocks.find(b=>b.kind==='list').items,['Hat','Sun cream'])
 assert(!JSON.stringify(blocks).includes('alert(1)'))
 assert(JSON.stringify(blocks).includes('ref=abc&track=1'),'Tracking preserved')
 assert.equal(safeArticleUrl('javascript:alert(1)'),undefined)
 assert.equal(safeArticleUrl('data:text/html,test'),undefined)
 assert.equal(decodeArticleText('Caf&#233; &amp; design'),'Café & design')
 assert.equal(articleBlocks('1. First stop\n2. Second stop')[0].ordered,true)
 assert.equal(articleBlocks('Best for: Long weekends')[0].kind,'tip')
 for(const guide of guides){const before=guide.body;const result=articleBlocks(before);assert(result.length,guide.id);assert(result.every(b=>b.text&&b.id));assert.equal(guide.body,before)}
 const legacy=guides.find(g=>g.id==='gd-designer-boutiques-cdmx')
 assert(articleBlocks(legacy.body).filter(b=>b.kind==='h2').length>=3,'Legacy hierarchy restored')
 for(const destination of ['cartagena','bogota','rio-de-janeiro',undefined])for(const packing of [false,true])for(const edit of shoppingEdits(destination,packing))assert(Object.values(shopmyEdits).some(e=>e.url===edit.url),'Only existing collection URLs')
 console.log(`Articles: ${guides.length} preserved bodies, headings/lists/emphasis/entities, safe links and existing commerce URLs passed.`)
} finally {await server.close()}
