import { Link } from 'react-router-dom'
export function TrenMayaStories({destinationId}:{destinationId:string}) {
 if(!['tulum','playa-del-carmen'].includes(destinationId))return null
 return <section className="my-6 rounded-2xl border border-ink/15 bg-cream p-5"><p className="eyebrow text-terracotta">The rail journal</p><h2 className="my-3 font-display text-3xl italic">Yucatán by rail</h2><p className="text-sm leading-relaxed text-ink-soft">Make Tren Maya part of a wider Riviera Maya journey. Read the Jet Set archive, then check current services and station transfers with the operator.</p><div className="mt-3 flex flex-wrap gap-3"><Link className="min-h-11 py-3 text-sm text-terracotta" to={"/explore?category=Outdoors+%2B+Journeys&destination="+destinationId}>Read the rail stories →</Link><a href="https://www.trenmaya.gob.mx/" target="_blank" rel="noopener noreferrer" className="min-h-11 py-3 text-xs text-ink-soft underline">Tren Maya · official information ↗</a></div></section>
}
