export default function Footer() {
  return (
    <footer className="bg-porcelain text-charcoal pt-12 pb-10 border-t border-rose/30 text-center">
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <div className="font-display text-3xl italic">M·I·K·A·U·R·I</div>
        <div className="font-script text-2xl text-rose-2 mt-1">nail salon & spa</div>
        <p className="mt-5 max-w-sm mx-auto text-graphite italic leading-relaxed">
          A quiet salon on Park Avenue, Orange NJ. By booking.
        </p>
        <div className="mt-8 text-[10px] uppercase tracking-[0.32em] text-graphite/60">
          © {new Date().getFullYear()} · MIKAURI · BUILT · BYSEMAJ.COM
        </div>
      </div>
    </footer>
  );
}
