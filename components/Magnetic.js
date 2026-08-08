"use client";

import { useRef } from "react";

/**
 * Wraps a child so it drifts toward the cursor while hovered (desktop only).
 * strength = px of max travel.
 */
export default function Magnetic({ children, strength = 22, className = "" }) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(x / r.width) * strength}px, ${
      (y / r.height) * strength
    }px)`;
  }
  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`magnetic transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </span>
  );
}
