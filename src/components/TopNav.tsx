import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CREATOR_PORTFOLIO_URL } from "@/config/appFamily";
import { openExternal } from "@/lib/links";
const moreLinks = [
  ["/saved", "Saved — your travel collection"],
  ["/explore", "Explore the journal"],
  ["/about", "About Jet Set LatAm"],
  ["/privacy", "Privacy"],
  ["/disclosure", "Affiliate disclosure"],
  ["/our-world", "Our World"],
];
export function TopNav() {
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>16);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous=document.body.style.overflow;
    if (open) { dialog.current?.showModal(); document.body.style.overflow="hidden"; }
    else dialog.current?.close();
    return ()=>{document.body.style.overflow=previous;};
  }, [open]);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <>
      <header className="app-header" data-scrolled={scrolled}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-5 md:px-8">
            <Link
              to="/"
              aria-label="Jet Set LatAm home"
              className="font-display text-[27px] leading-none tracking-tight"
            >
              Jet Set <span className="italic text-terracotta">LatAm</span>
              <span className="mt-1.5 block font-sans text-[8px] uppercase tracking-[.28em] text-ink-soft/65">
                A Latin American love letter
              </span>
            </Link>
          <button
            ref={trigger}
            onClick={() => setOpen(true)}
            aria-label="More"
            aria-haspopup="dialog"
            aria-expanded={open}
            className="flex min-h-11 items-center gap-2 px-2 text-xs tracking-wider"
          >
            <span>More</span>
            <Menu size={18} strokeWidth={1.4} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        className="more-dialog"
        aria-labelledby="more-title"
      >
        <div className="travel-drawer-handle" aria-hidden="true"/>
        <p className="eyebrow mb-3 text-terracotta">Your travel drawer</p>
        <div className="flex items-center justify-between border-b border-ink/10 pb-4">
          <h2 id="more-title" className="font-display text-3xl">
            A little further.
          </h2>
          <button onClick={close} aria-label="Close menu" className="p-3">
            <X size={20} />
          </button>
        </div>
        <nav aria-label="More navigation" className="divide-y divide-ink/10">
          {moreLinks.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              onClick={close}
              className="flex min-h-14 items-center justify-between py-4 text-base"
            >
              {label}
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </nav>
        <div className="mt-5 flex gap-4 text-sm text-terracotta">
          <button
            onClick={() => {
              close();
              openExternal(CREATOR_PORTFOLIO_URL);
            }}
            className="py-3"
          >
            @jordypop ↗
          </button>
          <button
            onClick={() => {
              close();
              openExternal("https://jetsetlatam.com");
            }}
            className="py-3"
          >
            Visit the website ↗
          </button>
        </div>
      </dialog>
    </>
  );
}
