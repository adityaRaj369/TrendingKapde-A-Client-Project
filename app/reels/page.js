"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";
import ReelCard from "@/components/ReelCard";

export default function ReelsPage() {
  const { reels, hydrated } = useStore();
  const [muted, setMuted] = useState(true);

  return (
    <div className="bg-smoke">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 pt-8">
        <p className="label text-ash">Watch &amp; shop</p>
        <div className="flex items-end justify-between">
          <h1 className="font-display font-extrabold uppercase tracking-tightest h-section mt-1">
            Reels
          </h1>
          <Link href="/admin" className="label hover-underline">
            + Upload a reel
          </Link>
        </div>
        <p className="text-sm text-ash mt-2 mb-6">
          Scroll through the feed. Tap a video to pause, tap the tag to shop the look.
        </p>
      </div>

      {!hydrated ? (
        <div className="py-32 text-center label text-ash">Loading reels…</div>
      ) : reels.length ? (
        <div className="h-[calc(100vh-160px)] overflow-y-scroll snap-y snap-mandatory no-scrollbar pb-8">
          {reels.map((reel) => (
            <div key={reel.id} className="h-full">
              <ReelCard
                reel={reel}
                muted={muted}
                onToggleMute={() => setMuted((m) => !m)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center">
          <p className="text-ash">No reels yet.</p>
          <Link
            href="/admin"
            className="inline-block mt-6 bg-ink text-paper label px-8 py-4 hover:bg-ink/90 transition"
          >
            Add the first reel
          </Link>
        </div>
      )}
    </div>
  );
}
