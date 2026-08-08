"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

const NAV = [
  { label: "Home", href: "/" },
  { label: "New", href: "/shop?collection=New" },
  { label: "Women", href: "/shop?category=Women" },
  { label: "Men", href: "/shop?category=Men" },
  { label: "Accessories", href: "/shop?category=Accessories" },
  { label: "Reels", href: "/reels" },
];

export default function Header() {
  const { cartCount, wishlist, content } = useStore();
  const brand = content?.brandName || "Trending Kapde Wala";
  const initials = brand
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href) => {
    const base = href.split("?")[0];
    return base === "/" ? pathname === "/" : pathname === base;
  };

  function submitSearch(e) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
    setQ("");
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-black text-white">
        <div
          className="h-[3px] bg-white transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
        <div className="mx-auto max-w-site px-4 md:px-8">
          <div className="flex items-center justify-between h-14 md:h-[68px] gap-3">
            <div className="flex items-center gap-7 flex-1">
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className="lg:hidden -ml-1 p-2 active:scale-95 transition-transform"
              >
                <Burger />
              </button>
              <nav className="hidden lg:flex items-center gap-7">
                {NAV.map((n) => (
                  <Link
                    key={n.label}
                    href={n.href}
                    className={`label hover-underline-light transition-colors ${
                      isActive(n.href) ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>

            <Link
              href="/"
              className="shrink-0 select-none flex items-center gap-2 md:gap-2.5 group"
              aria-label="Home"
            >
              <span className="grid place-items-center w-8 h-8 md:w-9 md:h-9 bg-white text-black font-mega leading-none text-sm md:text-base transition-transform group-hover:-rotate-6">
                {initials}
              </span>
              <span className="hidden xs:flex flex-col leading-[0.8]">
                <span className="font-display font-extrabold uppercase tracking-tightest text-[12px] md:text-[15px] whitespace-nowrap">
                  {brand}
                </span>
                <span className="label text-white/40 text-[8px] md:text-[9px] mt-0.5">
                  Est. 2026 · Monochrome
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-4 md:gap-5 flex-1 justify-end">
              <button
                aria-label="Search"
                className="label hidden md:inline hover-underline-light"
                onClick={() => setSearchOpen((v) => !v)}
              >
                Search
              </button>
              <Link href="/wishlist" className="label hidden md:inline hover-underline-light">
                Saved{wishlist.length ? ` (${wishlist.length})` : ""}
              </Link>
              <Link href="/admin" className="label hidden md:inline hover-underline-light">
                Admin
              </Link>
              <button
                aria-label="Search"
                className="md:hidden p-1"
                onClick={() => setSearchOpen((v) => !v)}
              >
                <SearchIcon />
              </button>
              <Link href="/cart" className="label flex items-center gap-1.5 hover-underline-light">
                <BagIcon />
                <span className="tabular-nums">{cartCount}</span>
              </Link>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-white/15 bg-black animate-fadeUp">
            <form
              onSubmit={submitSearch}
              className="mx-auto max-w-site px-4 md:px-8 py-4 flex items-center gap-4"
            >
              <SearchIcon />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search coats, denim, totes…"
                className="flex-1 bg-transparent outline-none text-base md:text-lg tracking-wide placeholder:text-white/40 text-white"
              />
              <button type="submit" className="btn btn-light !py-2.5 !px-5">
                Go
              </button>
            </form>
          </div>
        )}
      </header>

      {/* MOBILE DRAWER — sibling of <header> so `fixed` anchors to the viewport */}
      <div
        className={`lg:hidden fixed inset-0 z-[70] transition ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute top-0 left-0 h-full w-[86%] max-w-sm bg-black text-white flex flex-col transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 h-14 border-b border-white/15">
            <span className="font-display font-extrabold tracking-tightest uppercase">
              {brand}
            </span>
            <button
              aria-label="Close"
              onClick={() => setMenuOpen(false)}
              className="p-2 text-2xl leading-none"
            >
              ×
            </button>
          </div>
          <nav className="flex flex-col px-5 py-2 overflow-y-auto">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className="py-4 border-b border-white/10 font-display text-2xl font-bold uppercase tracking-tightest"
              >
                {n.label}
              </Link>
            ))}
            <Link href="/wishlist" className="py-4 border-b border-white/10 label">
              Saved{wishlist.length ? ` (${wishlist.length})` : ""}
            </Link>
            <Link href="/cart" className="py-4 border-b border-white/10 label">
              Bag ({cartCount})
            </Link>
            <Link href="/admin" className="py-4 label">
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

function Burger() {
  return (
    <div className="w-6 h-6 flex flex-col justify-center gap-[6px]">
      <span className="block h-[2px] bg-white" />
      <span className="block h-[2px] bg-white w-4/5" />
      <span className="block h-[2px] bg-white" />
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
