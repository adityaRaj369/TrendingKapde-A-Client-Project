"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";
import { CATEGORIES } from "@/lib/seed";

const SORTS = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  newest: "Newest",
};

export default function ShopClient() {
  const { products, hydrated } = useStore();
  const params = useSearchParams();
  const category = params.get("category") || "";
  const collection = params.get("collection") || "";
  const q = params.get("q") || "";

  const [sort, setSort] = useState("featured");
  const [activeCat, setActiveCat] = useState(category);

  const filtered = useMemo(() => {
    let list = [...products];
    const cat = activeCat || category;
    if (cat && cat !== "__all__") list = list.filter((p) => p.category === cat);
    if (collection) list = list.filter((p) => p.collection === collection);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s)
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "newest") list.sort((a, b) => b.createdAt - a.createdAt);
    return list;
  }, [products, activeCat, category, collection, q, sort]);

  const heading = q
    ? `Results for “${q}”`
    : collection
    ? `${collection} In`
    : (activeCat || category) || "All Products";

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-10 md:py-14">
      <div className="mb-8">
        <p className="label text-ash">Shop</p>
        <h1 className="font-display font-extrabold uppercase tracking-tightest h-section mt-1">
          {heading}
        </h1>
      </div>

      {/* filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-4 mb-10 sticky top-16 md:top-20 bg-paper/95 backdrop-blur z-30">
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={
              (activeCat || category) === "" ||
              (activeCat || category) === "__all__"
            }
            onClick={() => setActiveCat("__all__")}
            label="All"
          />
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c}
              active={(activeCat || category) === c}
              onClick={() => setActiveCat(c)}
              label={c}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="label text-ash tabular-nums">
            {filtered.length} items
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="label bg-transparent border border-line px-3 py-2 pr-8 outline-none cursor-pointer appearance-none hover:border-ink transition"
            >
              {Object.entries(SORTS).map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs">
              ▾
            </span>
          </div>
        </div>
      </div>

      {hydrated ? (
        <ProductGrid products={filtered} />
      ) : (
        <div className="py-24 text-center label text-ash">Loading…</div>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`label px-4 py-2 border transition ${
        active
          ? "bg-ink text-paper border-ink"
          : "border-line text-ink hover:border-ink"
      }`}
    >
      {label}
    </button>
  );
}
