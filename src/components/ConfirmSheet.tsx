import { Sheet } from './Sheet'

// Reuse the same focus containment, Escape, scroll lock and reduced-motion
// behavior as the other drawers. Opening focuses Close, never Delete.
export function ConfirmSheet({
  open, title, body, confirmLabel = 'Delete', onConfirm, onCancel,
}: {
  open: boolean
  title: string
  body?: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <Sheet open={open} title={title} onClose={onCancel}>
      {body && <p className="text-sm leading-relaxed text-ink-soft">{body}</p>}
      <div className="flex gap-3 pt-4">
        <button onClick={onCancel} className="min-h-11 flex-1 bg-parchment px-4 py-3.5 text-sm font-medium text-ink ring-1 ring-ink/10">Cancel</button>
        <button onClick={onConfirm} className="min-h-11 flex-1 bg-red-700 px-4 py-3.5 text-sm font-medium text-white">{confirmLabel}</button>
      </div>
    </Sheet>
  )
}
