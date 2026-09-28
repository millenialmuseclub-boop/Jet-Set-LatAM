import type { CompanionLink } from '@/lib/companionLinks'
import { appFamily } from '@/config/appFamily'
import { openExternal } from '@/lib/links'

export function CompanionReading({link}:{link?:CompanionLink}) {
  if(!link)return null
  return <aside className="my-4 rounded-2xl border border-ink/10 bg-cream p-5" aria-label={link.cta}>
    <p className="eyebrow text-terracotta">{appFamily[link.app].name}</p>
    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{link.detail}</p>
    <button className="mt-2 min-h-11 text-left text-sm text-terracotta" onClick={()=>openExternal(link.url)}>{link.cta} →</button>
    {link.url!==link.fallbackUrl&&<div><button className="min-h-11 text-xs text-ink-soft underline" onClick={()=>openExternal(link.fallbackUrl)}>Get the iPhone app</button></div>}
  </aside>
}
