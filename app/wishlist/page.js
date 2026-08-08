"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";

export default function WishlistPage() {
  const { products, wishlist, hydrated } = useStore();
  const saved = useMemo(
    () => products.filter((p) => wishlist.includes(p.id)),
    [products, wishlist]
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-10 md:py-14">
      <div className="mb-10">
        <p className="label text-ash">Your edit</p>
        <h1 className="font-display font-extrabold uppercase tracking-tightest h-section mt-1">
          Saved Items
        </h1>
      </div>
      {!hydrated ? (
        <div className="py-24 text-center label text-ash">Loading…</div>
      ) : saved.length ? (
        <ProductGrid products={saved} />
      ) : (
        <div className="py-24 text-center">
          <p className="text-ash">Nothing saved yet.</p>
          <Link
            href="/shop"
            className="inline-block mt-6 bg-ink text-paper label px-8 py-4 hover:bg-ink/90 transition"
          >
            Explore the shop
          </Link>
        </div>
      )}
    </div>
  );
}
