"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import SectionHeader from "@/components/SectionHeader";
import PressMarquee from "@/components/PressMarquee";
import Lookbook from "@/components/Lookbook";
import Collections from "@/components/Collections";
import BentoHero from "@/components/BentoHero";
import HomeReels from "@/components/HomeReels";

export default function HomePage() {
  const { products, hydrated, content: c } = useStore();

  const trending = useMemo(
    () => products.filter((p) => p.collection === "Trending").slice(0, 8),
    [products]
  );
  const newIn = useMemo(
    () => products.filter((p) => p.collection === "New").slice(0, 4),
    [products]
  );
  const trend = trending.length ? trending : products.slice(0, 8);
  const fresh = newIn.length ? newIn : products.slice(0, 4);

  return (
    <div>
      {/* ===================== BENTO HERO ===================== */}
      <BentoHero />

      {/* ===================== PRESS ===================== */}
      <PressMarquee />

      {/* ===================== CATEGORIES ===================== */}
      <section className="mx-auto max-w-site px-4 md:px-8 py-12 md:py-24">
        <SectionHeader index="01" eyebrow={c.catEyebrow} title={c.catTitle} />
        <div className="grid gap-3 md:gap-5 md:grid-cols-3">
          {[
            { title: "Women", href: "/shop?category=Women", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80" },
            { title: "Men", href: "/shop?category=Men", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80" },
            { title: "Accessories", href: "/shop?category=Accessories", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80" },
          ].map((cat, i) => (
            <Reveal key={cat.title} delay={i * 90}>
              <CategoryTile {...cat} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== LOOKBOOK ===================== */}
      <Lookbook index="02" />

      {/* ===================== TRENDING ===================== */}
      <section className="mx-auto max-w-site px-4 md:px-8 pb-16 md:pb-24">
        <SectionHeader
          index="03"
          eyebrow={c.trendEyebrow}
          title={c.trendTitle}
          href="/shop"
        />
        {hydrated ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-9 md:gap-x-6 md:gap-y-14">
            {trend.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <GridSkeleton />
        )}
        <Link href="/shop" className="btn btn-outline w-full mt-10 md:hidden">
          See all products
        </Link>
      </section>

      {/* ===================== REELS SLIDER ===================== */}
      <HomeReels index="04" />

      {/* ===================== STATEMENT MARQUEE ===================== */}
      <section className="bg-white text-black py-7 md:py-12 overflow-hidden space-y-1 md:space-y-2">
        <div className="flex whitespace-nowrap animate-marqueeFast">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-mega uppercase h-mega mx-5 flex items-center gap-5">
              {c.marqueeA}
              <span className="text-black/30">✦</span>
            </span>
          ))}
        </div>
        <div className="flex whitespace-nowrap animate-marqueeRev">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-mega uppercase h-mega mx-5 flex items-center gap-5 text-transparent"
              style={{ WebkitTextStroke: "1px rgba(0,0,0,0.55)" }}
            >
              {c.marqueeB}
              <span style={{ WebkitTextStroke: "0" }} className="text-black/30">
                ✦
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* ===================== COLLECTIONS ===================== */}
      <Collections />

      {/* ===================== EDITORIAL SPLIT ===================== */}
      <section className="grid md:grid-cols-2">
        <Reveal className="relative aspect-[4/5] md:aspect-auto md:min-h-[560px] bg-smoke overflow-hidden">
          <SafeImage
            src={c.edImage}
            alt={c.edTitle1}
            label={c.edTitle1}
            className="w-full h-full object-cover"
          />
        </Reveal>
        <Reveal
          delay={120}
          className="bg-paper flex flex-col justify-center px-6 md:px-16 py-16 md:py-0 border-t md:border-t-0 md:border-l border-line"
        >
          <p className="label text-ash">{c.edEyebrow}</p>
          <h2 className="font-mega uppercase h-section mt-3 leading-[0.9]">
            {c.edTitle1}
            <br />
            {c.edTitle2}
          </h2>
          <p className="text-ink/70 mt-5 max-w-md text-sm md:text-base">{c.edBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Link href={c.edCta1Href || "/shop"} className="btn btn-dark">
                {c.edCta1Text}
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href={c.edCta2Href || "/reels"} className="btn btn-outline">
                {c.edCta2Text}
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>

      {/* ===================== NEW IN ===================== */}
      <section className="mx-auto max-w-site px-4 md:px-8 py-12 md:py-24">
        <SectionHeader index="05" title={c.newInTitle} href="/shop?collection=New" />
        {hydrated ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-9 md:gap-x-6">
            {fresh.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <GridSkeleton n={4} />
        )}
      </section>

      {/* ===================== SERVICE STRIP ===================== */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-site px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
          {[
            [c.service1Title, c.service1Sub],
            [c.service2Title, c.service2Sub],
            [c.service3Title, c.service3Sub],
            [c.service4Title, c.service4Sub],
          ].map(([t, s]) => (
            <div key={t} className="py-8 px-4 md:px-6">
              <div className="font-display font-bold uppercase tracking-tightest text-sm md:text-base">
                {t}
              </div>
              <div className="text-xs text-ash mt-1">{s}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CategoryTile({ title, href, img }) {
  return (
    <Link href={href} className="group relative block overflow-hidden bg-smoke">
      <div className="aspect-[3/4] md:aspect-[4/5]">
        <SafeImage
          src={img}
          alt={title}
          label={title}
          className="w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex items-end justify-between">
        <h3 className="font-mega uppercase text-white text-3xl md:text-5xl leading-none">
          {title}
        </h3>
        <span className="label text-white md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition">
          Shop →
        </span>
      </div>
    </Link>
  );
}

function GridSkeleton({ n = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-9 md:gap-x-6">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i}>
          <div className="aspect-[3/4] bg-smoke shimmer" />
          <div className="h-3 bg-smoke mt-3 w-2/3" />
          <div className="h-3 bg-smoke mt-2 w-1/3" />
        </div>
      ))}
    </div>
  );
}
