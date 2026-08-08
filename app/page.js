"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import SafeImage from "@/components/SafeImage";
import Reveal from "@/components/Reveal";

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
      {/* ===================== HERO ===================== */}
      <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-ink">
        <SafeImage
          src={c.heroImage}
          alt="Campaign"
          label={c.brandName}
          className="absolute inset-0 w-full h-full object-cover opacity-85 animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/40" />
        {/* spinning badge */}
        <div className="absolute top-24 right-5 md:top-28 md:right-10 w-24 h-24 md:w-32 md:h-32">
          <div className="spin-slow w-full h-full">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path id="circlePath" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
              </defs>
              <text className="fill-paper" style={{ fontSize: "11px", letterSpacing: "3px" }}>
                <textPath href="#circlePath">{c.heroBadge}</textPath>
              </text>
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-paper text-xl">
            ✦
          </div>
        </div>

        <div className="relative h-full mx-auto max-w-site px-4 md:px-8 flex flex-col justify-end pb-14 md:pb-20">
          <p className="label text-paper/80 animate-fadeUp">{c.heroEyebrow}</p>
          <h1 className="font-mega text-paper uppercase h-hero mt-3">
            <span className="block overflow-hidden">
              <span className="clip-reveal block" style={{ animationDelay: "80ms" }}>
                {c.heroTitle1}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="clip-reveal block" style={{ animationDelay: "220ms" }}>
                {c.heroTitle2}
              </span>
            </span>
          </h1>
          <p
            className="text-paper/85 mt-5 max-w-md text-sm md:text-base animate-fadeUp"
            style={{ animationDelay: "420ms" }}
          >
            {c.heroSubtitle}
          </p>
          <div
            className="mt-8 flex flex-wrap gap-3 animate-fadeUp"
            style={{ animationDelay: "520ms" }}
          >
            <Link href={c.heroCtaPrimaryHref || "/shop"} className="btn btn-light">
              {c.heroCtaPrimaryText}
            </Link>
            <Link href={c.heroCtaSecondaryHref || "/shop"} className="btn btn-ghost-light">
              {c.heroCtaSecondaryText}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-paper/70">
          <span className="label">Scroll</span>
          <span className="scroll-cue text-lg leading-none">↓</span>
        </div>
      </section>

      {/* ===================== STATEMENT MARQUEE ===================== */}
      <section className="bg-ink text-paper py-7 md:py-12 overflow-hidden space-y-1 md:space-y-2">
        <div className="flex whitespace-nowrap animate-marqueeFast">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="font-mega uppercase h-mega mx-5 flex items-center gap-5">
              {c.marqueeA}
              <span className="text-paper/30">✦</span>
            </span>
          ))}
        </div>
        <div className="flex whitespace-nowrap animate-marqueeRev">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-mega uppercase h-mega mx-5 flex items-center gap-5 text-transparent"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}
            >
              {c.marqueeB}
              <span style={{ WebkitTextStroke: "0" }} className="text-paper/30">
                ✦
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* ===================== CATEGORY BLOCKS ===================== */}
      <section className="mx-auto max-w-site px-4 md:px-8 py-14 md:py-24">
        <Reveal className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p className="label text-ash">{c.catEyebrow}</p>
            <h2 className="font-display font-extrabold uppercase tracking-tightest h-section mt-1">
              {c.catTitle}
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-3 md:gap-5 md:grid-cols-3">
          {[
            {
              title: "Women",
              href: "/shop?category=Women",
              img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80",
            },
            {
              title: "Men",
              href: "/shop?category=Men",
              img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
            },
            {
              title: "Accessories",
              href: "/shop?category=Accessories",
              img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
            },
          ].map((cat, i) => (
            <Reveal key={cat.title} delay={i * 90}>
              <CategoryTile {...cat} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== TRENDING ===================== */}
      <section className="mx-auto max-w-site px-4 md:px-8 pb-16 md:pb-24">
        <Reveal className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <p className="label text-ash">{c.trendEyebrow}</p>
            <h2 className="font-display font-extrabold uppercase tracking-tightest h-section mt-1">
              {c.trendTitle}
            </h2>
          </div>
          <Link href="/shop" className="btn btn-outline hidden md:inline-flex">
            See all
          </Link>
        </Reveal>
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
        <Link
          href="/shop"
          className="btn btn-outline w-full mt-10 md:hidden"
        >
          See all products
        </Link>
      </section>

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
          className="bg-ink text-paper flex flex-col justify-center px-6 md:px-16 py-16 md:py-0"
        >
          <p className="label text-paper/70">{c.edEyebrow}</p>
          <h2 className="font-mega uppercase h-section mt-3 leading-[0.9]">
            {c.edTitle1}
            <br />
            {c.edTitle2}
          </h2>
          <p className="text-paper/80 mt-5 max-w-md text-sm md:text-base">
            {c.edBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={c.edCta1Href || "/shop"} className="btn btn-light">
              {c.edCta1Text}
            </Link>
            <Link href={c.edCta2Href || "/reels"} className="btn btn-ghost-light">
              {c.edCta2Text}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ===================== NEW IN ===================== */}
      <section className="mx-auto max-w-site px-4 md:px-8 py-16 md:py-24">
        <Reveal className="flex items-end justify-between mb-8 md:mb-10">
          <h2 className="font-display font-extrabold uppercase tracking-tightest h-section">
            {c.newInTitle}
          </h2>
          <Link
            href="/shop?collection=New"
            className="btn btn-outline hidden md:inline-flex"
          >
            See all
          </Link>
        </Reveal>
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
          ].map(([t, s], i) => (
            <div key={t} className={`py-8 px-4 md:px-6 ${i >= 2 ? "" : ""}`}>
              <div className="font-display font-bold uppercase tracking-tightest text-sm md:text-base">
                {t}
              </div>
              <div className="label text-ash mt-1 normal-case tracking-normal">
                {s}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CategoryTile({ title, href, img }) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden bg-smoke"
    >
      <div className="aspect-[3/4] md:aspect-[4/5]">
        <SafeImage
          src={img}
          alt={title}
          label={title}
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex items-end justify-between">
        <h3 className="font-mega uppercase text-paper text-3xl md:text-5xl leading-none">
          {title}
        </h3>
        <span className="label text-paper translate-y-0 md:translate-y-2 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition">
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
