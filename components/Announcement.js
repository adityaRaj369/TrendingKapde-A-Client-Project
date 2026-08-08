"use client";

import { useStore } from "@/lib/store";
import { DEFAULT_CONTENT } from "@/lib/content";

export default function Announcement() {
  const { content } = useStore();
  const items =
    content?.announcements?.length
      ? content.announcements
      : DEFAULT_CONTENT.announcements;
  const loop = [...items, ...items, ...items];
  return (
    <div className="bg-ink text-paper overflow-hidden border-b border-white/10">
      <div className="flex whitespace-nowrap animate-marquee py-[7px]">
        {loop.map((t, i) => (
          <span key={i} className="label text-paper/85 flex items-center">
            <span className="mx-6">{t}</span>
            <span className="text-paper/35">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
