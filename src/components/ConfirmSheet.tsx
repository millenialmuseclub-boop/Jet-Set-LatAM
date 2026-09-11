import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

// A native-feeling in-app confirmation for destructive actions (delete trip,
// remove a place from an itinerary). Capacitor WebViews render window.confirm()
// as a bare, unstyled browser dialog that reads as web-like and can behave
// inconsistently inside a native shell — this renders as an actual bottom
// sheet in the app's own design language instead, with a real backdrop tap
// and Cancel affordance rather than a raw confirm()/alert().
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
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/50"
            onClick={onCancel}
          />
          <motion.div
            key="sheet"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-sheet-title"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="pb-safe fixed inset-x-0 bottom-0 z-[61] rounded-t-3xl bg-cream px-5 pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.15)]"
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-ink/15" />
            <div className="flex items-start gap-3 pb-1">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                <AlertTriangle size={17} />
              </div>
              <div className="min-w-0">
                <p id="confirm-sheet-title" className="font-display text-xl leading-tight text-ink">{title}</p>
                {body && <p className="mt-1 text-sm leading-relaxed text-ink-soft/70">{body}</p>}
              </div>
            </div>
            <div className="flex gap-3 pb-4 pt-4">
              <button
                onClick={onCancel}
                className="flex-1 rounded-full bg-parchment py-3.5 text-sm font-medium text-ink-soft ring-1 ring-ink/10"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-full bg-red-500 py-3.5 text-sm font-medium text-cream"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
