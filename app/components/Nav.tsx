"use client";
import { useEffect, useState } from "react";
const LINKS = [{l:"Services",h:"#services"},{l:"Lookbook",h:"#looks"},{l:"Visit",h:"#visit"}];
export default function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => { const f = () => setS(window.scrollY > 24); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${s ? "bg-porcelain/95 backdrop-blur-xl border-b border-rose/40" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-10">
        <a href="#top" className="font-display text-2xl italic text-charcoal">M<span className="text-rose-2">·</span>I<span className="text-rose-2">·</span>K<span className="text-rose-2">·</span>A<span className="text-rose-2">·</span>U<span className="text-rose-2">·</span>R<span className="text-rose-2">·</span>I</a>
        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => <a key={l.h} href={l.h} className="text-[11px] uppercase tracking-[0.32em] text-graphite hover:text-rose-2 transition-colors">{l.l}</a>)}
        </nav>
        <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("mik:book"))} className="border border-charcoal text-charcoal px-5 py-2 text-[10px] uppercase tracking-[0.28em] hover:bg-rose-2 hover:text-porcelain hover:border-rose-2">Book</button>
      </div>
    </header>
  );
}
