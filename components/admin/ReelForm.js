"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";

export default function ReelForm({ onSave, onCancel }) {
  const { products } = useStore();
  const [form, setForm] = useState({
    title: "",
    handle: "@trendingkapdewala",
    caption: "",
    videoUrl: "",
    poster: "",
    productId: "",
  });
  const [error, setError] = useState("");

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function readFile(file, key) {
    const reader = new FileReader();
    reader.onload = () => set(key, reader.result);
    reader.readAsDataURL(file);
  }

  function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return setError("Add a title.");
    if (!form.videoUrl.trim()) return setError("Add a video URL or upload a file.");
    setError("");
    onSave(form);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <Field label="Title">
        <input
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="AW Campaign — Tailoring"
          className="w-full border border-line px-3 py-2.5 outline-none focus:border-ink"
        />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Handle">
          <input
            value={form.handle}
            onChange={(e) => set("handle", e.target.value)}
            className="w-full border border-line px-3 py-2.5 outline-none focus:border-ink"
          />
        </Field>
        <Field label="Tag a product (optional)">
          <select
            value={form.productId}
            onChange={(e) => set("productId", e.target.value)}
            className="w-full border border-line px-3 py-2.5 outline-none focus:border-ink bg-paper cursor-pointer"
          >
            <option value="">— none —</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Caption">
        <input
          value={form.caption}
          onChange={(e) => set("caption", e.target.value)}
          placeholder="The new tailoring edit. #NewIn"
          className="w-full border border-line px-3 py-2.5 outline-none focus:border-ink"
        />
      </Field>

      <Field label="Video URL (.mp4)">
        <input
          value={form.videoUrl.startsWith("data:") ? "" : form.videoUrl}
          onChange={(e) => set("videoUrl", e.target.value)}
          placeholder="https://…/reel.mp4"
          className="w-full border border-line px-3 py-2.5 outline-none focus:border-ink"
        />
        <div className="mt-2 label text-ash">or upload a short clip:</div>
        <input
          type="file"
          accept="video/*"
          onChange={(e) =>
            e.target.files?.[0] && readFile(e.target.files[0], "videoUrl")
          }
          className="mt-1 text-sm"
        />
        {form.videoUrl.startsWith("data:") && (
          <p className="label text-ink mt-1">Video file loaded ✓</p>
        )}
      </Field>

      <Field label="Poster image URL (optional)">
        <input
          value={form.poster.startsWith("data:") ? "" : form.poster}
          onChange={(e) => set("poster", e.target.value)}
          placeholder="https://…/poster.jpg"
          className="w-full border border-line px-3 py-2.5 outline-none focus:border-ink"
        />
      </Field>

      {error && <p className="label text-ink bg-smoke px-3 py-2">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-ink text-paper label px-8 py-3.5 hover:bg-ink/90 transition"
        >
          Add reel
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-line label px-8 py-3.5 hover:border-ink transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="label block mb-2">{label}</span>
      {children}
    </label>
  );
}
