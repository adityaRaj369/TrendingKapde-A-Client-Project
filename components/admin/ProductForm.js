"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { CATEGORIES } from "@/lib/seed";

const COLLECTIONS = ["New", "Trending", "Classic", "Sale"];

const SIZE_PRESETS = {
  Clothing: ["XS", "S", "M", "L", "XL", "XXL"],
  Waist: ["28", "30", "32", "34", "36", "38"],
  OneSize: ["One Size"],
};

export default function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({
    name: initial?.name || "",
    price: initial?.price ?? "",
    category: initial?.category || "Women",
    collection: initial?.collection || "New",
    description: initial?.description || "",
    sizes: initial?.sizes || ["S", "M", "L"],
    images: initial?.images || [],
  }));
  const [sizeInput, setSizeInput] = useState("");
  const [error, setError] = useState("");

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function toggleSize(s) {
    set(
      "sizes",
      form.sizes.includes(s)
        ? form.sizes.filter((x) => x !== s)
        : [...form.sizes, s]
    );
  }

  function addCustomSize() {
    const s = sizeInput.trim();
    if (s && !form.sizes.includes(s)) set("sizes", [...form.sizes, s]);
    setSizeInput("");
  }

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please enter a product name.");
    if (form.price === "" || Number(form.price) < 0)
      return setError("Please enter a valid price.");
    if (!form.sizes.length) return setError("Add at least one size.");
    setError("");
    onSave({ ...form, price: Number(form.price) });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <Field label="Product name">
        <input
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Oversized Wool Coat"
          className="w-full border border-line px-3 py-2.5 outline-none focus:border-ink"
        />
      </Field>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Price (₹)">
          <input
            type="number"
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="4990"
            className="w-full border border-line px-3 py-2.5 outline-none focus:border-ink"
          />
        </Field>
        <Field label="Category">
          <Select
            value={form.category}
            onChange={(v) => set("category", v)}
            options={CATEGORIES}
          />
        </Field>
        <Field label="Collection">
          <Select
            value={form.collection}
            onChange={(v) => set("collection", v)}
            options={COLLECTIONS}
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          placeholder="Fabric, fit, styling notes…"
          className="w-full border border-line px-3 py-2.5 outline-none focus:border-ink resize-none"
        />
      </Field>

      <Field label="Sizes">
        <div className="flex flex-wrap gap-2 mb-3">
          {Object.entries(SIZE_PRESETS).map(([group, sizes]) => (
            <div key={group} className="flex flex-wrap gap-1">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSize(s)}
                  className={`label px-3 py-1.5 border transition ${
                    form.sizes.includes(s)
                      ? "bg-ink text-paper border-ink"
                      : "border-line hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addCustomSize())
            }
            placeholder="Add custom size"
            className="flex-1 border border-line px-3 py-2 text-sm outline-none focus:border-ink"
          />
          <button
            type="button"
            onClick={addCustomSize}
            className="label border border-ink px-4 hover:bg-ink hover:text-paper transition"
          >
            Add
          </button>
        </div>
        {form.sizes.length > 0 && (
          <p className="label text-ash mt-2">
            Selected: {form.sizes.join(", ")}
          </p>
        )}
      </Field>

      <Field label="Images">
        <ImageUploader value={form.images} onChange={(v) => set("images", v)} />
      </Field>

      {error && <p className="label text-ink bg-smoke px-3 py-2">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-ink text-paper label px-8 py-3.5 hover:bg-ink/90 transition"
        >
          {initial ? "Save changes" : "Add product"}
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

function Select({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line px-3 py-2.5 pr-8 outline-none focus:border-ink appearance-none bg-paper cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs">
        ▾
      </span>
    </div>
  );
}
