# TRENDING KAPDE WALA

A modern, minimal **black & white** fashion store inspired by Zara — built with **Next.js 14 (App Router)** and **Tailwind CSS**. No database: everything (products, reels, cart, wishlist) lives in your **browser's localStorage**, and the whole thing (frontend + API server) runs from a **single command**.

## Quick start

```bash
cd "trending-kapde-wala"
npm install
npm run dev
```

Then open **http://localhost:3000**.

To run a production build:

```bash
npm run build
npm start
```

Next.js runs the frontend and the backend (API routes / server) together in one process — starting the server starts both.

## Features

- **Storefront** — animated hero, category tiles, "Trending" and "New In" rails, editorial banner.
- **Shop** — category filters, sort (price / newest), and live search.
- **Product page** — image gallery, size selector, add-to-bag, wishlist, related items.
- **Bag** — quantity controls, free-shipping threshold, demo checkout.
- **Wishlist** — save items with the heart icon.
- **Reels** — vertical, auto-playing "watch & shop" video feed with product tags.
- **Admin** — full control of the catalogue and reels.

## Admin panel

Go to **/admin**.

**Password:** `admin123` (change it in `lib/seed.js` → `ADMIN_PASSWORD`).

From the dashboard you can:
- Add / edit / delete products (name, price, category, collection, sizes, description).
- Upload product images as **files** (stored as base64) or paste **image URLs**.
- Add / delete reels — paste an `.mp4` URL or upload a short clip, and optionally tag a product.
- **Content tab** — edit almost all storefront copy and key images (brand name, announcement bar, hero text/buttons/image, marquee words, every section heading, the editorial block, service strip, and footer tagline). Changes save to the browser and appear instantly.
- **Reset demo** to restore the original seed catalogue.

## Notes

- Data persists per-browser in `localStorage`. Clearing site data resets the store.
- Because base64 images are stored in `localStorage` (~5 MB limit), prefer image **URLs** for large catalogues; file uploads are best for a few images.
- Seed reels use public sample videos; swap in real fashion `.mp4` links from the Admin > Reels tab.

## Structure

```
app/            routes: /, /shop, /product/[id], /cart, /wishlist, /reels, /admin
components/     Header, Footer, ProductCard, ReelCard, admin forms, etc.
lib/store.js    localStorage-backed state (products, cart, reels, wishlist, admin)
lib/seed.js     default catalogue + reels + admin password
```
