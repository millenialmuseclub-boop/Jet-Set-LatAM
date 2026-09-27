import assert from 'node:assert/strict'
import fs from 'node:fs'
import { compileShoppingNotes } from './lib/shopping-notes.mjs'

// Entirely synthetic fixtures; never imported by the application or stored in masters/.
const catalog={destinations:[{id:'test-city',city:'Test City',country:'Test Country'}],places:[],guides:[{id:'test-article',destinationId:'test-city',sourceUrl:'https://example.com/article',heroPhoto:'bundled.webp'}]}
const evidence=field=>({field,sourceUrl:'https://example.com/verified',checkedAt:'2026-09-26'})
const place=id=>({id,name:id,city:'Test City',country:'Test Country',category:'shop',description:'Synthetic test record',status:'verified',website:'https://example.com/'+id,address:'Test address '+id,mapUrl:'https://maps.google.com/?q='+id,coordinates:{lat:1,lng:2},whatToBuy:['Test object'],tags:[],firsthandNoteIds:[],isJetSetPick:false,priceSnapshots:[],photos:[],verification:{checkedAt:'2026-09-26',needsConfirmation:[],evidence:['businessStatus','productCategories','website','address','mapUrl','mapPin','coordinates'].map(evidence)}})
const master={schemaVersion:1,recordType:'editorial-master',status:'approved',guideId:'test-article',revision:1,destinationId:'test-city',city:'Test City',country:'Test Country',canonicalUrl:'https://example.com/article',editorial:{basis:'researched',firsthandNotes:[]},media:[],places:[place('test-shop'),place('test-cafe')],stops:[{number:1,placeId:'test-shop',reasonToVisit:'Synthetic shopping stop',suggestedBrowseMinutes:15},{number:2,placeId:'test-cafe',reasonToVisit:'Synthetic cafe stop'}],route:{status:'verified',basis:'pedestrian-directions',checkedAt:'2026-09-26',mobileTestedAt:'2026-09-26',stopIds:['test-shop','test-cafe'],legs:[{fromPlaceId:'test-shop',toPlaceId:'test-cafe',walkingMinutes:6,distanceMeters:400,sourceUrl:'https://example.com/pedestrian-evidence',checkedAt:'2026-09-26'}]},appAdaptation:{section:'shop',title:'Test title',dek:'Test dek',body:'Synthetic fixture only',placeIds:['test-shop','test-cafe'],sourceUrl:'https://example.com/article',relatedGuideIds:[],coverGuideId:'test-article',exportStatus:'approved'},maintenance:{lastReviewedAt:'2026-09-26',changeLog:[]},publication:{appRevision:null}}
master.places[1].category='cafe'
master.places[0].pairWithPlaceId='test-cafe'
master.places[0].offer={affiliateUrl:'https://example.com/offer?utm_source=Jet%20Set&code=A%2BB&ref=123',disclosure:'We may earn a commission.'}
const before=JSON.stringify(master),result=compileShoppingNotes([master],catalog)
assert.equal(JSON.stringify(master),before,'compiler mutated master evidence')
assert.equal(result.guides[0].shoppingNotes.legs[0].walkingMinutes,6)
assert.equal(new URL(result.guides[0].shoppingNotes.legs[0].url).searchParams.get('travelmode'),'walking')
assert.equal(result.places[0].offer.affiliateUrl,master.places[0].offer.affiliateUrl)
assert(result.places.every(p=>!p.isJetSetPick))
assert.deepEqual(compileShoppingNotes([master],catalog,result),result,'repeat import is not deterministic')
const reject=(change,pattern)=>{const m=structuredClone(master);change(m);assert.throws(()=>compileShoppingNotes([m],catalog),pattern)}
reject(m=>m.status='draft',/approved/)
reject(m=>m.appAdaptation.exportStatus='blocked-until-verified',/approved/)
reject(m=>m.destinationId='missing',/mismatch/)
reject(m=>m.city='Wrong city',/mismatch/)
reject(m=>m.guideId='new-id',/stable guide ID/)
reject(m=>m.places[0].coordinates.lat=91,/coordinates/)
reject(m=>m.places[0].coordinates.lng=NaN,/coordinates/)
reject(m=>m.places[0].website='javascript:alert(1)',/website/)
reject(m=>m.places[0].isJetSetPick=true,/Pick/)
reject(m=>m.places[0].verification.checkedAt='2099-01-01',/verified/)
reject(m=>m.places[0].verification.evidence=[],/evidence/)
reject(m=>m.places[0].verification.needsConfirmation=['Exact branch address'],/map-ready/)
reject(m=>m.places[1].name=m.places[0].name,/duplicate business/)
reject(m=>{m.places[1].website=m.places[0].website;m.places[1].address=m.places[0].address},/duplicate branch/)
reject(m=>m.stops[1].number=3,/numbered/)
reject(m=>m.stops[1].placeId='missing',/stops/)
reject(m=>m.route.status='not-verified',/unverified/)
reject(m=>m.route.legs[0].sourceUrl=null,/pedestrian evidence/)
reject(m=>m.route.legs[0].walkingMinutes=0,/pedestrian evidence/)
reject(m=>m.route.stopIds.reverse(),/stop order/)
reject(m=>m.places[0].priceSnapshots=[{amount:20}],/price snapshots/)
reject(m=>m.places[0].hoursNote='Open all day',/hoursNote/)
reject(m=>m.places[0].firsthandNoteIds=['unrecorded'],/firsthand/)
reject(m=>m.places[0].offer.disclosure='',/disclosure/)
reject(m=>m.appAdaptation.relatedGuideIds=['missing'],/related guide/)
reject(m=>m.appAdaptation.coverGuideId='missing',/coverGuideId/)
assert.throws(()=>compileShoppingNotes([master,master],catalog),/duplicated/)
const edited=structuredClone(master);edited.appAdaptation.title='Changed'
assert.throws(()=>compileShoppingNotes([edited],catalog,result),/revision/)
edited.revision=2;assert.equal(compileShoppingNotes([edited],catalog,result).imports[0].revision,2)
const canonical={...catalog,places:result.places.map(p=>({...p,isJetSetPick:true}))}
assert.equal(compileShoppingNotes([master],canonical,result).places.length,0,'canonical businesses duplicated or overwritten')
const noMap=structuredClone(master)
noMap.route={status:'not-verified',legs:[],stopIds:[]}
for(const p of noMap.places){delete p.mapUrl;delete p.coordinates;delete p.address;p.verification.needsConfirmation=['Address and map pin']}
const unlocated=compileShoppingNotes([noMap],catalog)
assert(unlocated.places.every(p=>!p.mapUrl&&!p.coordinates&&!p.address))
assert.equal(unlocated.guides[0].shoppingNotes.legs.length,0)
const template=JSON.parse(fs.readFileSync('content/shopping-notes/master.template.json','utf8').replace(/^\uFEFF/,''))
assert.throws(()=>compileShoppingNotes([template],catalog),/approved/)
console.log('Shopping Notes: approved export, stable IDs, 29 rejection cases, exact affiliate URLs, evidence retention, safe unlocated stops, verified walking links and revision/idempotence checks passed. No fixtures are bundled.')
