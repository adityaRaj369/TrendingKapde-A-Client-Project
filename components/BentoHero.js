"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import SafeImage from "./SafeImage";

export default function BentoHero() {
  const { products, content: c } = useStore();

  const feature = useMemo(
    () => products.find((p) => p.images?.[0]) || products[0],
    [products]
  );

  const delay = (ms) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="grid grid-cols-2 gap-2 md:gap-3 p-2 md:p-3 lg:grid-cols-4 lg:grid-rows-3 lg:h-[calc(100vh-64px)] lg:min-h-[600px]">
      {/* A — CAMPAIGN */}
      <Link
        href={c.heroCtaPrimaryHref || "/shop?collection=New"}
        style={delay(60)}
        className="group animate-fadeUp relative overflow-hidden bg-black col-span-2 lg:row-span-3 min-h-[74vw] lg:min-h-0"
      >
        <SafeImage
          src={c.heroImage}
          alt="Campaign"
          label={c.brandName}
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40" />
        <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3 text-white/80">
          <span className="label">Collection 01</span>
          <span className="w-8 h-px bg-white/40" />
          <span className="label">{c.heroEyebrow}</span>
        </div>
        <div className="absolute bottom-0 left-0 p-5 md:p-8">
          <h1 className="font-mega uppercase text-white leading-[0.85] text-[15vw] lg:text-[6.5vw]">
            {c.heroTitle1}
            <br />
            {c.heroTitle2}
          </h1>
          <p className="text-white/85 mt-3 max-w-sm text-sm hidden md:block">
            {c.heroSubtitle}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 label text-white">
            <span className="hover-underline-light">{c.heroCtaPrimaryText}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>

      {/* B — STATEMENT */}
      <Link
        href="/shop"
        style={delay(140)}
        className="group animate-fadeUp relative overflow-hidden bg-smoke text-ink col-span-2 lg:row-span-1 min-h-[42vw] lg:min-h-0 flex flex-col justify-between p-5 md:p-7 border border-line"
      >
        <span className="label text-ash">Autumn / Winter · 2026</span>
        <div className="flex items-end justify-between gap-3">
          <span className="font-mega uppercase leading-[0.85] text-4xl md:text-6xl">
            {c.marqueeA}
          </span>
          <span className="text-3xl md:text-5xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </div>
      </Link>

      {/* C — PRODUCT */}
      <Link
        href={feature ? `/product/${feature.id}` : "/shop"}
        style={delay(220)}
        className="group animate-fadeUp relative overflow-hidden bg-smoke col-span-1 lg:row-span-2 min-h-[52vw] lg:min-h-0"
      >
        <SafeImage
          src={feature?.images?.[0]}
          alt={feature?.name || "Featured"}
          label={feature?.name || "Featured"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 label bg-white/90 text-black px-2.5 py-1">
          Bestseller
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-white text-sm font-medium truncate">
            {feature?.name}
          </div>
          <span className="label text-white/80">Shop the piece →</span>
        </div>
      </Link>

      {/* D — REELS */}
      <Link
        href="/reels"
        style={delay(300)}
        className="group animate-fadeUp relative overflow-hidden bg-smoke text-ink border border-line col-span-1 lg:row-span-1 min-h-[52vw] lg:min-h-0 flex flex-col justify-between p-5"
      >
        <span className="label text-ash">Watch &amp; shop</span>
        <div>
          <div className="w-11 h-11 rounded-full border border-ink/50 flex items-center justify-center text-lg mb-3 transition-transform group-hover:scale-110">
            ▶
          </div>
          <span className="font-mega uppercase text-3xl md:text-4xl leading-none">
            Reels
          </span>
        </div>
      </Link>

      {/* E — CTA (the standout white tile) */}
      <Link
        href={c.heroCtaPrimaryHref || "/shop?collection=New"}
        style={delay(380)}
        className="group animate-fadeUp relative overflow-hidden bg-white text-black col-span-2 lg:col-span-1 lg:row-span-1 min-h-[26vw] lg:min-h-0 flex items-center justify-between p-5 transition-colors hover:bg-black hover:text-white"
      >
        <span className="font-display font-extrabold uppercase tracking-tightest text-xl md:text-2xl leading-none">
          {c.heroCtaPrimaryText}
        </span>
        <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </section>
  );
}
