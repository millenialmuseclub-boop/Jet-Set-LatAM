import { useState } from 'react'
import { Sheet } from './Sheet'
import type { ReactNode } from 'react'
import { Photo } from './Photo'

export interface PostcardImage {
  src: string
  alt: string
  seed: string
  caption?: string
}

// A magazine-style photo essay — deliberately NOT a uniform masonry grid.
// Cycles through four beat types so a long real photo set reads like a
// spread, not a gallery: one large landscape, two portraits side by side, an
// optional caption/detail block, then a full-width image, repeat. Only used
// where a destination has enough real, verified photography to earn it (see
// docs/CONTENT_INVENTORY.md for photo counts per destination).
function PostcardSpread({ images, title }: { images: PostcardImage[]; title?: string }) {
  if (images.length === 0) return null

  const beats: ReactNode[] = []
  let i = 0
  let beatIndex = 0
  while (i < images.length) {
    const pattern = beatIndex % 4
    if (pattern === 0) {
      // Large landscape
      const img = images[i++]
      beats.push(
        <div key={`b${beatIndex}`} className="relative overflow-hidden rounded-2xl">
          <Photo src={img.src} seed={img.seed} alt={img.alt} className="h-72 w-full md:h-[26rem]" rounded="rounded-2xl" />
          {img.caption && (
            <p className="absolute bottom-3 left-3 right-3 text-xs text-cream/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">{img.caption}</p>
          )}
        </div>
      )
    } else if (pattern === 1 && images[i]) {
      // Two portraits side by side
      const a = images[i++]
      const b = images[i]
      beats.push(
        <div key={`b${beatIndex}`} className="grid grid-cols-2 gap-3">
          <Photo src={a.src} seed={a.seed} alt={a.alt} className="h-64 w-full md:h-96" rounded="rounded-2xl" />
          {b ? (
            <Photo src={b.src} seed={b.seed} alt={b.alt} className="h-64 w-full md:h-96" rounded="rounded-2xl" />
          ) : (
            <div />
          )}
        </div>
      )
      if (b) i++
    } else if (pattern === 2) {
      // Caption / detail block — text breathing room, no image
      const img = images[i - 1]
      if (img?.caption) {
        beats.push(
          <div key={`b${beatIndex}`} className="mx-auto max-w-md text-center">
            <p className="font-display text-xl italic leading-snug text-ink-soft/80">{img.caption}</p>
          </div>
        )
      }
    } else if (images[i]) {
      // Full-width image
      const img = images[i++]
      beats.push(
        <Photo key={`b${beatIndex}`} src={img.src} seed={img.seed} alt={img.alt} className="h-80 w-full md:h-[30rem]" rounded="rounded-2xl" />
      )
    }
    beatIndex++
    if (beatIndex > images.length * 2) break // safety valve, never loops forever
  }

  return (
    <section className="space-y-5">
      {title && <p className="font-display text-2xl text-ink md:text-3xl">{title}</p>}
      <div className="space-y-5">{beats}</div>
    </section>
  )
}

export function PostcardGallery({images,title}:{images:PostcardImage[];title?:string}) {
 const [open,setOpen]=useState(false)
 if(!images.length)return null
 return <section><button className="photo-drawer-cover" aria-haspopup="dialog" onClick={()=>setOpen(true)}><Photo src={images[0].src} seed={images[0].seed} alt={images[0].alt} className="h-64 w-full md:h-80" rounded="rounded-none"/><span><strong>{title||'Through our lens'}</strong><small>Open {images.length} photos ＋</small></span></button><Sheet open={open} title={title||'Through our lens'} onClose={()=>setOpen(false)}><PostcardSpread images={images}/></Sheet></section>
}
