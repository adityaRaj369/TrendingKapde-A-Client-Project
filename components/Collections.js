"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import Reveal from "./Reveal";

const TILES = [
  {
    title: "The Monochrome Edit",
    sub: "Black on white, done right",
    img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=80",
    href: "/shop?collection=Trending",
  },
  {
    title: "Everyday Essentials",
    sub: "The pieces you'll reach for",
    img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=80",
    href: "/shop?collection=New",
  },
];

export default function Collections() {
  return (
    <section className="grid md:grid-cols-2">
      {TILES.map((t, i) => (
        <Reveal key={t.title} delay={i * 120}>
          <Link
            href={t.href}
            className="group relative block h-[70vh] min-h-[440px] overflow-hidden bg-black"
          >
            <SafeImage
              src={t.img}
              alt={t.title}
              label={t.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
              <p className="label text-white/80">{t.sub}</p>
              <h3 className="font-mega uppercase text-white text-4xl md:text-6xl leading-[0.9] mt-2 max-w-md">
                {t.title}
              </h3>
              <span className="mt-6 inline-flex items-center gap-2 label text-white">
                <span className="hover-underline-light">Shop the collection</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </section>
  );
}
