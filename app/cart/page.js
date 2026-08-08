"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore, formatPrice } from "@/lib/store";
import SafeImage from "@/components/SafeImage";

export default function CartPage() {
  const {
    cartDetailed,
    subtotal,
    setCartQty,
    removeFromCart,
    clearCart,
    hydrated,
  } = useStore();
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal > 2999 || subtotal === 0 ? 0 : 149;
  const total = subtotal + shipping;

  if (!hydrated) {
    return <div className="py-32 text-center label text-ash">Loading bag…</div>;
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-28 text-center">
        <div className="w-16 h-16 mx-auto rounded-full border border-ink flex items-center justify-center text-2xl">
          ✓
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold mt-6">
          Order placed
        </h1>
        <p className="text-ash mt-3">
          Thanks for shopping the demo. This is a front-end only checkout — no
          payment was taken.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-8 bg-ink text-paper label px-8 py-4 hover:bg-ink/90 transition"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!cartDetailed.length) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-28 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-semibold">
          Your bag is empty
        </h1>
        <p className="text-ash mt-3">
          Add a few pieces to get started.
        </p>
        <Link
          href="/shop"
          className="inline-block mt-8 bg-ink text-paper label px-8 py-4 hover:bg-ink/90 transition"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-10 md:py-14">
      <div className="flex items-end justify-between mb-10">
        <h1 className="font-display font-extrabold uppercase tracking-tightest h-section">
          Shopping Bag
        </h1>
        <button onClick={clearCart} className="label text-ash hover:text-ink">
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12">
        {/* lines */}
        <div className="divide-y divide-line border-y border-line">
          {cartDetailed.map((line) => (
            <div
              key={`${line.productId}-${line.size}`}
              className="flex gap-4 md:gap-6 py-6"
            >
              <Link
                href={`/product/${line.productId}`}
                className="w-24 md:w-28 shrink-0 aspect-[3/4] bg-smoke overflow-hidden"
              >
                <SafeImage
                  src={line.product.images?.[0]}
                  alt={line.product.name}
                  label={line.product.name}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-3">
                  <Link
                    href={`/product/${line.productId}`}
                    className="text-sm md:text-base hover-underline"
                  >
                    {line.product.name}
                  </Link>
                  <span className="text-sm tabular-nums">
                    {formatPrice(line.lineTotal)}
                  </span>
                </div>
                <p className="label text-ash mt-1">
                  {line.product.category} · Size {line.size}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center border border-line">
                    <button
                      onClick={() =>
                        setCartQty(line.productId, line.size, line.qty - 1)
                      }
                      className="w-9 h-9 hover:bg-smoke"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="w-9 text-center tabular-nums text-sm">
                      {line.qty}
                    </span>
                    <button
                      onClick={() =>
                        setCartQty(line.productId, line.size, line.qty + 1)
                      }
                      className="w-9 h-9 hover:bg-smoke"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(line.productId, line.size)}
                    className="label text-ash hover:text-ink"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* summary */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="border border-line p-6">
            <h2 className="label mb-5">Order Summary</h2>
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row
              label="Shipping"
              value={shipping === 0 ? "Free" : formatPrice(shipping)}
            />
            {subtotal > 0 && subtotal <= 2999 && (
              <p className="label text-ash mt-2">
                Add {formatPrice(3000 - subtotal)} for free shipping
              </p>
            )}
            <div className="border-t border-line mt-4 pt-4 flex justify-between text-base">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
            <button
              onClick={() => {
                setPlaced(true);
                clearCart();
                window.scrollTo({ top: 0 });
              }}
              className="btn btn-dark w-full mt-6"
            >
              Checkout
            </button>
            <Link
              href="/shop"
              className="block text-center label mt-3 hover-underline"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-ash">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
