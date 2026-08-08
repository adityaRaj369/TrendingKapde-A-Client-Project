// Default catalogue + reels used the first time the site loads.
// Everything here is copied into localStorage and can then be fully
// managed (add / edit / delete) from the Admin panel.

const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const CATEGORIES = ["Women", "Men", "Accessories"];

export const SEED_PRODUCTS = [
  {
    id: "p-oversized-wool-coat",
    name: "Oversized Wool Coat",
    price: 8990,
    category: "Women",
    collection: "New",
    description:
      "Long-line double-breasted coat in a soft wool blend. Dropped shoulders, notch lapel and a tie belt at the waist. A defining piece of the season.",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("photo-1539533018447-63fcce2678e3"), img("photo-1551232864-3f0890e580d9")],
    createdAt: 1,
  },
  {
    id: "p-relaxed-poplin-shirt",
    name: "Relaxed Poplin Shirt",
    price: 2590,
    category: "Women",
    collection: "New",
    description:
      "Crisp cotton poplin shirt with a relaxed fit, spread collar and mother-of-pearl buttons. Wear it open over a tee or tucked into tailored trousers.",
    sizes: ["XS", "S", "M", "L"],
    images: [img("photo-1596755094514-f87e34085b2c"), img("photo-1554568218-0f1715e72254")],
    createdAt: 2,
  },
  {
    id: "p-pleated-midi-skirt",
    name: "Pleated Midi Skirt",
    price: 3490,
    category: "Women",
    collection: "Trending",
    description:
      "Fluid pleated midi skirt with a high waist and concealed side zip. Moves beautifully and pairs with everything.",
    sizes: ["XS", "S", "M", "L"],
    images: [img("photo-1516257984-b1b4d707412e"), img("photo-1490481651871-ab68de25d43d")],
    createdAt: 3,
  },
  {
    id: "p-structured-blazer",
    name: "Structured Blazer",
    price: 6490,
    category: "Women",
    collection: "New",
    description:
      "Sharp single-breasted blazer with padded shoulders and a nipped waist. The backbone of a modern wardrobe.",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("photo-1591047139829-d91aecb6caea"), img("photo-1483985988355-763728e1935b")],
    createdAt: 4,
  },
  {
    id: "p-heavy-cotton-tee",
    name: "Heavyweight Cotton Tee",
    price: 1290,
    category: "Men",
    collection: "Trending",
    description:
      "Boxy heavyweight tee in 100% combed cotton. Reinforced ribbed neckline and a clean straight hem.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [img("photo-1521572163474-6864f9cf17ab"), img("photo-1583743814966-8936f5b7be1a")],
    createdAt: 5,
  },
  {
    id: "p-tailored-wool-trousers",
    name: "Tailored Wool Trousers",
    price: 4290,
    category: "Men",
    collection: "New",
    description:
      "Pleated wool-blend trousers with a straight leg and pressed crease. Elevated tailoring with room to move.",
    sizes: ["28", "30", "32", "34", "36"],
    images: [img("photo-1473966968600-fa801b869a1a"), img("photo-1594633312681-425c7b97ccd1")],
    createdAt: 6,
  },
  {
    id: "p-minimal-overshirt",
    name: "Minimal Overshirt",
    price: 3990,
    category: "Men",
    collection: "Trending",
    description:
      "Utility overshirt in brushed cotton twill. Two chest pockets and a boxy, layer-ready silhouette.",
    sizes: ["S", "M", "L", "XL"],
    images: [img("photo-1602810318383-e386cc2a3ccf"), img("photo-1434389677669-e08b4cac3105")],
    createdAt: 7,
  },
  {
    id: "p-selvedge-denim",
    name: "Selvedge Straight Denim",
    price: 4990,
    category: "Men",
    collection: "New",
    description:
      "Rigid selvedge denim cut straight through the leg. Ages with wear to become uniquely yours.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    images: [img("photo-1542272604-787c3835535d"), img("photo-1541099649105-f69ad21f3246")],
    createdAt: 8,
  },
  {
    id: "p-leather-tote",
    name: "Structured Leather Tote",
    price: 5990,
    category: "Accessories",
    collection: "Trending",
    description:
      "Clean-lined tote in smooth leather with a suede-lined interior and magnetic closure. Fits a laptop and then some.",
    sizes: ["One Size"],
    images: [img("photo-1584917865442-de89df76afd3"), img("photo-1590874103328-eac38a683ce7")],
    createdAt: 9,
  },
  {
    id: "p-wool-scarf",
    name: "Ribbed Wool Scarf",
    price: 1790,
    category: "Accessories",
    collection: "New",
    description:
      "Extra-long ribbed scarf in pure lambswool. Soft, warm and endlessly wrappable.",
    sizes: ["One Size"],
    images: [img("photo-1520903920243-00d872a2d1c9"), img("photo-1607522370275-f14206abe5d3")],
    createdAt: 10,
  },
  {
    id: "p-leather-belt",
    name: "Classic Leather Belt",
    price: 1490,
    category: "Accessories",
    collection: "Trending",
    description:
      "Full-grain leather belt with a matte gunmetal buckle. A quiet, hard-working essential.",
    sizes: ["S", "M", "L"],
    images: [img("photo-1553062407-98eeb64c6a62"), img("photo-1611085583191-a3b181a88401")],
    createdAt: 11,
  },
  {
    id: "p-knit-sweater",
    name: "Merino Crew Sweater",
    price: 3290,
    category: "Women",
    collection: "Trending",
    description:
      "Fine-gauge merino crew-neck with a slightly cropped body and ribbed trims. Layer it or wear it alone.",
    sizes: ["XS", "S", "M", "L"],
    images: [img("photo-1576566588028-4147f3842f27"), img("photo-1434389677669-e08b4cac3105")],
    createdAt: 12,
  },
];

// Public, hotlink-friendly sample videos used to demo the Reels feature.
// Admins can add real fashion reel URLs from the Admin > Reels tab.
export const SEED_REELS = [
  {
    id: "r-1",
    title: "AW Campaign — Tailoring",
    handle: "@trendingkapdewala",
    caption: "The new tailoring edit. Sharp shoulders, softer lines. #NewIn",
    poster: img("photo-1490481651871-ab68de25d43d"),
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    productId: "p-structured-blazer",
    createdAt: 1,
  },
  {
    id: "r-2",
    title: "Denim, styled three ways",
    handle: "@trendingkapdewala",
    caption: "One pair of selvedge, three looks. Which one's yours?",
    poster: img("photo-1542272604-787c3835535d"),
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    productId: "p-selvedge-denim",
    createdAt: 2,
  },
  {
    id: "r-3",
    title: "Behind the coat",
    handle: "@trendingkapdewala",
    caption: "How the oversized wool coat comes together. #BTS",
    poster: img("photo-1539533018447-63fcce2678e3"),
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    productId: "p-oversized-wool-coat",
    createdAt: 3,
  },
];

export const ADMIN_PASSWORD = "admin123";
