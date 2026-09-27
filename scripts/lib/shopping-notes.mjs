import { createHash } from 'node:crypto'

const fail = message => { throw new Error(message) }
const requireValue = (value, message) => { if (!value) fail(message) }
const text = value => typeof value === 'string' && value.trim().length > 0
const identity = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '')
const url = value => {
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password } catch { return false }
}
const date = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().startsWith(value) && value <= new Date().toISOString().slice(0,10)
const stringList = value => Array.isArray(value) && value.every(text)
const safeId = value => /^[a-z0-9][a-z0-9-]+$/.test(value || '')
const businessKey = p => [p.country, p.city, p.name].map(identity).join(':')

/** Pure compiler. Drafts fail closed; the CLI writes only after every record passes. */
export function compileShoppingNotes(masters, catalog, previous = { imports: [] }) {
  const output = { schemaVersion: 1, guides: [], places: [], imports: [] }
  const seenGuides = new Set(), newPlaces = new Map(), businessIds = new Map()
  for (const p of catalog.places) businessIds.set(businessKey(p), p.id)
  for (const master of masters) {
    const label = master.guideId || 'Unnamed master'
    const check = (value, message) => requireValue(value, `${label}: ${message}`)
    check(master.schemaVersion === 1 && master.recordType === 'editorial-master' && master.status === 'approved', 'only approved editorial-master records can be imported')
    check(safeId(master.guideId) && !seenGuides.has(master.guideId), 'guide ID is invalid or duplicated')
    seenGuides.add(master.guideId)
    check(Number.isInteger(master.revision) && master.revision > 0, 'revision must be a positive integer')
    const destination = catalog.destinations.find(d => d.id === master.destinationId)
    check(destination && destination.city === master.city && destination.country === master.country, 'destination/city/country mismatch')
    check(url(master.canonicalUrl), 'canonicalUrl must be HTTPS')
    const sameArticle = catalog.guides.find(g => g.sourceUrl === master.canonicalUrl)
    check(!sameArticle || sameArticle.id === master.guideId, 'reuse the stable guide ID for an existing article')
    check(master.editorial?.basis === 'researched' || master.editorial?.basis === 'firsthand', 'editorial basis is required')
    check(Array.isArray(master.editorial.firsthandNotes), 'firsthandNotes must be retained, including an empty array')
    const firsthandIds = new Set()
    for (const note of master.editorial.firsthandNotes) {
      check(text(note.id) && text(note.note) && date(note.visitedAt) && text(note.author), 'firsthand notes require author, visit date and text')
      check(!firsthandIds.has(note.id), 'duplicate firsthand note ID'); firsthandIds.add(note.id)
    }
    if (master.editorial.basis === 'firsthand') check(firsthandIds.size, 'firsthand basis requires documented visit notes')
    check(date(master.maintenance?.lastReviewedAt) && Array.isArray(master.maintenance.changeLog), 'review date and change log are required')
    const a = master.appAdaptation
    check(a?.exportStatus === 'approved' && a.section === 'shop', 'app adaptation must be approved for shop')
    check(text(a.title) && text(a.dek) && text(a.body), 'app title, dek and body are required')
    check(url(a.sourceUrl) && a.sourceUrl === master.canonicalUrl, 'app source must match the canonical article')
    check(stringList(a.placeIds) && a.placeIds.length > 0 && new Set(a.placeIds).size === a.placeIds.length, 'unique placeIds are required')
    check(stringList(a.relatedGuideIds), 'relatedGuideIds must be an array')
    check(Array.isArray(master.places) && master.places.length === a.placeIds.length, 'places must match app placeIds')
    const localPlaces = new Map()
    for (const p of master.places) {
      check(safeId(p.id) && !localPlaces.has(p.id) && a.placeIds.includes(p.id), 'invalid, duplicate or unreferenced place ID')
      check(text(p.name) && text(p.description) && ['shop', 'cafe'].includes(p.category), 'places need a name, description and shop/cafe category')
      check(p.city === destination.city && p.country === destination.country, 'place city/country mismatch')
      check(p.status === 'verified' && date(p.verification?.checkedAt), `${p.id} is not verified`)
      check(Array.isArray(p.verification.evidence) && p.verification.evidence.length > 0 && stringList(p.verification.needsConfirmation), 'verification evidence and unresolved questions are required')
      for (const e of p.verification.evidence) check(text(e.field) && url(e.sourceUrl) && date(e.checkedAt), 'evidence needs a field, HTTPS source and date')
      const hasEvidence = field => p.verification.evidence.some(e => e.field === field)
      check(hasEvidence('businessStatus') && hasEvidence('productCategories'), 'current business status and product categories need evidence')
      check(!p.verification.needsConfirmation.some(q => /business status|product categories/i.test(q)), 'essential business facts remain unresolved')
      for (const field of ['website', 'mapUrl']) if (p[field]) check(url(p[field]) && hasEvidence(field), `${field} needs a valid URL and evidence`)
      if (p.address) check(text(p.address) && hasEvidence('address'), 'address needs evidence')
      if (p.coordinates) check(Number.isFinite(p.coordinates.lat) && Math.abs(p.coordinates.lat) <= 90 && Number.isFinite(p.coordinates.lng) && Math.abs(p.coordinates.lng) <= 180 && hasEvidence('coordinates'), 'coordinates need bounded numbers and evidence')
      if (p.mapUrl || p.coordinates) check(p.address && hasEvidence('mapPin') && !p.verification.needsConfirmation.some(q => /address|pin|location|coordinates/i.test(q)), 'map-ready places need verified addresses and pins')
      check(stringList(p.whatToBuy) && stringList(p.tags) && stringList(p.firsthandNoteIds), 'shopping/tag/firsthand lists are required')
      check(p.firsthandNoteIds.every(id => firsthandIds.has(id)), 'unknown firsthand note reference')
      check(p.isJetSetPick === false, 'imports cannot confer Jet Set Pick status')
      for (const field of ['hoursNote', 'appointmentNote', 'accessibilityNote', 'priceLevel']) if (p[field]) check(text(p[field]) && hasEvidence(field), `${field} needs text and evidence`)
      if (p.priceLevel) check(['$','$$','$$$','$$$$'].includes(p.priceLevel), 'priceLevel must use the app scale')
      check(Array.isArray(p.priceSnapshots), 'price evidence must be retained, including an empty array')
      for (const price of p.priceSnapshots) check(text(price.item) && Number.isFinite(price.amount) && price.amount >= 0 && /^[A-Z]{3}$/.test(price.currency || '') && date(price.checkedAt) && url(price.sourceUrl), 'price snapshots require an item, amount, currency, date and source')
      if (p.offer) {
        check(p.offer.affiliateUrl || p.offer.bookingUrl, 'offer needs a link')
        for (const field of ['affiliateUrl', 'bookingUrl']) if (p.offer[field]) check(url(p.offer[field]), 'offer URLs must be HTTPS')
        if (p.offer.affiliateUrl) check(text(p.offer.disclosure), 'affiliate disclosure is required')
      }
      // Photos are resolved from an existing bundled guide, never arbitrary network images.
      check(!p.photos?.length && !master.media?.length, 'use coverGuideId to reuse bundled media; new media needs a reviewed asset import')
      const canonical = catalog.places.find(x => x.id === p.id) || newPlaces.get(p.id)
      if (canonical) check(businessKey(canonical) === businessKey(p), 'a stable place ID cannot change business identity')
      const duplicate = businessIds.get(businessKey(p))
      check(!duplicate || duplicate === p.id, `duplicate business: reuse ${duplicate}`)
      const sameBranch = [...catalog.places,...newPlaces.values()].find(x => x.id !== p.id && identity(x.city) === identity(p.city) && identity(x.country) === identity(p.country) && p.address && p.website && identity(x.address) === identity(p.address) && x.website === p.website)
      check(!sameBranch, `duplicate branch: reuse ${sameBranch?.id}`)
      businessIds.set(businessKey(p), p.id)
      if (!canonical) {
        const place = { id:p.id, name:p.name, city:p.city, country:p.country, category:p.category, neighborhood:p.neighborhood || undefined, description:p.description, photos:[], isJetSetPick:false, tags:p.tags, sourceUrl:master.canonicalUrl }
        for (const field of ['website','address','coordinates','mapUrl','priceLevel','pairWithPlaceId','offer']) if (p[field]) place[field] = p[field]
        place.practicalNotes = [p.hoursNote, p.appointmentNote, p.accessibilityNote].filter(Boolean).join(' · ') || undefined
        newPlaces.set(p.id, place)
      }
      localPlaces.set(p.id, p)
    }
    check(Array.isArray(master.stops) && master.stops.length === a.placeIds.length, 'numbered stops must cover every place')
    const stopIds = master.stops.map(s => s.placeId)
    check(new Set(stopIds).size === stopIds.length && stopIds.every(id => localPlaces.has(id)), 'stops must reference unique master places')
    for (const [i, s] of master.stops.entries()) {
      check(s.number === i + 1 && text(s.reasonToVisit), 'stops must be numbered consecutively with a reason to visit')
      if (s.suggestedBrowseMinutes != null) check(Number.isFinite(s.suggestedBrowseMinutes) && s.suggestedBrowseMinutes > 0, 'browse minutes must be positive editorial suggestions')
    }
    for (const p of master.places) if (p.pairWithPlaceId) check(localPlaces.has(p.pairWithPlaceId), 'café pairing must reference this guide')
    const legs = [], route = master.route
    check(route && ['verified', 'not-verified'].includes(route.status), 'route status must be explicit')
    if (route.status === 'verified') {
      check(date(route.checkedAt) && date(route.mobileTestedAt) && route.basis === 'pedestrian-directions', 'routes need sourced pedestrian directions and a mobile check')
      check(JSON.stringify(route.stopIds) === JSON.stringify(stopIds) && route.legs?.length === stopIds.length - 1, 'route must follow the verified stop order')
      for (const [i,l] of route.legs.entries()) {
        check(l.fromPlaceId === stopIds[i] && l.toPlaceId === stopIds[i+1], 'route leg order mismatch')
        const from=localPlaces.get(l.fromPlaceId), to=localPlaces.get(l.toPlaceId)
        for (const p of [from,to]) check(p.address && p.mapUrl && p.verification.evidence.some(e=>e.field==='mapPin') && !p.verification.needsConfirmation.some(q=>/address|pin|location/i.test(q)), 'walking routes require verified map-ready stops')
        check(Number.isFinite(l.walkingMinutes) && l.walkingMinutes > 0 && Number.isFinite(l.distanceMeters) && l.distanceMeters > 0 && url(l.sourceUrl) && date(l.checkedAt), 'walking estimates need positive values and dated pedestrian evidence')
        const directions = new URL('https://www.google.com/maps/dir/')
        directions.search = new URLSearchParams({api:'1',origin:`${from.name}, ${from.address}, ${from.city}, ${from.country}`,destination:`${to.name}, ${to.address}, ${to.city}, ${to.country}`,travelmode:'walking'})
        legs.push({...l,url:directions.toString()})
      }
    } else check(!route.legs?.length && !route.estimatedWalkingMinutes && !route.distanceMeters && !route.shareUrls?.length, 'unverified routes cannot export directions or estimates')
    const cover = catalog.guides.find(g => g.id === a.coverGuideId)
    check(cover?.destinationId === destination.id && cover.heroPhoto, 'coverGuideId must reuse a bundled photo from this destination')
    const existing = catalog.guides.find(g => g.id === master.guideId)
    if (existing) check(existing.destinationId === master.destinationId, 'existing guide cannot move destinations')
    const hashMaster = structuredClone(master)
    if (hashMaster.publication) delete hashMaster.publication.appRevision
    const hash = createHash('sha256').update(JSON.stringify(hashMaster)).digest('hex')
    const old = previous.imports.find(x => x.guideId === master.guideId)
    if (old) check(master.revision >= old.revision && (master.revision !== old.revision || hash === old.hash), 'revision cannot go backwards or change without incrementing')
    output.guides.push({ id:master.guideId,title:a.title,destinationId:master.destinationId,section:'shop',dek:a.dek,body:a.body,placeIds:a.placeIds,sourceUrl:a.sourceUrl,editorialSource:master.editorial.basis === 'researched' ? 'researched' : undefined,relatedGuideIds:a.relatedGuideIds,categories:['Shopping Notes','Style'],coverGuideId:a.coverGuideId,shoppingNotes:{revision:master.revision,checkedAt:master.maintenance.lastReviewedAt,stops:master.stops.map(s=>({number:s.number,placeId:s.placeId,reasonToVisit:s.reasonToVisit,whatToBuy:localPlaces.get(s.placeId).whatToBuy,browseMinutes:s.suggestedBrowseMinutes||undefined})),legs}})
    output.imports.push({guideId:master.guideId,revision:master.revision,hash})
  }
  for (const g of output.guides) requireValue(g.relatedGuideIds.every(id => id !== g.id && (catalog.guides.some(x=>x.id===id)||seenGuides.has(id))), `${g.id}: unknown related guide`)
  output.places = [...newPlaces.values()]
  return output
}
