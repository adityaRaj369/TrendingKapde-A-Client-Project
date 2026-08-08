"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore, formatPrice } from "@/lib/store";
import SafeImage from "@/components/SafeImage";
import ProductForm from "@/components/admin/ProductForm";
import ReelForm from "@/components/admin/ReelForm";
import ContentForm from "@/components/admin/ContentForm";
import { ADMIN_PASSWORD } from "@/lib/seed";

export default function AdminPage() {
  const store = useStore();
  const { isAdmin, hydrated, login } = store;

  if (!hydrated) {
    return <div className="py-32 text-center label text-ash">Loading…</div>;
  }
  if (!isAdmin) return <LoginGate login={login} />;
  return <Dashboard store={store} />;
}

function LoginGate({ login }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div className="mx-auto max-w-sm px-4 py-28">
      <p className="label text-ash text-center">Restricted</p>
      <h1 className="font-display text-3xl font-semibold text-center mt-2">
        Admin Access
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!login(pw)) setErr(true);
        }}
        className="mt-8 space-y-3"
      >
        <input
          type="password"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setErr(false);
          }}
          placeholder="Enter password"
          className="w-full border border-line px-3 py-3 outline-none focus:border-ink text-center"
        />
        {err && (
          <p className="label text-ink text-center">Incorrect password</p>
        )}
        <button className="w-full bg-ink text-paper label py-3.5 hover:bg-ink/90 transition">
          Enter dashboard
        </button>
      </form>
      <p className="label text-ash text-center mt-6">
        Demo password: <span className="text-ink">{ADMIN_PASSWORD}</span>
      </p>
    </div>
  );
}

function Dashboard({ store }) {
  const {
    products,
    reels,
    addProduct,
    updateProduct,
    deleteProduct,
    addReel,
    deleteReel,
    logout,
    resetStore,
    cartCount,
    content,
    updateContent,
    resetContent,
  } = store;

  const [tab, setTab] = useState("products");
  const [editing, setEditing] = useState(null); // product being edited
  const [creating, setCreating] = useState(false);
  const [addingReel, setAddingReel] = useState(false);
  const [flash, setFlash] = useState("");
  const [contentKey, setContentKey] = useState(0); // remount ContentForm on reset

  function notify(msg) {
    setFlash(msg);
    setTimeout(() => setFlash(""), 2200);
  }

  function saveProduct(data) {
    if (editing) {
      updateProduct(editing.id, data);
      notify("Product updated");
    } else {
      addProduct(data);
      notify("Product added");
    }
    setEditing(null);
    setCreating(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const showForm = creating || editing;

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-8">
      {/* top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="label text-ash">Dashboard</p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold">
            Store Admin
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="label hover-underline">
            View store ↗
          </Link>
          <button
            onClick={() => {
              if (confirm("Reset the store to the original demo data?")) {
                resetStore();
                notify("Store reset to demo data");
              }
            }}
            className="label border border-line px-3 py-2 hover:border-ink transition"
          >
            Reset demo
          </button>
          <button
            onClick={logout}
            className="label border border-ink px-3 py-2 hover:bg-ink hover:text-paper transition"
          >
            Log out
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Stat label="Products" value={products.length} />
        <Stat label="Reels" value={reels.length} />
        <Stat label="In bag" value={cartCount} />
        <Stat
          label="Catalogue value"
          value={formatPrice(products.reduce((n, p) => n + p.price, 0))}
        />
      </div>

      {flash && (
        <div className="mt-5 bg-ink text-paper label px-4 py-3">{flash}</div>
      )}

      {/* tabs */}
      <div className="flex gap-6 mt-8 border-b border-line">
        {[
          ["products", "Products"],
          ["reels", "Reels"],
          ["content", "Content"],
        ].map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`label pb-3 -mb-px border-b-2 transition ${
              tab === t ? "border-ink text-ink" : "border-transparent text-ash"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* PRODUCTS TAB */}
      {tab === "products" && (
        <div className="mt-8">
          {showForm ? (
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold">
                  {editing ? "Edit product" : "New product"}
                </h2>
              </div>
              <ProductForm
                initial={editing}
                onSave={saveProduct}
                onCancel={() => {
                  setEditing(null);
                  setCreating(false);
                }}
              />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold">
                  Catalogue ({products.length})
                </h2>
                <button
                  onClick={() => setCreating(true)}
                  className="bg-ink text-paper label px-6 py-3 hover:bg-ink/90 transition"
                >
                  + Add product
                </button>
              </div>

              <div className="border border-line divide-y divide-line">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 p-3 hover:bg-smoke/60 transition"
                  >
                    <div className="w-14 h-16 bg-smoke overflow-hidden shrink-0">
                      <SafeImage
                        src={p.images?.[0]}
                        alt={p.name}
                        label={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate">{p.name}</div>
                      <div className="label text-ash">
                        {p.category} · {p.collection} · {p.sizes.length} sizes
                      </div>
                    </div>
                    <div className="text-sm tabular-nums hidden sm:block">
                      {formatPrice(p.price)}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(p);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="label border border-line px-3 py-2 hover:border-ink transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete “${p.name}”?`)) {
                            deleteProduct(p.id);
                            notify("Product deleted");
                          }
                        }}
                        className="label border border-line px-3 py-2 hover:bg-ink hover:text-paper transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {!products.length && (
                  <div className="p-10 text-center label text-ash">
                    No products yet — add your first one.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* REELS TAB */}
      {tab === "reels" && (
        <div className="mt-8">
          {addingReel ? (
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold mb-6">
                New reel
              </h2>
              <ReelForm
                onSave={(data) => {
                  addReel(data);
                  setAddingReel(false);
                  notify("Reel added");
                }}
                onCancel={() => setAddingReel(false)}
              />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold">
                  Reels ({reels.length})
                </h2>
                <button
                  onClick={() => setAddingReel(true)}
                  className="bg-ink text-paper label px-6 py-3 hover:bg-ink/90 transition"
                >
                  + Upload reel
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {reels.map((r) => (
                  <div key={r.id} className="border border-line">
                    <div className="aspect-[9/16] bg-smoke overflow-hidden">
                      <SafeImage
                        src={r.poster}
                        alt={r.title}
                        label={r.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm truncate">{r.title}</div>
                      <div className="label text-ash truncate">{r.handle}</div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete reel “${r.title}”?`)) {
                            deleteReel(r.id);
                            notify("Reel deleted");
                          }
                        }}
                        className="label border border-line w-full mt-2 py-2 hover:bg-ink hover:text-paper transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                {!reels.length && (
                  <div className="col-span-full p-10 text-center label text-ash border border-line">
                    No reels yet.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* CONTENT TAB */}
      {tab === "content" && (
        <div className="mt-8">
          <h2 className="font-display font-extrabold uppercase tracking-tightest text-2xl mb-6">
            Site Content
          </h2>
          <ContentForm
            key={contentKey}
            content={content}
            onSave={(data) => {
              updateContent(data);
              notify("Content updated");
            }}
            onReset={() => {
              resetContent();
              setContentKey((k) => k + 1);
              notify("Content reset to defaults");
            }}
          />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border border-line p-4">
      <div className="label text-ash">{label}</div>
      <div className="font-display text-2xl font-semibold mt-1 tabular-nums">
        {value}
      </div>
    </div>
  );
}
