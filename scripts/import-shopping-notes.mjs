import fs from 'node:fs'
import path from 'node:path'
import { createServer } from 'vite'
import { compileShoppingNotes } from './lib/shopping-notes.mjs'

const directory='content/shopping-notes/masters'
const files=fs.readdirSync(directory).filter(f=>f.endsWith('.json')).sort()
const masters=files.map(file=>JSON.parse(fs.readFileSync(path.join(directory,file),'utf8')))
const server=await createServer({server:{middlewareMode:true},appType:'custom'})
try {
 const catalog=await server.ssrLoadModule('/src/data/index.ts')
 const target='src/data/shopping-notes.generated.json'
 const previous=JSON.parse(fs.readFileSync(target,'utf8').replace(/^\uFEFF/,''))
 const result=compileShoppingNotes(masters,catalog,previous)
 // An absent master must never silently remove a previously published guide/place.
 for(const old of previous.imports) if(!result.imports.some(r=>r.guideId===old.guideId))throw Error(`Missing previously imported master: ${old.guideId}`)
 result.places=[...previous.places.filter(p=>!result.places.some(n=>n.id===p.id)),...result.places]
 if(process.argv.includes('--write')) {
  fs.writeFileSync(`${target}.tmp`,JSON.stringify(result,null,2)+'\n');fs.renameSync(`${target}.tmp`,target)
  for(const [i,master]of masters.entries()){
   master.publication={...master.publication,appRevision:master.revision}
   fs.writeFileSync(path.join(directory,files[i]),JSON.stringify(master,null,2)+'\n')
  }
 }
 console.log(`${process.argv.includes('--write')?'Generated':'Validated (dry run)'}: ${result.guides.length} Shopping Notes, ${result.places.length} new canonical places.`)
} finally {await server.close()}
