import { PhotoPlaceholder } from './PhotoPlaceholder'

// Renders a real photo when one exists; falls back to the on-brand gradient
// placeholder when it doesn't. Keeps every card honest about what's real.
export function Photo({
  src, seed, label, className = '', rounded = 'rounded-2xl', alt = '', priority = false,
}: {
  src?: string
  seed: string
  label?: string
  className?: string
  rounded?: string
  alt?: string
  priority?: boolean
}) {
  if (!src) return <PhotoPlaceholder seed={seed} label={label} className={className} rounded={rounded} />
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={`object-cover ${rounded} ${className}`}
    />
  )
}
