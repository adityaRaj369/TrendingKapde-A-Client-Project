"use client";

import { useState } from "react";

const GROUPS = [
  {
    title: "Brand",
    fields: [{ key: "brandName", label: "Brand name" }],
  },
  {
    title: "Announcement bar",
    fields: [
      {
        key: "announcements",
        label: "Scrolling messages (one per line)",
        type: "list",
      },
    ],
  },
  {
    title: "Hero",
    fields: [
      { key: "heroEyebrow", label: "Eyebrow" },
      { key: "heroTitle1", label: "Headline — line 1" },
      { key: "heroTitle2", label: "Headline — line 2" },
      { key: "heroSubtitle", label: "Subtitle", type: "area" },
      { key: "heroBadge", label: "Spinning badge text" },
      { key: "heroCtaPrimaryText", label: "Primary button text" },
      { key: "heroCtaPrimaryHref", label: "Primary button link" },
      { key: "heroCtaSecondaryText", label: "Secondary button text" },
      { key: "heroCtaSecondaryHref", label: "Secondary button link" },
      { key: "heroImage", label: "Hero image URL" },
    ],
  },
  {
    title: "Statement marquee",
    fields: [
      { key: "marqueeA", label: "Row 1 word" },
      { key: "marqueeB", label: "Row 2 word (outline)" },
    ],
  },
  {
    title: "Categories section",
    fields: [
      { key: "catEyebrow", label: "Eyebrow" },
      { key: "catTitle", label: "Title" },
    ],
  },
  {
    title: "Trending section",
    fields: [
      { key: "trendEyebrow", label: "Eyebrow" },
      { key: "trendTitle", label: "Title" },
    ],
  },
  {
    title: "Editorial split",
    fields: [
      { key: "edEyebrow", label: "Eyebrow" },
      { key: "edTitle1", label: "Title — line 1" },
      { key: "edTitle2", label: "Title — line 2" },
      { key: "edBody", label: "Body text", type: "area" },
      { key: "edCta1Text", label: "Button 1 text" },
      { key: "edCta1Href", label: "Button 1 link" },
      { key: "edCta2Text", label: "Button 2 text" },
      { key: "edCta2Href", label: "Button 2 link" },
      { key: "edImage", label: "Editorial image URL" },
    ],
  },
  {
    title: "New In section",
    fields: [{ key: "newInTitle", label: "Title" }],
  },
  {
    title: "Service strip",
    fields: [
      { key: "service1Title", label: "Item 1 title" },
      { key: "service1Sub", label: "Item 1 subtitle" },
      { key: "service2Title", label: "Item 2 title" },
      { key: "service2Sub", label: "Item 2 subtitle" },
      { key: "service3Title", label: "Item 3 title" },
      { key: "service3Sub", label: "Item 3 subtitle" },
      { key: "service4Title", label: "Item 4 title" },
      { key: "service4Sub", label: "Item 4 subtitle" },
    ],
  },
  {
    title: "Footer",
    fields: [{ key: "footerTagline", label: "Tagline", type: "area" }],
  },
];

export default function ContentForm({ content, onSave, onReset }) {
  const [form, setForm] = useState(() => ({
    ...content,
    announcements: (content.announcements || []).join("\n"),
  }));
  const [saved, setSaved] = useState(false);

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  }

  function submit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      announcements: form.announcements
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    onSave(payload);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-8">
      <p className="text-sm text-ash">
        Edit the words and key images used across the storefront. Changes are
        saved to this browser and appear instantly on the site.
      </p>

      {GROUPS.map((g) => (
        <fieldset key={g.title} className="border border-line p-5">
          <legend className="label px-2">{g.title}</legend>
          <div className="grid sm:grid-cols-2 gap-4">
            {g.fields.map((f) => (
              <div
                key={f.key}
                className={f.type === "area" || f.type === "list" ? "sm:col-span-2" : ""}
              >
                <span className="label block mb-1.5 text-ash">{f.label}</span>
                {f.type === "area" || f.type === "list" ? (
                  <textarea
                    rows={f.type === "list" ? 5 : 3}
                    value={form[f.key] ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-ink resize-none"
                  />
                ) : (
                  <input
                    value={form[f.key] ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="w-full border border-line px-3 py-2 text-sm outline-none focus:border-ink"
                  />
                )}
              </div>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="sticky bottom-0 bg-paper/95 backdrop-blur border-t border-line py-4 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn btn-dark">
          {saved ? "Saved ✓" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm("Reset all site text & images to defaults?")) {
              onReset();
            }
          }}
          className="btn btn-outline"
        >
          Reset to defaults
        </button>
        {saved && <span className="label text-ash">Live on the site</span>}
      </div>
    </form>
  );
}
