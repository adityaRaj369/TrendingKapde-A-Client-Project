"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useStore, formatPrice } from "@/lib/store";
import SafeImage from "./SafeImage";
import SectionHeader from "./SectionHeader";

function ReelTile({ reel }) {
  const { getProduct } = useStore();
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const product = reel.productId ? getProduct(reel.productId) : null;

  // play only while in view (keeps things light + works on mobile)
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      href="/reels"
      className="group relative shrink-0 snap-start w-[64%] xs:w-[52%] sm:w-[40%] md:w-[26%] lg:w-[19%] aspect-[9/16] overflow-hidden bg-smoke"
    >
      {failed ? (
        <SafeImage
          src={reel.poster}
          alt={reel.title}
          label={reel.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />

      <span className="absolute top-3 left-3 flex items-center gap-1.5 label text-white">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        Reel
      </span>

      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-white">
        <div className="label text-white/70">{reel.handle}</div>
        <div className="text-sm font-medium truncate mt-0.5">{reel.title}</div>
        {product && (
          <div className="label text-white/80 mt-1 truncate">
            {product.name} · {formatPrice(product.price)}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function HomeReels({ index }) {
  const { reels } = useStore();
  if (!reels?.length) return null;

  return (
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-site px-4 md:px-8">
        <SectionHeader
          index={index}
          eyebrow="Watch &amp; shop"
          title="Reels"
          href="/reels"
          cta="Watch all"
        />
      </div>
      <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-8">
        {reels.map((r) => (
          <ReelTile key={r.id} reel={r} />
        ))}
        <div className="shrink-0 w-1" aria-hidden="true" />
      </div>
    </section>
  );
}
