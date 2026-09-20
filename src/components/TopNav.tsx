import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, Menu, X } from "lucide-react";
import { CREATOR_PORTFOLIO_URL } from "@/config/appFamily";
import { openExternal } from "@/lib/links";
const moreLinks = [
  ["/saved", "Saved"],
  ["/explore", "Journal"],
  ["/about", "About Jet Set"],
  ["/privacy", "Privacy"],
  ["/disclosure", "Affiliate disclosure"],
  ["/our-world", "Our World"],
];
export function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const showBack = location.pathname !== '/' || Boolean(location.search);
  function goBack() {
    if (typeof window.history.state?.idx === 'number' && window.history.state.idx > 0) navigate(-1);
    else if (location.pathname.startsWith('/destinations/')) navigate('/destinations', {replace:true});
    else if (location.pathname.startsWith('/guides/') || location.pathname.startsWith('/trails/') || location.search) navigate('/explore', {replace:true});
    else if (location.pathname.startsWith('/saved/trips/')) navigate('/saved', {replace:true});
    else navigate('/', {replace:true});
  }
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>16);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const el=dialog.current;
    if(!open || !el)return;
    const previous=document.body.style.overflow;
    const triggerElement=trigger.current;
    const native=typeof el.showModal==='function';
    if(native)el.showModal();
    else {el.setAttribute('open','');el.classList.add('more-fallback');el.querySelector('button')?.focus();}
    const keepFocus=(event:FocusEvent)=>{if(!native&&!el.contains(event.target as Node))el.querySelector('button')?.focus();};
    const keys=(event:KeyboardEvent)=>{
      if(!native&&event.key==='Escape'){event.preventDefault();setOpen(false);}
      if(event.key==='Tab'){
        const items=[...el.querySelectorAll<HTMLElement>('button,a[href]')];
        const first=items[0],last=items[items.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    document.addEventListener('keydown',keys);document.addEventListener('focusin',keepFocus);
    document.body.style.overflow='hidden';
    return ()=>{
      document.removeEventListener('keydown',keys);document.removeEventListener('focusin',keepFocus);
      if(native)el.close();else {el.removeAttribute('open');el.classList.remove('more-fallback');}
      document.body.style.overflow=previous;triggerElement?.focus();
    };
  }, [open]);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <>
      <header className="app-header" data-scrolled={scrolled}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-5 md:px-8">
            <div className="app-brand-row">
            {showBack && <button className="app-back" onClick={goBack} aria-label="Go back"><ArrowLeft size={21}/></button>}
            <Link
              to="/"
              aria-label="Jet Set LatAm home"
              className="font-display text-[27px] leading-none tracking-tight"
            >
              Jet Set <span className="text-terracotta">LatAm</span>

            </Link>
            </div>
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
        role="dialog"
        aria-modal="true"
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        className="more-dialog"
        aria-labelledby="more-title"
      >
        <div className="flex items-center justify-between border-b border-ink/10 pb-4">
          <h2 id="more-title" className="font-display text-3xl">
            More
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
