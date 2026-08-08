"use client";

import Link from "next/link";
import { useState } from "react";
import SafeImage from "./SafeImage";
import { useStore, formatPrice } from "@/lib/store";

export default function ProductCard({ product }) {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const saved = wishlist.includes(product.id);
  const img = product.images?.[0];
  const alt = product.images?.[1] || product.images?.[0];

  function quickAdd(e) {
    e.preventDefault();
    addToCart(product.id, product.sizes?.[0] || "One Size", 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div
      className="group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-smoke">
          <SafeImage
            src={hover && alt ? alt : img}
            alt={product.name}
            label={product.name}
            className="w-full h-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />

          {product.collection && (
            <span className="absolute top-3 left-3 label text-ink bg-paper/85 backdrop-blur px-2.5 py-1">
              {product.collection}
            </span>
          )}

          <button
            aria-label={saved ? "Remove from saved" : "Save"}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className="absolute top-2.5 right-2.5 w-9 h-9 flex items-center justify-center bg-paper/80 text-ink hover:bg-paper transition rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <Heart filled={saved} />
          </button>

          {/* quick add — always shown on touch, slides up on hover for desktop */}
          <div className="absolute inset-x-0 bottom-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <button
              onClick={quickAdd}
              className="w-full bg-ink text-paper label py-3 md:py-3.5 hover:bg-ink/90 flex items-center justify-center gap-2"
            >
              {added ? "Added ✓" : "Add to bag"}
            </button>
          </div>
        </div>
      </Link>

      <div className="pt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href={`/product/${product.id}`}
            className="block text-[13px] md:text-sm font-medium leading-snug hover-underline"
          >
            {product.name}
          </Link>
          <div className="label text-ash mt-1">{product.category}</div>
        </div>
        <div className="text-[13px] md:text-sm tabular-nums font-medium whitespace-nowrap">
          {formatPrice(product.price)}
        </div>
      </div>
    </div>
  );
}

function Heart({ filled }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M12 21s-7.5-4.7-10-9.3C.6 8.9 2 5.5 5.2 5.1 7 4.9 8.6 5.9 12 8.5c3.4-2.6 5-3.6 6.8-3.4 3.2.4 4.6 3.8 3.2 6.6C19.5 16.3 12 21 12 21z" />
    </svg>
  );
}
