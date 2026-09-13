import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import * as c from 'cheerio';
import sharp from 'sharp';
import { createServer } from 'vite';
// Run npm run content:refresh. Public read-only input; generated app data and
// photographs stay local until a separately authorized release.
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const raw=path.join(root,'archive-source');
fs.mkdirSync(raw,{recursive:true});
if(!process.argv.includes('--cached')) {
 const first=await fetch('https://public-api.wordpress.com/rest/v1.1/sites/jetsetlatam.com/posts/?number=100&page=1');
 if(!first.ok)throw Error('WordPress '+first.status);
 const data=await first.json();
 fs.writeFileSync(path.join(raw,'wpcom.json'),JSON.stringify(data));
 for(let page=2;page<=Math.ceil(data.found/100);page++){
  const response=await fetch('https://public-api.wordpress.com/rest/v1.1/sites/jetsetlatam.com/posts/?number=100&page='+page);
  if(!response.ok)throw Error('WordPress '+response.status);
  fs.writeFileSync(path.join(raw,'wpcom-'+page+'.json'),JSON.stringify(await response.json()));
 }
}
const server=await createServer({root,server:{middlewareMode:true}});
try { const data=await server.ssrLoadModule('/src/data/index.ts');fs.writeFileSync(path.join(raw,'base.json'),JSON.stringify({places:data.places,guides:data.guides,destinations:data.destinations})); } finally { await server.close(); }
const all=[...new Map(fs.readdirSync(raw).filter(f=>/^wpcom/.test(f)).flatMap(f=>JSON.parse(fs.readFileSync(path.join(raw,f),'utf8').replace(/^\uFEFF/,'')).posts).map(p=>[p.ID,p])).values()];
const base=JSON.parse(fs.readFileSync(path.join(raw,'base.json')));
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const text=s=>c.load(s||'').text().replace(/\s+/g,' ').trim();
const rules=[['mexico-city',/mexico city|cdmx|teotihuacan/],['rio-de-janeiro',/rio de janeiro|\brio\b/],['cartagena',/cartagena/],['sao-paulo',/sao paulo/],['buenos-aires',/buenos aires/],['guadalajara',/guadalajara/],['tulum',/tulum/],['playa-del-carmen',/playa del carmen|xcaret/]];
function bodyOf(p){const $=c.load(p.content);$('script,style,nav,iframe,form,.sharedaddy,.jp-relatedposts,.wp-block-jetpack-related-posts,.wp-block-jetpack-subscriptions,.wp-block-latest-posts,.wp-block-kadence-posts,.wp-block-query').remove();return $;}
const selected=[];
for(const [id,re] of rules){const ps=all.filter(p=>re.test(norm(text(p.title)))&&!/shop the edit|sapphire in|rose in|emerald in|packing for|quick links|christmas in/i.test(text(p.title))).sort((a,b)=>b.date.localeCompare(a.date)).slice(0,10);for(const p of ps)if(!selected.some(x=>x.p.ID===p.ID))selected.push({p,dest:id});}
const sourcePhotos=[];
// This first-person photo essay explicitly says these are scenes captured on
// the creator's seven-day Cartagena trip. Exclude unrelated widget images.
const essay=all.find(p=>p.ID===10225);const $=bodyOf(essay);
$('img').each((_,el)=>{const src=$(el).attr('src')||'';if(!/\/2026\/02\/IMG202602/i.test(src))return;const u=new URL(src);u.search='';const original=u.href;const alt=$(el).attr('alt')||'Cartagena travel photograph';if(!sourcePhotos.some(x=>x.sourceUrl===original))sourcePhotos.push({sourceUrl:original,caption:alt,destinationId:'cartagena',sourcePostId:essay.ID,sourcePostUrl:essay.URL});});
const photoDir=path.join(root,'src/assets/archive');fs.mkdirSync(photoDir,{recursive:true});
(async()=>{
 const images=[];
 for(let i=0;i<sourcePhotos.length;i+=5){await Promise.all(sourcePhotos.slice(i,i+5).map(async(ph)=>{const file=crypto.createHash('sha256').update(ph.sourceUrl).digest('hex').slice(0,12)+'.webp';const dest=path.join(photoDir,file);if(!fs.existsSync(dest)){const res=await fetch(ph.sourceUrl+'?w=1400&ssl=1');if(!res.ok)throw Error('Photo '+res.status);const buffer=Buffer.from(await res.arrayBuffer());await sharp(buffer).rotate().resize({width:1200,height:1400,fit:'inside',withoutEnlargement:true}).webp({quality:80}).toFile(dest);}images.push({...ph,file});}));console.log('photos',Math.min(i+5,sourcePhotos.length),sourcePhotos.length);}
 images.sort((a,b)=>sourcePhotos.findIndex(x=>x.sourceUrl===a.sourceUrl)-sourcePhotos.findIndex(x=>x.sourceUrl===b.sourceUrl));
 const guides=selected.map(({p,dest})=>{const $=bodyOf(p);const paras=[];$('h2,h3,p,li').each((_,el)=>{if($(el).parents('li').length||$(el).closest('[class*=gallery],.kt-tabs-title-list').length)return;const t=$(el).text().replace(/\s+/g,' ').trim();if(t.length>35&&!/^(share this|like this|subscribe|related posts|related articles|discover more|read more|you may also|oplus_|It all began in Guadalajara|At Jet Set LATAM, our mission)/i.test(t)&&!paras.includes(t))paras.push(t);});const title=text(p.title);const b=paras.join('\n\n');const n=norm(b);const existing=base.guides.find(g=>g.sourceUrl.replace(/\/$/,'')===p.URL.replace(/\/$/,''));const relatedDests=rules.filter(([,r])=>r.test(norm(title))).map(([id])=>id);let section=/boutique|fashion|couture|diamond|knitwear/i.test(title)?'shop':/beach|island|coastal/i.test(title)?'beaches':/nightlife|tango|evening|night of|rooftop/i.test(title)?'nightlife':/cafe|café|mercado|food|dining/i.test(title)?'eat':/hotel|stay|honeymoon/i.test(title)?'stay':/art|culture|museum|boulevard/i.test(title)?'see':'experiences';
  const matched=base.places.filter(pl=>pl.city===base.destinations.find(d=>d.id===dest)?.city&&[pl.name,pl.name.split(' (')[0]].some(name=>norm(name).length>4&&n.includes(norm(name))));
  const photoRefs=images.filter(ph=>p.content.includes(path.basename(new URL(ph.sourceUrl).pathname).replace(/\.[^.]+$/,'')));
  const intro=paras.find(t=>t.length>40&&t!==title)||text(p.excerpt)||title;
  return {id:existing?.id||'wp-'+p.ID,postId:p.ID,title,destinationId:dest,relatedDestinationIds:relatedDests,section,dek:intro.length>230?intro.slice(0,227).replace(/\s+\S*$/,'')+'…':intro,body:b||text(p.excerpt),placeIds:[...new Set([...(existing?.placeIds||[]),...matched.map(pl=>pl.id)])],sourceUrl:p.URL,publishedAt:p.date,photoFiles:photoRefs.map(ph=>ph.file),categories:Object.keys(p.categories||{}),namedPlaces:matched.map(pl=>({id:pl.id,name:pl.name,evidence:paras.find(t=>norm(t).includes(norm(pl.name.split(' (')[0])))||'',isJetSetPick:pl.isJetSetPick})),itineraryRelevance:section==='eat'?['food']:section==='shop'?['shopping']:section==='beaches'?['beach']:section==='nightlife'?['nightlife']:['culture'],relatedGuideIds:[]};
 });
 for(const g of guides)g.relatedGuideIds=guides.filter(x=>x.id!==g.id&&x.destinationId===g.destinationId).sort((a,b)=>Number(b.section===g.section)-Number(a.section===g.section)).slice(0,4).map(x=>x.id);
 const catalog=all.map(p=>{
  const $=bodyOf(p), title=text(p.title), content=$.text(), n=norm(content);
  const destinationIds=rules.filter(([,r])=>r.test(norm(title))).map(([id])=>id);
  const matched=base.places.filter(pl => {
    const name = norm(pl.name.split(' (')[0]);
    return destinationIds.some(id=>base.destinations.find(d=>d.id===id)?.city===pl.city) && name.length>4 && n.includes(name);
  });
  const guide=guides.find(g=>g.postId===p.ID);
  return {postId:p.ID,title,url:p.URL,date:p.date,categories:Object.keys(p.categories||{}),destinationIds,countries:[...new Set(destinationIds.map(id=>base.destinations.find(d=>d.id===id)?.country).filter(Boolean))],namedPlaces:matched.map(pl=>({id:pl.id,name:pl.name,existingJetSetPick:pl.isJetSetPick,evidence:content.split(/\n+/).find(t=>norm(t).includes(norm(pl.name.split(' (')[0])))?.trim().slice(0,600)})),photography:$('img').toArray().map(el=>({url:$(el).attr('src'),caption:$(el).attr('alt')||'',authenticity:images.some(ph=>($(el).attr('src')||'').includes(path.basename(new URL(ph.sourceUrl).pathname).replace(/\.[^.]+$/,'')))?'creator-photo-essay':'unreviewed'})),guideId:guide?.id,relatedGuideIds:guide?.relatedGuideIds||[],itineraryRelevance:guide?.itineraryRelevance||[],imported:!!guide};
 });
 fs.writeFileSync(path.join(root,'src/data/archive.json'),JSON.stringify({scanned:all.length,importedAt:'2026-09-13',guides,photos:images},null,2));
 fs.mkdirSync(path.join(root,'content'),{recursive:true});fs.writeFileSync(path.join(root,'content/archive-catalog.json'),JSON.stringify(catalog,null,2));
 console.log(JSON.stringify({scanned:all.length,guides:guides.length,photos:images.length,byDestination:Object.fromEntries(rules.map(([id])=>[id,guides.filter(g=>g.destinationId===id).length]))},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
