import {readFileSync,writeFileSync} from 'node:fs'

const files=['src/config/appFamily.ts','src/data/shopmy.ts','src/data/style.ts','src/components/WebsitePlanning.tsx','src/components/StyleBridge.tsx']
const entries=new Map()
for(const file of files){const text=readFileSync(file,'utf8');for(const m of text.matchAll(/https:\/\/[^\s'"`<>]+/g)){const url=m[0].replace(/[),.;]+$/,'');if(!entries.has(url))entries.set(url,[]);entries.get(url).push(file)}}
const relevant=[...entries].filter(([_url,files])=>files.some(f=>/appFamily|shopmy|style\.ts|WebsitePlanning|StyleBridge/.test(f)))
const results=[]
for(let i=0;i<relevant.length;i+=5)results.push(...await Promise.all(relevant.slice(i,i+5).map(async([url,files])=>{try{const res=await fetch(url,{signal:AbortSignal.timeout(20000)});const text=await res.text();return {url,status:res.status,finalUrl:res.url,title:text.match(/<title[^>]*>([^<]*)/i)?.[1],files}}catch(e){return {url,error:e.message,files}}})))
writeFileSync('content/release-link-audit.json',JSON.stringify(results,null,2))
console.log(JSON.stringify(results.map(({files:_files,...r})=>r),null,2))
