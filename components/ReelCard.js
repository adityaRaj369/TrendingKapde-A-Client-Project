"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useStore, formatPrice } from "@/lib/store";
import SafeImage from "./SafeImage";

export default function ReelCard({ reel, muted, onToggleMute }) {
  const { getProduct } = useStore();
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [failed, setFailed] = useState(false);
  const product = reel.productId ? getProduct(reel.productId) : null;

  // Autoplay when the reel scrolls into view, pause when it leaves.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          el.play().catch(() => {});
          setPlaying(true);
        } else {
          el.pause();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="relative h-full w-full flex items-center justify-center snap-start">
      <div className="relative h-full aspect-[9/16] max-h-full bg-ink overflow-hidden">
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
            muted={muted}
            loop
            playsInline
            onError={() => setFailed(true)}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />
        )}

        {/* gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />

        {/* play indicator */}
        {!playing && !failed && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Play"
          >
            <span className="w-16 h-16 rounded-full bg-paper/90 text-ink flex items-center justify-center text-2xl">
              ▶
            </span>
          </button>
        )}

        {/* mute */}
        <button
          onClick={onToggleMute}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-ink/50 text-paper flex items-center justify-center backdrop-blur"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? "🔇" : "🔊"}
        </button>

        {/* caption + handle */}
        <div className="absolute left-0 right-0 bottom-0 p-5 text-paper">
          <div className="label text-paper/90">{reel.handle}</div>
          <h3 className="font-display text-xl font-semibold mt-1">
            {reel.title}
          </h3>
          {reel.caption && (
            <p className="text-sm text-paper/85 mt-1 line-clamp-2">
              {reel.caption}
            </p>
          )}

          {product && (
            <Link
              href={`/product/${product.id}`}
              className="mt-4 flex items-center gap-3 bg-paper/95 text-ink p-2 pr-4 max-w-xs hover:bg-paper transition"
            >
              <span className="w-12 h-14 bg-smoke overflow-hidden shrink-0">
                <SafeImage
                  src={product.images?.[0]}
                  alt={product.name}
                  label={product.name}
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-sm truncate">{product.name}</span>
                <span className="label text-ash">
                  {formatPrice(product.price)} · Shop →
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
