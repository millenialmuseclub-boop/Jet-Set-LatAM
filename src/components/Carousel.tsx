import { useRef, type ReactNode } from 'react'

/** Native scrolling keeps touch, trackpad and keyboard navigation lightweight. */
export function Carousel({ label, children, className = '' }: {label: string; children: ReactNode; className?: string}) {
  const rail = useRef<HTMLDivElement>(null)
  function move(direction: number) {
    const element = rail.current
    if (element) element.scrollBy({left:direction * element.clientWidth * .85,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
  }
  return <div className={`editorial-carousel ${className}`}>
    <div className="carousel-controls"><span>Swipe to explore</span><div><button type="button" aria-label={`Previous ${label}`} onClick={()=>move(-1)}>←</button><button type="button" aria-label={`Next ${label}`} onClick={()=>move(1)}>→</button></div></div>
    <div ref={rail} role="region" aria-label={label} tabIndex={0} className="carousel-track">{children}</div>
  </div>
}
