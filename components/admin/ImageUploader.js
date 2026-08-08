"use client";

import { useRef, useState } from "react";
import SafeImage from "@/components/SafeImage";

/**
 * Collects images as either base64 (file upload) or pasted URLs.
 * value: string[]  onChange: (string[]) => void
 */
export default function ImageUploader({ value = [], onChange }) {
  const inputRef = useRef(null);
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  async function handleFiles(files) {
    setBusy(true);
    const arr = Array.from(files).slice(0, 6);
    const encoded = [];
    for (const f of arr) {
      if (!f.type.startsWith("image/")) continue;
      encoded.push(await readFile(f));
    }
    onChange([...value, ...encoded]);
    setBusy(false);
  }

  function addUrl() {
    const u = url.trim();
    if (!u) return;
    onChange([...value, u]);
    setUrl("");
  }

  function remove(i) {
    onChange(value.filter((_, idx) => idx !== i));
  }

  function move(i, dir) {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className="border border-dashed border-ash/60 p-6 text-center cursor-pointer hover:border-ink transition"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <p className="label">
          {busy ? "Reading images…" : "Click or drop images here"}
        </p>
        <p className="label text-ash mt-1">Stored in your browser (base64)</p>
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
          placeholder="…or paste an image URL"
          className="flex-1 border border-line px-3 py-2 text-sm outline-none focus:border-ink"
        />
        <button
          type="button"
          onClick={addUrl}
          className="label border border-ink px-4 hover:bg-ink hover:text-paper transition"
        >
          Add URL
        </button>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-4">
          {value.map((src, i) => (
            <div key={i} className="relative group aspect-[3/4] bg-smoke overflow-hidden">
              <SafeImage src={src} alt="" label="image" className="w-full h-full object-cover" />
              {i === 0 && (
                <span className="absolute top-1 left-1 label bg-paper/90 px-1">
                  Cover
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex opacity-0 group-hover:opacity-100 transition">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  className="flex-1 bg-ink/80 text-paper text-xs py-1"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="flex-1 bg-ink/80 text-paper text-xs py-1"
                >
                  ✕
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  className="flex-1 bg-ink/80 text-paper text-xs py-1"
                >
                  ›
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
