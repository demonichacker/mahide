export interface Product {
  id: string
  name: string
  price: string
  category: string
  image: string
  description: string
  sizes: string[]
  colors: string[]
  material: string
  careInstructions: string[]
}

export interface Collection {
  slug: string
  name: string
  image: string
  description: string
}

export const collections: Collection[] = [
  {
    slug: "men",
    name: "Men's Collection",
    image: "/modern-black-streetwear-men-fashion-model.jpg",
    description: "Bold, contemporary streetwear designed for the modern man. Effortless style meets premium comfort.",
  },
  {
    slug: "women",
    name: "Women's Collection",
    image: "/modern-black-streetwear-women-fashion-model.jpg",
    description:
      "Chic, confident pieces that redefine modern femininity. Elegant streetwear with a sophisticated edge.",
  },
]

export const products: Product[] = [
  {
    id: "leather-jacket-001",
    name: "Premium Leather Jacket",
    price: "₦45,000",
    category: "men",
    image: "/luxury-black-leather-jacket-on-white-background.jpg",
    description:
      "A timeless leather jacket crafted from premium Italian leather. Features a classic silhouette with modern details, perfect for elevating any casual outfit. This piece combines durability with sophisticated style.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Dark Brown"],
    material: "100% Premium Italian Leather, Polyester Lining",
    careInstructions: [
      "Professional leather cleaning only",
      "Do not machine wash",
      "Store in a cool, dry place",
      "Use leather conditioner regularly",
    ],
  },
  {
    id: "evening-dress-001",
    name: "Silk Evening Dress",
    price: "₦38,000",
    category: "women",
    image: "/elegant-black-evening-dress-on-white-background.jpg",
    description:
      "An elegant silk evening dress that drapes beautifully. Features a flattering silhouette with subtle detailing. Perfect for special occasions or upscale events. The luxurious fabric feels incredible against the skin.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Midnight Blue"],
    material: "100% Silk Charmeuse",
    careInstructions: ["Dry clean only", "Do not bleach", "Iron on low heat if needed", "Store hanging"],
  },
  {
    id: "blazer-001",
    name: "Classic Blazer",
    price: "₦32,000",
    category: "men",
    image: "/black-modern-blazer-on-white-background.jpg",
    description:
      "A modern take on the classic blazer. Tailored fit with contemporary details. Versatile enough for business meetings or evening events. Crafted from premium wool blend for comfort and durability.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal Grey", "Navy"],
    material: "70% Wool, 30% Polyester",
    careInstructions: ["Dry clean recommended", "Can be steamed", "Store on a proper hanger", "Avoid direct sunlight"],
  },
  {
    id: "cashmere-sweater-001",
    name: "Cashmere Sweater",
    price: "₦25,000",
    category: "women",
    image: "/elegant-black-cashmere-sweater-on-white-background.jpg",
    description:
      "Ultra-soft cashmere sweater for ultimate comfort. Classic crew neck design with a relaxed fit. Perfect for layering or wearing on its own. The premium cashmere provides warmth without bulk.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Cream", "Grey"],
    material: "100% Pure Cashmere",
    careInstructions: [
      "Hand wash in cold water or dry clean",
      "Lay flat to dry",
      "Use cashmere comb to remove pilling",
      "Store folded, not hanging",
    ],
  },
  {
    id: "trousers-001",
    name: "Tailored Trousers",
    price: "₦20,000",
    category: "women",
    image: "/black-tailored-trousers-on-white-background.jpg",
    description:
      "Impeccably tailored trousers with a flattering high-waisted fit. Features a classic straight leg silhouette. Perfect for office wear or casual elegance. Made from premium stretch fabric for all-day comfort.",
    sizes: ["24", "26", "28", "30", "32", "34"],
    colors: ["Black", "Navy", "Grey"],
    material: "65% Polyester, 30% Viscose, 5% Elastane",
    careInstructions: ["Machine wash cold", "Hang to dry", "Iron on medium heat", "Do not bleach"],
  },
  {
    id: "hoodie-001",
    name: "Premium Hoodie",
    price: "₦18,000",
    category: "men",
    image: "/black-premium-hoodie-streetwear-on-white.jpg",
    description:
      "Essential streetwear staple crafted from premium cotton blend. Features a comfortable oversized fit with quality construction. Perfect for casual everyday wear or layering.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "White"],
    material: "80% Cotton, 20% Polyester Fleece",
    careInstructions: ["Machine wash cold", "Tumble dry low", "Do not iron print", "Wash inside out"],
  },
  {
    id: "cargo-pants-001",
    name: "Tactical Cargo Pants",
    price: "₦22,000",
    category: "men",
    image: "/black-cargo-pants-streetwear-on-white.jpg",
    description:
      "Modern cargo pants with functional pockets and contemporary fit. Durable fabric with stretch for comfort and movement. Perfect for urban streetwear style.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Black", "Olive", "Grey"],
    material: "98% Cotton, 2% Elastane",
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron if needed", "Do not bleach"],
  },
  {
    id: "crop-top-001",
    name: "Essential Crop Top",
    price: "₦12,000",
    category: "women",
    image: "/black-crop-top-streetwear-on-white.jpg",
    description:
      "Versatile crop top with a flattering fit. Made from soft, breathable fabric. Perfect for pairing with high-waisted bottoms. A wardrobe essential for modern streetwear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Grey"],
    material: "95% Cotton, 5% Elastane",
    careInstructions: ["Machine wash cold", "Hang to dry", "Low heat iron", "Do not bleach"],
  },
]

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.category === collectionSlug)
}

export function getProductById(productId: string): Product | undefined {
  return products.find((p) => p.id === productId)
}
