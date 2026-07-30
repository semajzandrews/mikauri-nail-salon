"use client";

/**
 * Mikauri — reserve your seat.
 *
 * SPINE (identical across every build): service -> when -> who -> confirm
 *
 * SKIN / the thing no other build can do:
 *   Mikauri is the only site in the book whose service table carries BOTH a real
 *   duration and a real price for every row (app/components/Services.tsx). So this
 *   is the only booking that lets a client STACK services and watch the visit add
 *   up — live minutes and live dollars. A manicure plus a pedicure is 75 minutes
 *   and $75, and she can see that before she commits her afternoon.
 *
 *   Their hero says "Booked one-to-one so no chair sits empty waiting for you."
 *   That is a real scheduling promise, so the panel states the total time the
 *   seat is held rather than pretending a 2.5-hour lash set is a 30-minute slot.
 *
 * Layout: a two-pane panel — the menu on one side, a live appointment card on the
 * other that grows as she chooses. No stepping.
 *
 * Every price and duration below is READ from their own table. Nothing invented.
 * Static export: nothing is charged.
 */

import { useEffect, useMemo, useState } from "react";



/**
 * US phone formatting + validation, shared behaviour across every build.
 * Progressively formats to (xxx) xxx-xxxx as the customer types, hard-caps at
 * 10 digits so nothing longer can be entered, and exposes a completeness check
 * the submit gate uses. Non-digits are dropped rather than rejected, so paste
 * of "973-555-0123" or "+1 973 555 0123" still lands correctly.
 */
