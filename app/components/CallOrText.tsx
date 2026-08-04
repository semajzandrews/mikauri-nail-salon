"use client";

/**
 * Call or Text — Mikauri's treatment.
 *
 * Plenty of clients will never dial a salon, but they will happily text a photo
 * of the set they want. So the number is a chooser rather than a dial-only link.
 * tel:/sms: are both built from E.164 digits in app/lib/phone.ts.
 *
 * Skin: Mikauri is all square corners, hairline rose rules, Playfair italic and
 * 0.32em uppercase micro-labels on porcelain. No rounded pill, no drop shadow —
 * the popover is a card cut from the same paper as the Visit tiles.
 */

import { useEffect, useRef, useState } from "react";
import { site } from "../lib/site";

type Props = {
  variant?: "pill" | "inline";
  /** pill only: dark trigger for the porcelain nav, light for dark sections */
  tone?: "ink" | "porcelain";
  className?: string;
};

function PhoneMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M6.5 3h3l1.5 4-2 1.4a12 12 0 0 0 6.6 6.6L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3 5.2 2 2 0 0 1 5 3h1.5Z" />
    </svg>
  );
}

function NoteMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 5h18v12H8l-5 4V5Z" />
    </svg>
  );
}

export default function CallOrText({ variant = "pill", tone = "ink", className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap items-stretch justify-center gap-3 ${className}`}>
        <a
          href={site.phoneHref}
          className="group inline-flex items-center gap-3 border border-rose px-6 py-4 text-left transition-colors hover:bg-rose-2 hover:border-rose-2 hover:text-porcelain"
        >
          <PhoneMark size={16} />
          <span>
            <span className="block text-[10px] uppercase tracking-[0.32em] opacity-70">Call the salon</span>
            <span className="mt-1 block font-display italic text-xl tabnum">{site.phone}</span>
          </span>
        </a>
        <a
          href={site.smsHref}
          className="group inline-flex items-center gap-3 border border-champagne px-6 py-4 text-left transition-colors hover:bg-champagne hover:text-charcoal"
        >
          <NoteMark size={16} />
          <span>
            <span className="block text-[10px] uppercase tracking-[0.32em] opacity-70">Text instead</span>
            <span className="mt-1 block font-script text-2xl leading-none">send a photo of the set</span>
          </span>
        </a>
      </div>
    );
  }

  const trigger =
    tone === "porcelain"
      ? "border-porcelain/70 text-porcelain hover:bg-porcelain hover:text-charcoal"
      : "border-charcoal text-charcoal hover:bg-charcoal hover:text-porcelain";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Call or text ${site.phone}`}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 border px-3 py-2 text-[10px] uppercase tracking-[0.28em] transition-colors min-[560px]:px-5 ${trigger}`}
      >
        <PhoneMark size={13} />
        <span className="hidden tabnum min-[560px]:inline">{site.phone}</span>
      </button>

      <div
        role="menu"
        data-open={open}
        className="absolute right-0 top-[calc(100%+10px)] z-[70] w-[min(19rem,calc(100vw-2.5rem))] border border-rose bg-porcelain p-1 text-charcoal opacity-0 transition-[opacity,transform] duration-300 -translate-y-1 pointer-events-none data-[open=true]:opacity-100 data-[open=true]:translate-y-0 data-[open=true]:pointer-events-auto"
      >
        <a
          href={site.phoneHref}
          role="menuitem"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-blush"
        >
          <PhoneMark size={16} />
          <span className="flex-1">
            <span className="block text-[10px] uppercase tracking-[0.28em]">Call</span>
            <span className="mt-0.5 block font-display italic text-base tabnum">{site.phone}</span>
          </span>
        </a>
        <a
          href={site.smsHref}
          role="menuitem"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-blush"
        >
          <NoteMark size={16} />
          <span className="flex-1">
            <span className="block text-[10px] uppercase tracking-[0.28em]">Text</span>
            <span className="mt-0.5 block font-script text-xl leading-none text-rose-2">
              send a photo of the set
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}
