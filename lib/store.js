"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SEED_PRODUCTS, SEED_REELS, ADMIN_PASSWORD, SEED_VERSION } from "./seed";
import { DEFAULT_CONTENT } from "./content";

const KEYS = {
  products: "tkw_products",
  cart: "tkw_cart",
  reels: "tkw_reels",
  wishlist: "tkw_wishlist",
  admin: "tkw_admin",
  content: "tkw_content",
  seedver: "tkw_seedver",
};

const StoreContext = createContext(null);

function load(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function uid(prefix = "p") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

export function StoreProvider({ children }) {
  const [hydrated, setHydrated] = useState(false);
  const [products, setProducts] = useState([]);
  const [reels, setReels] = useState([]);
  const [cart, setCart] = useState([]); // [{ productId, size, qty }]
  const [wishlist, setWishlist] = useState([]); // [productId]
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const first = useRef(true);

  // Hydrate from localStorage (or seed) once on mount.
  useEffect(() => {
    // If the bundled demo data was updated (new SEED_VERSION), refresh the
    // catalogue + reels so older cached browsers see the new items.
    const savedVer = load(KEYS.seedver, 0);
    if (savedVer !== SEED_VERSION) {
      setProducts(SEED_PRODUCTS);
      setReels(SEED_REELS);
      window.localStorage.setItem(KEYS.seedver, JSON.stringify(SEED_VERSION));
    } else {
      setProducts(load(KEYS.products, SEED_PRODUCTS));
      setReels(load(KEYS.reels, SEED_REELS));
    }
    setCart(load(KEYS.cart, []));
    setWishlist(load(KEYS.wishlist, []));
    setIsAdmin(load(KEYS.admin, false));
    // merge saved content over defaults so new fields always have a value
    setContent({ ...DEFAULT_CONTENT, ...load(KEYS.content, {}) });
    setHydrated(true);
  }, []);

  // Persist whenever state changes (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(KEYS.products, JSON.stringify(products));
  }, [products, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(KEYS.reels, JSON.stringify(reels));
  }, [reels, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(KEYS.cart, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(KEYS.wishlist, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(KEYS.admin, JSON.stringify(isAdmin));
  }, [isAdmin, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(KEYS.content, JSON.stringify(content));
  }, [content, hydrated]);

  // Avoid a "double toast" pattern on very first render.
  useEffect(() => {
    first.current = false;
  }, []);

  // ---- Products ---------------------------------------------------------
  function addProduct(data) {
    const product = {
      id: uid("p"),
      name: data.name?.trim() || "Untitled",
      price: Number(data.price) || 0,
      category: data.category || "Women",
      collection: data.collection || "New",
      description: data.description || "",
      sizes:
        Array.isArray(data.sizes) && data.sizes.length
          ? data.sizes
          : ["S", "M", "L"],
      images:
        Array.isArray(data.images) && data.images.length
          ? data.images
          : [],
      createdAt: Date.now(),
    };
    setProducts((p) => [product, ...p]);
    return product;
  }

  function updateProduct(id, data) {
    setProducts((p) =>
      p.map((item) =>
        item.id === id
          ? {
              ...item,
              ...data,
              price: Number(data.price ?? item.price) || 0,
            }
          : item
      )
    );
  }

  function deleteProduct(id) {
    setProducts((p) => p.filter((item) => item.id !== id));
    setCart((c) => c.filter((line) => line.productId !== id));
    setWishlist((w) => w.filter((pid) => pid !== id));
  }

  function getProduct(id) {
    return products.find((p) => p.id === id) || null;
  }

  // ---- Reels ------------------------------------------------------------
  function addReel(data) {
    const reel = {
      id: uid("r"),
      title: data.title?.trim() || "Untitled reel",
      handle: data.handle || "@trendingkapdewala",
      caption: data.caption || "",
      poster: data.poster || "",
      videoUrl: data.videoUrl || "",
      productId: data.productId || "",
      createdAt: Date.now(),
    };
    setReels((r) => [reel, ...r]);
    return reel;
  }
  function deleteReel(id) {
    setReels((r) => r.filter((item) => item.id !== id));
  }

  // ---- Cart -------------------------------------------------------------
  function addToCart(productId, size, qty = 1) {
    setCart((c) => {
      const idx = c.findIndex(
        (l) => l.productId === productId && l.size === size
      );
      if (idx > -1) {
        const next = [...c];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...c, { productId, size, qty }];
    });
  }
  function setCartQty(productId, size, qty) {
    setCart((c) =>
      c
        .map((l) =>
          l.productId === productId && l.size === size
            ? { ...l, qty: Math.max(0, qty) }
            : l
        )
        .filter((l) => l.qty > 0)
    );
  }
  function removeFromCart(productId, size) {
    setCart((c) =>
      c.filter((l) => !(l.productId === productId && l.size === size))
    );
  }
  function clearCart() {
    setCart([]);
  }

  // ---- Wishlist ---------------------------------------------------------
  function toggleWishlist(productId) {
    setWishlist((w) =>
      w.includes(productId)
        ? w.filter((id) => id !== productId)
        : [...w, productId]
    );
  }

  // ---- Admin auth (client-only demo gate) -------------------------------
  function login(password) {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  }
  function logout() {
    setIsAdmin(false);
  }

  // ---- Content -----------------------------------------------------------
  function updateContent(partial) {
    setContent((c) => ({ ...c, ...partial }));
  }
  function resetContent() {
    setContent(DEFAULT_CONTENT);
  }

  function resetStore() {
    setProducts(SEED_PRODUCTS);
    setReels(SEED_REELS);
    setCart([]);
    setWishlist([]);
    setContent(DEFAULT_CONTENT);
  }

  const cartCount = useMemo(
    () => cart.reduce((n, l) => n + l.qty, 0),
    [cart]
  );
  const cartDetailed = useMemo(
    () =>
      cart
        .map((line) => {
          const product = products.find((p) => p.id === line.productId);
          if (!product) return null;
          return { ...line, product, lineTotal: product.price * line.qty };
        })
        .filter(Boolean),
    [cart, products]
  );
  const subtotal = useMemo(
    () => cartDetailed.reduce((n, l) => n + l.lineTotal, 0),
    [cartDetailed]
  );

  const value = {
    hydrated,
    products,
    reels,
    cart,
    cartDetailed,
    cartCount,
    subtotal,
    wishlist,
    isAdmin,
    content,
    updateContent,
    resetContent,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    addReel,
    deleteReel,
    addToCart,
    setCartQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    login,
    logout,
    resetStore,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within <StoreProvider>");
  return ctx;
}

export function formatPrice(n) {
  return "₹" + Number(n || 0).toLocaleString("en-IN");
}
