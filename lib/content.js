// Editable site copy + key images. All of this can be changed from
// Admin → Content, and is persisted in localStorage (key: tkw_content).
// Kept as a FLAT object so merging new defaults with saved values is trivial.

export const DEFAULT_CONTENT = {
  // Brand
  brandName: "Trending Kapde Wala",

  // Top announcement bar (one line per item)
  announcements: [
    "FREE SHIPPING OVER ₹2,999",
    "NEW SEASON — JUST DROPPED",
    "EASY 30-DAY RETURNS",
    "MEMBERS GET EARLY ACCESS",
  ],

  // Hero
  heroEyebrow: "Autumn / Winter · 2026",
  heroTitle1: "The New",
  heroTitle2: "Minimal",
  heroSubtitle:
    "Sharp tailoring, elevated basics and quiet statement pieces — rendered strictly in black & white.",
  heroBadge: "SHOP AW26 · NEW SEASON · SHOP AW26 ·",
  heroCtaPrimaryText: "Shop New In",
  heroCtaPrimaryHref: "/shop?collection=New",
  heroCtaSecondaryText: "View All",
  heroCtaSecondaryHref: "/shop",
  heroImage:
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80",

  // Statement marquee
  marqueeA: "Black & White",
  marqueeB: "New Season",

  // Categories section
  catEyebrow: "Shop by",
  catTitle: "Categories",

  // Trending section
  trendEyebrow: "Most wanted",
  trendTitle: "Trending Now",

  // Editorial split
  edEyebrow: "The Edit",
  edTitle1: "Dressed",
  edTitle2: "in Contrast",
  edBody:
    "Monochrome dressing done right. Layer black on white, sharp on soft, structured on fluid — and let the silhouette do the talking.",
  edCta1Text: "Shop the edit",
  edCta1Href: "/shop?collection=Trending",
  edCta2Text: "Watch reels",
  edCta2Href: "/reels",
  edImage:
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80",

  // New In section
  newInTitle: "New In",

  // Service strip (4 features)
  service1Title: "Free Shipping",
  service1Sub: "On orders over ₹2,999",
  service2Title: "Easy Returns",
  service2Sub: "30-day hassle-free",
  service3Title: "Secure Checkout",
  service3Sub: "Your data, protected",
  service4Title: "Members First",
  service4Sub: "Early access to drops",

  // Footer
  footerTagline:
    "Modern, minimal fashion in black & white. Considered essentials and of-the-moment drops.",
};
