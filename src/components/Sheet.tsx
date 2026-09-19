import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/** Native dialog supplies focus containment, Escape, inert background and focus restoration. */
export function Sheet({open, title, onClose, children}: {open:boolean; title:string; onClose:()=>void; children:ReactNode}) {
  const ref=useRef<HTMLDialogElement>(null)
  const id=useId()
  useEffect(()=>{
    const dialog=ref.current
    if(!open || !dialog) return
    const focused=document.activeElement as HTMLElement | null
    const previous=document.body.style.overflow
    const native=typeof dialog.showModal==='function'
    const root=document.getElementById('root')
    const previousHidden=root?.getAttribute('aria-hidden')
    const shade=document.createElement('div')
    const close=()=>dialog.querySelector<HTMLButtonElement>('[aria-label="Close drawer"]')?.click()
    if(native)dialog.showModal()
    else {
      shade.className='sheet-legacy-backdrop'
      shade.addEventListener('click',close)
      document.body.append(shade)
      root?.setAttribute('aria-hidden','true')
      dialog.setAttribute('open','')
      dialog.classList.add('sheet-fallback')
      dialog.querySelector<HTMLElement>('button')?.focus()
    }
    const keepFocus=(event:FocusEvent)=>{if(!native&&!dialog.contains(event.target as Node))dialog.querySelector<HTMLElement>('button')?.focus()}
    const keys=(event:KeyboardEvent)=>{
      if(native)return
      if(event.key==='Escape'){event.preventDefault();close()}
      if(event.key==='Tab'){
        const items=[...dialog.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input,textarea,select')]
        const first=items[0],last=items.at(-1)
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}
      }
    }
    document.addEventListener('keydown',keys)
    document.addEventListener('focusin',keepFocus)
    document.body.style.overflow='hidden'
    return ()=>{
      document.removeEventListener('keydown',keys);document.removeEventListener('focusin',keepFocus)
      if(native)dialog.close()
      else {dialog.removeAttribute('open');dialog.classList.remove('sheet-fallback');shade.remove();if(previousHidden===null)root?.removeAttribute('aria-hidden');else if(previousHidden)root?.setAttribute('aria-hidden',previousHidden)}
      document.body.style.overflow=previous;focused?.focus()
    }
  },[open])
  if(typeof document==='undefined')return null
  return createPortal(<dialog ref={ref} role="dialog" aria-modal="true" className="experience-sheet" aria-labelledby={id} onCancel={e=>{e.preventDefault();onClose()}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
    {open&&<div className="sheet-surface"><header className="sheet-heading"><h2 id={id}>{title}</h2><button autoFocus onClick={onClose} aria-label="Close drawer">✕</button></header><div className="sheet-content">{children}</div></div>}
  </dialog>,document.body)
}
