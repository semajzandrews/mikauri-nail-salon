"use client";
import { motion } from "motion/react";

// ADDED 06-01-2026 — the one authorized imagery moment. A small "in the chair"
// strip that introduces the human / community belonging signal the photo-free
// design lacked, without disturbing the existing pink/porcelain theme.
//
// NOTE: these are FREE STOCK placeholders (Pexels, no-key) chosen to honestly
// reflect Mikauri's real City of Orange clientele. SWAP for the owner's real
// salon photos when available. Graded in-CSS (warm soft grade + subtle rose
// duotone wash) so mixed sources read as one native, editorial brand.

const FRAMES = [
  {
    src: "/images/chair-01-welcome.jpg",
    label: "In the chair",
    caption: "One client at a time, never rushed.",
    span: "col-span-2 md:col-span-2 row-span-2",
  },
  {
    src: "/images/chair-04-finished.jpg",
    label: "The finish",
    caption: "Color that catches the light.",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    src: "/images/chair-03-detail.jpg",
    label: "Hand-painted",
    caption: "Detail set by hand.",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    src: "/images/chair-02-polish.jpg",
    label: "Sealed to last",
    caption: "Gel and dip, finished clean.",
    span: "col-span-2 md:col-span-2 row-span-1",
  },
];

export default function Chair() {
  return (
    <section id="chair" className="py-24 md:py-32 bg-porcelain">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="text-center mb-12">
          <div className="font-script text-4xl text-rose-2">— in the chair —</div>
          <h2 className="mt-2 font-display text-[clamp(2.5rem,5.5vw,5rem)] italic text-charcoal">
            Real hands, real room.
          </h2>
          <p className="mt-3 text-graphite max-w-md mx-auto">
            A quiet block on Park Avenue, the women who keep coming back, and the
            work that brings them in.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[190px] gap-4 md:gap-5">
          {FRAMES.map((f, i) => (
            <motion.figure
              key={f.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
              className={`group relative overflow-hidden rounded-[14px] shadow-lg ${f.span}`}
            >
              {/* graded image: warm soft grade native to the porcelain/rose look */}
              <img
                src={f.src}
                alt={`${f.label} at Mikauri Nail Salon, Orange NJ`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ filter: "saturate(0.92) contrast(0.98) brightness(1.03) sepia(0.10)" }}
              />
              {/* subtle rose duotone wash, ties photos to the site's pinks */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-40"
                style={{ background: "linear-gradient(150deg, var(--blush), var(--rose))" }}
              />
              {/* warm highlight + readability gradient at the foot */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-porcelain/10" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <div className="text-[9px] uppercase tracking-[0.3em] text-porcelain/85">
                  {f.label}
                </div>
                <div className="font-display italic text-porcelain text-base md:text-lg leading-tight mt-0.5">
                  {f.caption}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-5 text-center text-[10px] uppercase tracking-[0.28em] text-graphite/55">
          Placeholder imagery · to be replaced with the salon&rsquo;s own photos
        </p>
      </div>
    </section>
  );
}
