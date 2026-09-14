import { Plane, BedDouble, House, ArrowUpRight } from 'lucide-react';
import { openExternal } from '@/lib/links';
import { AffiliateDisclosure } from './AffiliateDisclosure';
const website='https://thebrunchmanifesto.blog/plan-your-trip/';
const tools=[
 {label:'Flights',description:'Find your way there.',icon:Plane,url:website+'#flight-search'},
 {label:'Hotels',description:'Stay somewhere beautiful.',icon:BedDouble,url:website+'#hotel-search'},
 {label:'Villas',description:'A little space of your own.',icon:House,url:'https://vrbo.tpk.lv/8h4b3cce'},
];
export function WebsitePlanning(){return <details className="website-planning mb-7 rounded-2xl border border-terracotta/20 bg-cream p-5"><summary className="cursor-pointer"><span className="eyebrow text-terracotta">From the Jet Set website</span><span className="mt-2 block font-display text-3xl italic">Flights, hotels &amp; villas.</span><span className="mt-2 block text-xs text-ink-soft">Open the booking collection</span></summary><div className="mt-5 border-t border-ink/10"><p className="my-4 text-sm leading-relaxed text-ink-soft">Build your itinerary here, then explore the website’s travel partners for your flights and stays.</p>{tools.map(({label,description,icon:Icon,url})=><button key={label} onClick={()=>openExternal(url)} className="flex min-h-20 w-full items-center gap-4 border-b border-ink/10 py-4 text-left"><Icon size={22} strokeWidth={1.4} className="text-terracotta"/><span className="flex-1"><span className="block font-display text-2xl">{label}</span><span className="block text-xs text-ink-soft">{description}</span></span><ArrowUpRight size={16}/></button>)}<p className="my-4 text-xs text-ink-soft">Flights and hotels open our website’s live tools. Villas opens our VRBO partner link.</p><AffiliateDisclosure/><button onClick={()=>openExternal(website)} className="mt-4 min-h-11 text-sm text-terracotta">Open the full Plan Your Trip page ↗</button></div></details>}
