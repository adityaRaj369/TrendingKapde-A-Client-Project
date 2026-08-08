"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import SectionHeader from "./SectionHeader";

const SLIDES = [
  {
    n: "01",
    title: "Monochrome Tailoring",
    tag: "The Suiting Story",
    img: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?auto=format&fit=crop&w=900&q=80",
    href: "/shop?category=Women",
  },
  {
    n: "02",
    title: "Off-Duty Denim",
    tag: "Weekend Edit",
    img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=900&q=80",
    href: "/shop?category=Men",
  },
  {
    n: "03",
    title: "Sharp Outerwear",
    tag: "Cold Front",
    img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=80",
    href: "/shop?collection=New",
  },
  {
    n: "04",
    title: "Finishing Touches",
    tag: "Accessories",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    href: "/shop?category=Accessories",
  },
  {
    n: "05",
    title: "Everyday Essentials",
    tag: "The Basics",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
    href: "/shop",
  },
];

export default function Lookbook({ index = "02" }) {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-site px-4 md:px-8">
        <SectionHeader
          index={index}
          eyebrow="Drag to explore"
          title="The Lookbook"
          href="/shop"
          cta="Shop all"
        />
      </div>

      <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-8 pb-2">
        {SLIDES.map((s) => (
          <Link
            key={s.n}
            href={s.href}
            className="group relative shrink-0 snap-start w-[78%] sm:w-[52%] md:w-[38%] lg:w-[30%] aspect-[3/4] overflow-hidden bg-smoke"
          >
            <SafeImage
              src={s.img}
              alt={s.title}
              label={s.title}
              className="w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 font-mega text-white/90 text-4xl md:text-5xl leading-none">
              {s.n}
            </span>
            <div className="absolute bottom-0 left-0 p-5 md:p-6">
              <p className="label text-white/80">{s.tag}</p>
              <h3 className="font-display font-extrabold uppercase tracking-tightest text-white text-xl md:text-2xl mt-1">
                {s.title}
              </h3>
              <span className="label text-white hover-underline-light inline-block mt-2">
                Shop →
              </span>
            </div>
          </Link>
        ))}
        <div className="shrink-0 w-4 md:w-8" aria-hidden="true" />
      </div>
    </section>
  );
}
