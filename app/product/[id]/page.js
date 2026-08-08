"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useStore, formatPrice } from "@/lib/store";
import SafeImage from "@/components/SafeImage";
import ProductCard from "@/components/ProductCard";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, hydrated, addToCart, toggleWishlist, wishlist } =
    useStore();

  const product = useMemo(
    () => products.find((p) => p.id === id),
    [products, id]
  );

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState("");
  const [added, setAdded] = useState(false);
  const [err, setErr] = useState(false);
  const [openDesc, setOpenDesc] = useState(true);

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  if (hydrated && !product) {
    return (
      <div className="py-32 text-center">
        <p className="font-display text-2xl">Product not found</p>
        <Link href="/shop" className="label hover-underline inline-block mt-4">
          ← Back to shop
        </Link>
      </div>
    );
  }

  if (!product) {
    return <div className="py-32 text-center label text-ash">Loading…</div>;
  }

  const saved = wishlist.includes(product.id);
  const images = product.images?.length ? product.images : [null];

  function handleAdd() {
    if (!size) {
      setErr(true);
      return;
    }
    addToCart(product.id, size, 1);
    setErr(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-6 md:py-10">
      {/* breadcrumb */}
      <div className="label text-ash mb-6 flex gap-2">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-ink">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-ink truncate">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* gallery */}
        <div className="flex gap-4">
          <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-[3/4] overflow-hidden border ${
                  activeImg === i ? "border-ink" : "border-line"
                }`}
              >
                <SafeImage
                  src={src}
                  alt={`${product.name} ${i + 1}`}
                  label={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          <div className="flex-1">
            <div className="aspect-[3/4] overflow-hidden bg-smoke">
              <SafeImage
                src={images[activeImg]}
                alt={product.name}
                label={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* mobile thumbs */}
            <div className="flex md:hidden gap-2 mt-3">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 aspect-[3/4] overflow-hidden border ${
                    activeImg === i ? "border-ink" : "border-line"
                  }`}
                >
                  <SafeImage
                    src={src}
                    alt=""
                    label={product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* details */}
        <div className="md:pt-4 md:sticky md:top-24 self-start">
          {product.collection && (
            <span className="label text-ash">{product.collection}</span>
          )}
          <h1 className="font-display font-extrabold uppercase tracking-tightest text-3xl md:text-4xl mt-2 leading-[0.95]">
            {product.name}
          </h1>
          <div className="text-xl mt-3 tabular-nums">
            {formatPrice(product.price)}
          </div>
          <p className="label text-ash mt-1">MRP incl. of all taxes</p>

          {/* sizes */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="label">Size</span>
              <span className="label text-ash hover-underline cursor-pointer">
                Size guide
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setErr(false);
                  }}
                  className={`min-w-[52px] px-4 py-3 border label transition ${
                    size === s
                      ? "border-ink bg-ink text-paper"
                      : "border-line hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {err && (
              <p className="label text-ink mt-3">Please select a size</p>
            )}
          </div>

          {/* actions */}
          <div className="mt-8 flex gap-3">
            <button onClick={handleAdd} className="btn btn-dark flex-1">
              {added ? "Added to bag ✓" : "Add to bag"}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-14 border flex items-center justify-center transition ${
                saved ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
              }`}
              aria-label="Save"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21s-7.5-4.7-10-9.3C.6 8.9 2 5.5 5.2 5.1 7 4.9 8.6 5.9 12 8.5c3.4-2.6 5-3.6 6.8-3.4 3.2.4 4.6 3.8 3.2 6.6C19.5 16.3 12 21 12 21z" />
              </svg>
            </button>
          </div>

          {added && (
            <Link
              href="/cart"
              className="mt-3 block text-center border border-ink label py-3 hover:bg-ink hover:text-paper transition"
            >
              Go to bag →
            </Link>
          )}

          {/* description accordion */}
          <div className="mt-10 border-t border-line">
            <button
              onClick={() => setOpenDesc((v) => !v)}
              className="w-full flex items-center justify-between py-4 label"
            >
              Description
              <span>{openDesc ? "−" : "+"}</span>
            </button>
            {openDesc && (
              <p className="text-sm text-ink/80 leading-relaxed pb-5">
                {product.description}
              </p>
            )}
          </div>
          <div className="border-t border-line py-4 label flex justify-between">
            Shipping &amp; Returns <span>+</span>
          </div>
          <div className="border-t border-b border-line py-4 label flex justify-between">
            Composition &amp; Care <span>+</span>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-20 md:mt-28">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
