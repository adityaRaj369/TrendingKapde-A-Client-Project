"use client";

import { useState } from "react";

/**
 * Plain <img> with a graceful monochrome fallback so the UI stays clean
 * even if a remote (Unsplash / user-pasted) image fails to load.
 */
export default function SafeImage({ src, alt = "", className = "", label }) {
  const [failed, setFailed] = useState(false);
  const showFallback = !src || failed;

  if (showFallback) {
    return (
      <div
        className={`flex items-center justify-center bg-smoke text-ash ${className}`}
      >
        <span className="label px-4 text-center leading-relaxed">
          {label || alt || "TRENDING KAPDE WALA"}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
