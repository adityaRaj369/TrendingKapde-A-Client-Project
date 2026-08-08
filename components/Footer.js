"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

const cols = [
  {
    title: "Shop",
    links: [
      ["New In", "/shop?collection=New"],
      ["Women", "/shop?category=Women"],
      ["Men", "/shop?category=Men"],
      ["Accessories", "/shop?category=Accessories"],
      ["Reels", "/reels"],
    ],
  },
  {
    title: "Help",
    links: [
      ["Shipping", "#"],
      ["Returns", "#"],
      ["Size Guide", "#"],
      ["Contact", "#"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "#"],
      ["Sustainability", "#"],
      ["Careers", "#"],
      ["Admin", "/admin"],
    ],
  },
];

export default function Footer() {
  const { content } = useStore();
  const brand = content?.brandName || "Trending Kapde Wala";
  const tagline =
    content?.footerTagline ||
    "Modern, minimal fashion in black & white. Considered essentials and of-the-moment drops.";
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="font-display text-xl font-extrabold uppercase tracking-tightest">
              {brand}
            </div>
            <p className="mt-4 text-sm text-ash leading-relaxed max-w-xs">
              {tagline}
            </p>
            <form className="mt-6 flex border-b border-ink">
              <input
                placeholder="Email address"
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-ash"
              />
              <button className="label" type="button">
                Join →
              </button>
            </form>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="label text-ink mb-4">{c.title}</h4>
              <ul className="space-y-2">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-ash hover:text-ink transition"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="label text-ash">
            © {new Date().getFullYear()} {brand}
          </span>
          <span className="label text-ash">
            Demo store · Data stored in your browser
          </span>
        </div>
      </div>
    </footer>
  );
}
