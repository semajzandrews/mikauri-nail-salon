"use client";
import { motion } from "motion/react";
const ROWS = [
  ["MANICURE","Classic","Shape, cuticle, polish, hand massage","30 min","30"],
  ["MANICURE","Gel","Gel polish, lasts 2-3 weeks","45 min","45"],
  ["MANICURE","Dip Powder","Color sealed in dip, no UV","60 min","60"],
  ["PEDICURE","Classic","Soak, scrub, polish, lower-leg massage","45 min","45"],
  ["PEDICURE","Spa","Adds extended massage, paraffin, hot stones","75 min","70"],
  ["LASH","Classic Set","Individual extension lash by lash","2 hr","160"],
  ["LASH","Hybrid Set","Mix of classic + volume fans","2.5 hr","180"],
  ["LASH","Fill","2-week fill","45 min","65"],
  ["WAX","Brow shape","Wax + tweeze + trim","20 min","18"],
  ["WAX","Lip","Quick + clean","10 min","12"],
];
export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-porcelain">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="text-center mb-12">
          <div className="font-script text-4xl text-rose-2">— services —</div>
          <h2 className="mt-2 font-display text-[clamp(2.5rem,5.5vw,5rem)] italic text-charcoal">The Menu.</h2>
        </div>
        <div className="bg-pearl/40 p-8 border-y border-rose/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-rose/50">
                <th className="text-left py-3 text-[10px] uppercase tracking-[0.32em] text-rose-2">Category</th>
                <th className="text-left py-3 text-[10px] uppercase tracking-[0.32em] text-rose-2">Service</th>
                <th className="hidden md:table-cell text-left py-3 text-[10px] uppercase tracking-[0.32em] text-rose-2">Includes</th>
                <th className="text-left py-3 text-[10px] uppercase tracking-[0.32em] text-rose-2">Time</th>
                <th className="text-right py-3 text-[10px] uppercase tracking-[0.32em] text-rose-2">From</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <motion.tr key={r.join("-")} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.4, delay: i*0.03 }} className="border-b border-rose/15 hover:bg-blush/40 transition-colors">
                  <td className="py-4 font-display text-sm text-rose-2 italic uppercase">{r[0]}</td>
                  <td className="py-4 font-display text-xl italic text-charcoal">{r[1]}</td>
                  <td className="hidden md:table-cell py-4 text-sm text-graphite italic">{r[2]}</td>
                  <td className="py-4 text-sm text-graphite tabnum">{r[3]}</td>
                  <td className="py-4 text-right font-display text-2xl text-charcoal tabnum">${r[4]}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
