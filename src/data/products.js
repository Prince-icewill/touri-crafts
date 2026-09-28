export const CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "boards", label: "Chopping Boards" },
  { id: "book-stands", label: "Book Stands" },
  { id: "lamps", label: "Lamps" },
  { id: "tables", label: "Tables" },
  { id: "beds", label: "Beds" },
];

// Seed data — used the first time the live database is empty.
// Once the admin panel is used, real data takes over from Firestore.
export const SEED_PRODUCTS = [
  {
    id: "adua-book-stand",
    name: "Adua Book Stand",
    category: "book-stands",
    price: 35000,
    oldPrice: 40000,
    images: ["/images/products/placeholder-boardstand.jpg"],
    description:
      "A hand-carved book stand shaped from solid wood, built to hold your favourite reads while telling a story of its own.",
    soldOut: false,
  },
  {
    id: "moyeme-board",
    name: "Moyeme Board",
    category: "boards",
    price: 35000,
    priceMax: 45000,
    images: ["/images/products/placeholder-board.jpg"],
    description:
      "A functional chopping board carved from solid wood with a smooth, food-safe finish.",
    soldOut: false,
  },
  {
    id: "mirama-board",
    name: "Mirama Board",
    category: "boards",
    price: 35000,
    priceMax: 45000,
    images: ["/images/products/placeholder-board.jpg"],
    description: "Engraved with subtle tribal-inspired linework along the handle.",
    soldOut: false,
  },
  {
    id: "reshe-board",
    name: "Reshe Board",
    category: "boards",
    price: 35000,
    priceMax: 45000,
    images: ["/images/products/placeholder-board.jpg"],
    description: "Round-cut and finished with a hand-carved rim.",
    soldOut: false,
  },
  {
    id: "floor-lamp-01",
    name: "Freeform Floor Lamp",
    category: "lamps",
    price: 85000,
    images: ["/images/products/placeholder-lamp.jpg"],
    description: "A sculptural floor lamp built from a single reclaimed branch.",
    soldOut: false,
  },
  {
    id: "side-table-01",
    name: "Freeform Side Table",
    category: "tables",
    price: 120000,
    images: ["/images/products/placeholder-table.jpg"],
    description: "A low, organic-shaped side table with a hand-finished dark stain.",
    soldOut: false,
  },
  {
    id: "bed-frame-01",
    name: "Heritage Bed Frame",
    category: "beds",
    price: 450000,
    images: ["/images/products/placeholder-bed.jpg"],
    description: "A statement bed frame with live-edge detailing.",
    soldOut: false,
  },
];

export const REVIEWS = [
  { name: "Amara O.", text: "The chopping board I got is honestly too beautiful to use for cooking. Craftsmanship is unreal.", rating: 5 },
  { name: "Chidi E.", text: "Ordered a side table for my living room, it's the first thing every guest asks about.", rating: 5 },
  { name: "Funmi A.", text: "You can tell each piece is made with real intention. Not mass-produced, feels personal.", rating: 5 },
  { name: "Tobi K.", text: "Delivery took a little longer than expected but the piece was worth the wait, 10/10.", rating: 4 },
];

export const BLOG_POSTS = [
  { id: "caring-for-your-wood", title: "How to Care for Your Handmade Wood Pieces", excerpt: "A few simple habits keep your Touri Crafts piece looking rich and grained for years.", image: "/images/blog/placeholder-wood-care.jpg", date: "2026" },
  { id: "story-behind-the-carvings", title: "The Story Behind Our Tribal Carvings", excerpt: "Every line etched into our boards carries meaning rooted in Nigerian tradition.", image: "/images/blog/placeholder-tribal.jpg", date: "2026" },
  { id: "fun-facts-about-our-wood", title: "5 Fun Facts About the Wood We Use", excerpt: "From where we source our timber to why every grain pattern is one-of-a-kind.", image: "/images/blog/placeholder-facts.jpg", date: "2026" },
];

// Services — the "wall" installation work, separate from shop products
export const SEED_SERVICES = [
  { id: "custom-wall-installations", title: "Custom Wall Installations", image: "/images/services/wall-1.jpeg", description: "Bespoke wood wall features, shaped and installed to fit your space." },
  { id: "feature-wall-design", title: "Feature Wall Design", image: "/images/services/wall-2.jpeg", description: "Statement wall pieces that bring texture and story into a room." },
  { id: "woven-wall-art", title: "Woven Wall Art", image: "/images/services/wall-3.jpeg", description: "Handwoven and carved wall art, blending craft with cultural pattern." },
  { id: "media-console-builds", title: "Media Console Builds", image: "/images/services/wall-4.jpeg", description: "Custom-built console and storage pieces designed around your wall." },
];

export const SOCIALS = {
  instagram: "https://www.instagram.com/Touricrafts",
  tiktok: "https://www.tiktok.com/@touri_crafts",
  whatsapp: "https://wa.me/2348091362439",
  youtube: "https://www.youtube.com/@Touricrafts",
  x: "https://x.com/Touricrafts",
  facebook: "https://www.facebook.com/Touricrafts",
};

export const PICKUP_LOCATIONS = [
  { id: "arepo", label: "Road 1, Danbide Millennium Estate, Arepo" },
  { id: "oregun", label: "Daystar Christian Centre, Oregun (Every Sunday)" },
];

export const CATALOG_PDF_URL = "/catalog/touricrafts-catalog.pdf";
