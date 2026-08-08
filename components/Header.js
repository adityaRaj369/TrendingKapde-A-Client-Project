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
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href) => {
    const base = href.split("?")[0];
    return base === "/" ? pathname === "/" : pathname === base;
  };

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // lock body scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function submitSearch(e) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
    setQ("");
  }

  return (
    <>
    <header
      className={`sticky top-0 z-50 bg-paper/90 backdrop-blur-md transition-[border,box-shadow] ${
        scrolled ? "border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.02)]" : "border-b border-transparent"
      }`}
    >
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className="mx-auto max-w-site px-4 md:px-8">
        <div className="flex items-center justify-between h-14 md:h-[72px] gap-3">
          {/* left */}
          <div className="flex items-center gap-7 flex-1">
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden -ml-1 p-2"
            >
              <Burger />
            </button>
            <nav className="hidden lg:flex items-center gap-7">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  className={`label hover-underline transition-colors ${
                    isActive(n.href) ? "text-ink" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* wordmark */}
          <Link href="/" className="shrink-0 select-none" aria-label="Home">
            <span className="font-display font-extrabold tracking-tightest text-base sm:text-lg md:text-2xl uppercase whitespace-nowrap">
              {brand}
            </span>
          </Link>

          {/* right */}
          <div className="flex items-center gap-4 md:gap-5 flex-1 justify-end">
            <button
              aria-label="Search"
              className="label hidden md:inline hover-underline"
              onClick={() => setSearchOpen((v) => !v)}
            >
              Search
            </button>
            <Link href="/wishlist" className="label hidden md:inline hover-underline">
              Saved{wishlist.length ? ` (${wishlist.length})` : ""}
            </Link>
            <Link href="/admin" className="label hidden md:inline hover-underline">
              Admin
            </Link>
            <button
              aria-label="Search"
              className="md:hidden p-1"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <SearchIcon />
            </button>
            <Link href="/cart" className="label flex items-center gap-1 hover-underline">
              <BagIcon />
              <span className="tabular-nums">{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* search drawer */}
      {searchOpen && (
        <div className="border-t border-line bg-paper animate-fadeUp">
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
              className="flex-1 bg-transparent outline-none text-base md:text-lg tracking-wide placeholder:text-ash"
            />
            <button type="submit" className="btn btn-dark !py-2.5 !px-5">
              Go
            </button>
          </form>
        </div>
      )}

    </header>

    {/* MOBILE DRAWER — sibling of <header> so `fixed` anchors to the viewport
        (a blurred/filtered ancestor would otherwise become its containing block) */}
      <div
        className={`lg:hidden fixed inset-0 z-[70] transition ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink/40 transition-opacity ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute top-0 left-0 h-full w-[86%] max-w-sm bg-paper flex flex-col transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 h-14 border-b border-line">
            <span className="font-display font-extrabold tracking-tightest uppercase">
              Menu
            </span>
            <button aria-label="Close" onClick={() => setMenuOpen(false)} className="p-2 text-2xl leading-none">
              ×
            </button>
          </div>
          <nav className="flex flex-col px-5 py-2 overflow-y-auto">
            {NAV.map((n, i) => (
              <Link
                key={n.label}
                href={n.href}
                className="py-4 border-b border-line font-display text-2xl font-bold uppercase tracking-tightest"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {n.label}
              </Link>
            ))}
            <Link href="/wishlist" className="py-4 border-b border-line label">
              Saved{wishlist.length ? ` (${wishlist.length})` : ""}
            </Link>
            <Link href="/cart" className="py-4 border-b border-line label">
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
      <span className="block h-[2px] bg-ink" />
      <span className="block h-[2px] bg-ink w-4/5" />
      <span className="block h-[2px] bg-ink" />
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
