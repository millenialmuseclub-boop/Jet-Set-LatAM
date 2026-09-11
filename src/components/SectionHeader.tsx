import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SectionHeader({ title, to, sub }: { title: string; to?: string; sub?: string }) {
  const content = (
    <div className="flex items-baseline justify-between px-5">
      <div>
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        {sub && <p className="text-xs text-ink-soft/60">{sub}</p>}
      </div>
      {to && <ChevronRight size={18} className="text-terracotta shrink-0" />}
    </div>
  )
  return to ? <Link to={to}>{content}</Link> : content
}
