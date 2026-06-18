"use client";
import { motion } from "motion/react";
export default function Visit() {
  return (
    <section id="visit" className="py-28 md:py-36 bg-charcoal text-porcelain">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 text-center">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div className="font-script text-4xl text-rose">— visit the salon —</div>
          <h2 className="mt-2 font-display text-[clamp(3rem,7vw,6rem)] italic">
            304 Park Avenue.
          </h2>
          <div className="text-[11px] uppercase tracking-[0.42em] text-rose mt-2">ORANGE · NEW JERSEY · 07050</div>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {[
            { k: "BOOKING", v: "(609) 388-9656", c: "border-rose" },
            { k: "HOURS",   v: "Mon–Sat · 9:30 to 6:30", c: "border-champagne" },
            { k: "RATING",  v: "4.4 ★ · 66 reviews", c: "border-rose" },
          ].map((s) => (
            <div key={s.k} className={`border ${s.c} p-6`}>
              <div className="text-[10px] uppercase tracking-[0.32em] text-rose">{s.k}</div>
              <div className="mt-3 font-display italic text-xl">{s.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-12"><a href="tel:+16093889656" className="bg-rose-2 text-porcelain px-10 py-5 text-[11px] uppercase tracking-[0.32em] hover:bg-porcelain hover:text-charcoal transition-colors">Reserve your seat →</a></div>
      </div>
    </section>
  );
}
