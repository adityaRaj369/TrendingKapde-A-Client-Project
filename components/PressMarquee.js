"use client";

const NAMES = ["VOGUE", "GQ", "ELLE", "HYPEBEAST", "HARPER'S", "DAZED", "i-D", "NYLON"];

export default function PressMarquee() {
  const loop = [...NAMES, ...NAMES, ...NAMES];
  return (
    <section className="border-y border-line bg-paper py-6 overflow-hidden">
      <div className="mx-auto max-w-site px-4 md:px-8 mb-4">
        <p className="label text-ash text-center">As seen in</p>
      </div>
      <div className="flex whitespace-nowrap animate-marquee items-center">
        {loop.map((n, i) => (
          <span
            key={i}
            className="font-display font-bold uppercase tracking-tightest text-2xl md:text-4xl text-ink/25 mx-8 md:mx-12 hover:text-ink transition-colors"
          >
            {n}
          </span>
        ))}
      </div>
    </section>
  );
}