export function formatPhone(input: string): string {
  const d = input.replace(/\D/g, "").replace(/^1(?=\d{10})/, "").slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
export const isPhoneComplete = (v: string) => v.replace(/\D/g, "").length === 10;

/* mirrors app/components/Services.tsx — [category, name, desc, durationLabel, price] */
const ROWS: [string, string, string, string, string][] = [
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

const SWATCHES = [
  { n: "Porcelain", hex: "#FBF6F2" }, { n: "Pearl", hex: "#E6DACE" },
  { n: "Blush", hex: "#F5D9D2" }, { n: "Rose", hex: "#E0B5B0" },
  { n: "Champagne", hex: "#C8A876" }, { n: "Mocha", hex: "#A07659" },
  { n: "Plum", hex: "#5A2F44" }, { n: "Onyx", hex: "#1F1612" },
];

/** "2.5 hr" -> 150, "45 min" -> 45 */
function toMinutes(label: string) {
  const n = parseFloat(label);
  return /hr/i.test(label) ? Math.round(n * 60) : Math.round(n);
}
function humanMinutes(m: number) {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60), r = m % 60;
  return r ? `${h} hr ${r} min` : `${h} hr`;
}

type Item = { id: string; cat: string; name: string; desc: string; mins: number; price: number };
const ITEMS: Item[] = ROWS.map(([cat, name, desc, dur, price]) => ({
  id: `${cat}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  cat, name, desc, mins: toMinutes(dur), price: parseFloat(price),
}));
const CATS = Array.from(new Set(ITEMS.map((i) => i.cat)));

function days(n = 12) {
  const out: { key: string; label: string }[] = [];
  const d = new Date();
  for (let i = 1; i <= n; i++) {
    const x = new Date(d); x.setDate(d.getDate() + i);
    out.push({ key: x.toISOString().slice(0, 10), label: x.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) });
  }
  return out;
}
const pretty = (k: string) =>
  new Date(k + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
const money = (n: number) => `$${n.toFixed(0)}`;

export default function SeatBooking() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [shade, setShade] = useState("");
  const [dayKey, setDayKey] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  const D = useMemo(() => days(12), []);
  const chosen = ITEMS.filter((i) => picked.includes(i.id));
  const totalMins = chosen.reduce((n, i) => n + i.mins, 0);
  const totalPrice = chosen.reduce((n, i) => n + i.price, 0);
  const wantsColor = chosen.some((i) => /MANICURE|PEDICURE/.test(i.cat));

  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("mik:book", on as EventListener);
    return () => window.removeEventListener("mik:book", on as EventListener);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  function reset() { setPicked([]); setShade(""); setDayKey(""); setName(""); setPhone(""); setDone(false); }

  const ready = chosen.length > 0 && !!dayKey && !!name.trim() && isPhoneComplete(phone);

  return (
    <>
      <div onClick={() => setOpen(false)} aria-hidden={!open}
        style={{ position: "fixed", inset: 0, zIndex: 230, background: "rgba(31,22,18,0.6)", backdropFilter: "blur(4px)",
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .3s ease" }} />

      <div role="dialog" aria-modal="true" aria-label="Reserve your seat"
        style={{ position: "fixed", inset: 0, zIndex: 240, display: "grid", placeItems: "center", padding: 14,
          pointerEvents: open ? "auto" : "none", opacity: open ? 1 : 0, transition: "opacity .3s ease" }}>
        <div className="mik-panel" style={{
          width: "100%", maxWidth: 860, maxHeight: "90vh", display: "flex",
          background: "var(--color-porcelain)", border: "1px solid rgba(31,22,18,0.14)",
          transform: open ? "translateY(0)" : "translateY(10px)",
          transition: "transform .4s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: "0 40px 100px -30px rgba(31,22,18,0.4)", overflow: "hidden",
        }}>
          {/* ── the menu ─────────────────────────────── */}
          <div style={{ flex: "1 1 58%", overflowY: "auto", padding: "26px clamp(18px,3vw,30px)", minWidth: 0 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-champagne)" }}>
              Reserve your seat
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem,3vw,2.1rem)", color: "var(--color-charcoal)", marginTop: 8, lineHeight: 1.1 }}>
              Choose as many as you like.
            </h2>
            <p style={{ fontSize: 12.5, color: "var(--color-graphite)", marginTop: 8, lineHeight: 1.6, opacity: 0.8 }}>
              We book one-to-one, so we hold the seat for the whole visit.
            </p>

            {CATS.map((c) => (
              <section key={c} style={{ marginTop: 22 }}>
                <p style={{ fontSize: 10, letterSpacing: "0.24em", color: "var(--color-champagne)", marginBottom: 9 }}>{c}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {ITEMS.filter((i) => i.cat === c).map((i) => {
                    const on = picked.includes(i.id);
                    return (
                      <button key={i.id} onClick={() => toggle(i.id)} aria-pressed={on}
                        style={{
                          textAlign: "left", padding: "11px 13px", display: "flex", justifyContent: "space-between", gap: 12,
                          border: `1px solid ${on ? "var(--color-rose)" : "rgba(31,22,18,0.12)"}`,
                          background: on ? "var(--color-blush)" : "transparent", cursor: "pointer",
                          transition: "all .18s ease",
                        }}>
                        <span style={{ minWidth: 0 }}>
                          <span style={{ display: "block", fontSize: 14.5, color: "var(--color-charcoal)" }}>{i.name}</span>
                          <span style={{ display: "block", fontSize: 11.5, color: "var(--color-graphite)", opacity: 0.75, marginTop: 2 }}>{i.desc}</span>
                        </span>
                        <span style={{ textAlign: "right", flexShrink: 0 }}>
                          <span style={{ display: "block", fontSize: 14, color: "var(--color-charcoal)" }}>{money(i.price)}</span>
                          <span style={{ display: "block", fontSize: 11, color: "var(--color-graphite)", opacity: 0.7 }}>{humanMinutes(i.mins)}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}

            {wantsColor && (
              <section style={{ marginTop: 24 }}>
                <p style={{ fontSize: 10, letterSpacing: "0.24em", color: "var(--color-champagne)", marginBottom: 9 }}>
                  SHADE <span style={{ letterSpacing: 0, opacity: 0.7 }}>· optional, choose in the room</span>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {SWATCHES.map((s) => (
                    <button key={s.n} onClick={() => setShade(s.n === shade ? "" : s.n)} aria-label={s.n} aria-pressed={shade === s.n}
                      style={{
                        display: "flex", alignItems: "center", gap: 7, padding: "6px 11px 6px 6px",
                        border: `1px solid ${shade === s.n ? "var(--color-charcoal)" : "rgba(31,22,18,0.14)"}`,
                        fontSize: 12, color: "var(--color-charcoal)", cursor: "pointer",
                      }}>
                      <span style={{ width: 15, height: 15, borderRadius: "50%", background: s.hex, border: "1px solid rgba(31,22,18,0.18)" }} />
                      {s.n}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── the living appointment card ───────────── */}
          <aside className="mik-card" style={{
            flex: "0 0 42%", background: "#fff", borderLeft: "1px solid rgba(31,22,18,0.12)",
            display: "flex", flexDirection: "column", minWidth: 0,
          }}>
            <div style={{ padding: "22px 22px 16px", borderBottom: "1px solid rgba(31,22,18,0.1)", display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-champagne)" }}>
                  {done ? "Seat reserved" : "Your visit"}
                </p>
                {!done && (
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-charcoal)", marginTop: 6 }}>
                    {chosen.length ? humanMinutes(totalMins) : "—"}
                  </p>
                )}
                {done && (
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--color-charcoal)", marginTop: 6 }}>
                    See you, {name.split(" ")[0]}.
                  </p>
                )}
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close"
                style={{ width: 32, height: 32, display: "grid", placeItems: "center", border: "1px solid rgba(31,22,18,0.16)", color: "var(--color-charcoal)", flexShrink: 0 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <div style={{ flexGrow: 1, overflowY: "auto", padding: "18px 22px" }}>
              {chosen.length === 0 && !done && (
                <p style={{ fontSize: 13, color: "var(--color-graphite)", opacity: 0.7, lineHeight: 1.6 }}>
                  Pick a service and your visit builds here — minutes and total, so you know
                  exactly how much of the day to set aside.
                </p>
              )}

              {chosen.length > 0 && (
                <ul style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {chosen.map((i) => (
                    <li key={i.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, fontSize: 13.5, color: "var(--color-charcoal)" }}>
                      <span style={{ minWidth: 0 }}>{i.name}<span style={{ display: "block", fontSize: 11, opacity: 0.6 }}>{humanMinutes(i.mins)}</span></span>
                      <span style={{ flexShrink: 0 }}>{money(i.price)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {chosen.length > 0 && (
                <dl style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(31,22,18,0.12)", display: "flex", flexDirection: "column", gap: 6, fontSize: 13.5 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <dt style={{ color: "var(--color-graphite)", opacity: 0.8 }}>Seat held</dt>
                    <dd style={{ color: "var(--color-charcoal)" }}>{humanMinutes(totalMins)}</dd>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16 }}>
                    <dt style={{ color: "var(--color-charcoal)" }}>Total</dt>
                    <dd style={{ color: "var(--color-charcoal)" }}>{money(totalPrice)}</dd>
                  </div>
                  {shade && (
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                      <dt style={{ color: "var(--color-graphite)", opacity: 0.8 }}>Shade</dt>
                      <dd style={{ color: "var(--color-charcoal)" }}>{shade}</dd>
                    </div>
                  )}
                </dl>
              )}

              {!done && chosen.length > 0 && (
                <>
                  <p style={{ fontSize: 10, letterSpacing: "0.24em", color: "var(--color-champagne)", margin: "20px 0 9px" }}>DAY</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {D.map((d) => (
                      <button key={d.key} onClick={() => setDayKey(d.key)}
                        style={{
                          padding: "7px 11px", fontSize: 12,
                          border: `1px solid ${dayKey === d.key ? "var(--color-charcoal)" : "rgba(31,22,18,0.14)"}`,
                          background: dayKey === d.key ? "var(--color-charcoal)" : "transparent",
                          color: dayKey === d.key ? "var(--color-porcelain)" : "var(--color-charcoal)",
                          cursor: "pointer",
                        }}>{d.label}</button>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name"
                      style={{ background: "transparent", border: "1px solid rgba(31,22,18,0.16)", padding: "10px 12px", fontSize: 14.5, color: "var(--color-charcoal)" }} />
                    <input value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} inputMode="tel" maxLength={14} placeholder="(609) 000-0000" aria-label="Phone"
                      style={{ background: "transparent", border: "1px solid rgba(31,22,18,0.16)", padding: "10px 12px", fontSize: 14.5, color: "var(--color-charcoal)" }} />
                  </div>
                </>
              )}

              {done && (
                <>
                  <p style={{ fontSize: 13.5, color: "var(--color-graphite)", marginTop: 14, lineHeight: 1.65 }}>
                    {pretty(dayKey)} — we&rsquo;ll call{" "}{phone}{" "}to set the hour and hold the seat
                    for {humanMinutes(totalMins)}.
                  </p>
                  <p style={{ marginTop: 14, display: "inline-block", padding: "7px 11px", border: "1px solid rgba(31,22,18,0.14)", fontSize: 10.5, color: "var(--color-graphite)" }}>
                    Demo — nothing was charged.
                  </p>
                  <button onClick={reset} style={{ display: "block", marginTop: 14, fontSize: 12.5, color: "var(--color-rose)", textDecoration: "underline" }}>
                    Reserve another seat
                  </button>
                </>
              )}
            </div>

            {!done && (
              <div style={{ padding: 18, borderTop: "1px solid rgba(31,22,18,0.1)" }}>
                <button disabled={!ready} onClick={() => setDone(true)}
                  style={{
                    width: "100%", padding: "13px", background: "var(--color-charcoal)", color: "var(--color-porcelain)",
                    fontSize: 10.5, letterSpacing: "0.3em", textTransform: "uppercase",
                    opacity: ready ? 1 : 0.3, cursor: ready ? "pointer" : "not-allowed",
                  }}>
                  Reserve the seat
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 780px) {
          .mik-panel { flex-direction: column !important; }
          .mik-card  { flex: 1 1 auto !important; border-left: none !important; border-top: 1px solid rgba(31,22,18,0.12) !important; }
        }
      `}</style>
    </>
  );
}
