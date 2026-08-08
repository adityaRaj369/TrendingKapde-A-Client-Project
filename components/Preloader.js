"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";

// module-level flag so the intro plays once per full page load,
// not on client-side navigations within the same session
let PLAYED = false;

export default function Preloader() {
  const { content } = useStore();
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (PLAYED) {
      setGone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setDone(true), reduce ? 0 : 1700);
    const t2 = setTimeout(() => {
      PLAYED = true;
      setGone(true);
      document.body.style.overflow = "";
    }, reduce ? 60 : 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  const brand = (content?.brandName || "Trending Kapde Wala").toUpperCase();
  const words = brand.split(" ");

  return (
    <div className={`preloader ${done ? "done" : ""}`} aria-hidden="true">
      <div className="text-center px-6 w-full">
        <div className="mb-4 flex items-center justify-center gap-2 opacity-0 animate-fadeUp" style={{ animationDelay: "60ms" }}>
          <span className="w-2 h-2 bg-white rounded-full" />
          <span className="label text-white/60">Loading the collection</span>
        </div>
        <h1 className="font-mega uppercase text-white flex flex-col md:flex-row md:flex-wrap md:items-end justify-center gap-x-5 lg:gap-x-8 gap-y-2 md:gap-y-0 leading-[0.95]">
          {words.map((w, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                className="clip-reveal block"
                style={{
                  animationDelay: `${120 + i * 130}ms`,
                  fontSize: "clamp(2.6rem, 8vw, 6.5rem)",
                }}
              >
                {w}
              </span>
            </span>
          ))}
        </h1>
      </div>
      <div className="preloader__bar" />
    </div>
  );
}
