export function EmptyState({
  title,
  body,
  action,
}: {
  title: string
  body?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/15 bg-cream/60 px-6 py-10 text-center">
      <p className="font-display text-xl text-ink-soft">{title}</p>
      {body && <p className="max-w-xs text-sm text-ink-soft/70">{body}</p>}
      {action}
    </div>
  )
}
