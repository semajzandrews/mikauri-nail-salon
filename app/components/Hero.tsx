"use client";
import { motion } from "motion/react";

// Layout grammar: full-bleed magazine cover. Massive italic display
// over a soft pink wash with a hand-painted nail-polish stroke SVG.

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-36 md:pt-48 pb-20 md:pb-32">
      {/* Diagonal split background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-blush"/>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-porcelain" style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }}/>
      </div>

      {/* Polish stroke */}
      <svg viewBox="0 0 1200 200" className="absolute top-1/4 left-0 w-full h-32 -z-10" preserveAspectRatio="none">
        <path d="M 0 100 Q 300 60 600 100 T 1200 100" stroke="#C68F88" strokeWidth="40" fill="none" strokeLinecap="round" opacity="0.45"/>
      </svg>

      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="font-script text-5xl text-rose-2">Mikauri</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }} className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.9] tracking-[-0.02em] text-charcoal mt-2">
          NAIL SALON <br/>
          <span className="italic shimmer-text">& SPA.</span>
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }} className="mt-2 text-[11px] uppercase tracking-[0.42em] text-graphite">
          PARK AVE · ORANGE NJ · EST. QUIETLY EXCELLENT
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }} className="mt-8 max-w-xl text-lg leading-relaxed text-graphite">
          Considered nail care in a quiet room on Park Avenue. Manicures, pedicures, gel, dip powder, lash extensions, and waxing. Booked one-to-one so no chair sits empty waiting for you.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.65 }} className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#services" className="bg-charcoal text-porcelain px-8 py-4 text-[11px] uppercase tracking-[0.32em] hover:bg-rose-2 transition-colors">View services</a>
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("mik:book"))} className="border border-charcoal px-8 py-4 text-[11px] uppercase tracking-[0.32em] text-charcoal hover:bg-charcoal hover:text-porcelain transition-colors">Reserve your seat →</button>
        </motion.div>
      </div>
    </section>
  );
}
