"use client";
import { motion } from "motion/react";

const SWATCHES = [
  { n: "Porcelain", hex: "#FBF6F2", tx: "text-charcoal" },
  { n: "Pearl",     hex: "#E6DACE", tx: "text-charcoal" },
  { n: "Blush",     hex: "#F5D9D2", tx: "text-charcoal" },
  { n: "Rose",      hex: "#E0B5B0", tx: "text-charcoal" },
  { n: "Champagne", hex: "#C8A876", tx: "text-charcoal" },
  { n: "Mocha",     hex: "#A07659", tx: "text-porcelain" },
  { n: "Plum",      hex: "#5A2F44", tx: "text-porcelain" },
  { n: "Onyx",      hex: "#1F1612", tx: "text-porcelain" },
];

export default function Looks() {
  return (
    <section id="looks" className="py-24 md:py-32 bg-blush/50">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="text-center mb-12">
          <div className="font-script text-4xl text-rose-2">— the lookbook —</div>
          <h2 className="mt-2 font-display text-[clamp(2.5rem,5.5vw,5rem)] italic text-charcoal">Eight house colors.</h2>
          <p className="mt-3 text-graphite max-w-md mx-auto">House blends we mix on site. Bring a photo for anything custom.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {SWATCHES.map((s, i) => (
            <motion.div key={s.hex} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: (i%4)*0.06 }} className={`aspect-[3/4] ${s.tx} p-5 flex flex-col justify-between shadow-lg`} style={{ background: s.hex }}>
              <div className="text-[10px] uppercase tracking-[0.3em]">No. {(i+1).toString().padStart(2,"0")}</div>
              <div>
                <div className="font-display text-2xl italic">{s.n}</div>
                <div className="text-[10px] tracking-[0.2em] tabnum mt-1">{s.hex}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
