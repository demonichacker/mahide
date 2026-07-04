export interface Product {
  id: string
  name: string
  price: string
  image: string
  images?: string[]
  colorImages?: Record<string, string[]>
  description: string
  sizes: string[]
  colors: string[]
  material: string
  careInstructions: string[]
  featured?: boolean
  availability?: "in_stock" | "out_of_stock" | "coming_soon"
}

export const products: Product[] = [
  {
    id: "two-tone-polo",
    name: "MAHIDE Two-Tone Polo",
    price: "₦18,000",
    image: "/1 NEW.png",
    images: ["/1 NEW.png"],
    description:
      "A premium heavyweight cotton pique polo shirt. Features a distinct sand-beige contrast collar and button placket, adorned with the signature MAHIDE monogram embroidery on the chest. Designed for a comfortable, structured unisex streetwear drape.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black/Sand"],
    material: "100% Premium Cotton Pique",
    careInstructions: [
      "Machine wash cold inside out",
      "Hang dry to maintain garment shape",
      "Do not iron embroidery directly",
      "Do not bleach",
    ],
    featured: true,
    availability: "in_stock",
  },
  {
    id: "resilience-polo",
    name: "MAHIDE 'Resilience' Polo",
    price: "₦25,000",
    image: "/2F NEW.png",
    images: ["/2F NEW.png", "/2B NEW.png"],
    description:
      "Elevate your streetwear aesthetic with this graphic-detailed polo. Featuring an ornate gold crown crest embroidery, a flowing 'Resilience' script print across the chest, and block graphic sleeve numbers. Designed to stand out.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    material: "100% Double-knit Heavyweight Cotton",
    careInstructions: [
      "Hand wash cold recommended",
      "Wash inside out",
      "Iron on reverse side only",
      "Do not tumble dry",
    ],
    featured: true,
    availability: "in_stock",
  },
  {
    id: "cropped-camo-polo",
    name: "MAHIDE Cropped Camo Polo",
    price: "₦28,000",
    image: "/3F NEW.png",
    images: ["/3F NEW.png", "/3B NEW.png"],
    description:
      "A modern boxy, cropped silhouette polo shirt featuring bold camouflage applique patches. Detailed with a signature camo horse emblem, logo chest print, and vintage 'YOURNAME 44' varsity graphics on the back.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black/Camo"],
    material: "100% Organic Cotton Terry Pique",
    careInstructions: [
      "Machine wash cold gentle cycle",
      "Wash with like colors",
      "Tumble dry low",
      "Warm iron on reverse side",
    ],
    featured: false,
    availability: "in_stock",
  },
  {
    id: "spiral-seal-tee",
    name: "MAHIDE Spiral Seal Tee",
    price: "₦10,000",
    image: "/4F NEW.png",
    images: ["/4F NEW.png", "/4B NEW.png", "/6F NEW.png", "/6B NEW.png"],
    colorImages: {
      "White": ["/4F NEW.png", "/4B NEW.png"],
      "Black": ["/6F NEW.png", "/6B NEW.png"],
    },
    description:
      "A statement streetwear tee. Features a vibrant red serif logo print across the front and an intricate, gothic-inspired spiral seal design printed on the back. Cut to a relaxed, oversized unisex drape. Available in both White and Black.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black"],
    material: "100% Ultra-Heavyweight Cotton (260GSM)",
    careInstructions: [
      "Machine wash cold inside out",
      "Do not bleach",
      "Hang dry in shade to preserve print",
      "Do not iron print",
    ],
    featured: true,
    availability: "out_of_stock",
  },
  {
    id: "stripe-jersey-polo",
    name: "MAHIDE Stripe Jersey Polo",
    price: "₦25,000",
    image: "/5F NEW.png",
    images: ["/5F NEW.png", "/5B NEW.png"],
    description:
      "A vintage-inspired vertical striped jersey polo blending classic sports heritage with high-street design. Rendered in forest green and beige stripes, accented by a detailed eagle shield crest, chest typography, and varsity '00' prints on the front and back.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Forest Green/Beige"],
    material: "90% Cotton, 10% Recycled Polyester Ribbed Knit",
    careInstructions: [
      "Wash inside out with similar colors",
      "Do not iron directly on graphics",
      "Dry flat",
      "Machine wash cold gentle cycle",
    ],
    featured: false,
    availability: "in_stock",
  },
  {
    id: "motion-jersey-polo",
    name: "MAHIDE \"Motion\" Jersey Polo",
    price: "₦25,000",
    image: "/7F NEW.png",
    images: ["/7F NEW.png", "/7B NEW.png"],
    description:
      "A striking split-design jersey polo. Features a forest green and off-white half-and-half contrast body, accented by gold varsity '00' prints, a compass star, and a bold 'MOTION' block print on the back.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Forest Green/Beige Split"],
    material: "90% Cotton, 10% Recycled Polyester Ribbed Knit",
    careInstructions: [
      "Wash inside out with similar colors",
      "Do not iron directly on gold graphics",
      "Dry flat",
      "Machine wash cold gentle cycle",
    ],
    featured: false,
    availability: "in_stock",
  },
  {
    id: "elite-jersey-polo",
    name: "MAHIDE \"Elite\" Jersey Polo",
    price: "₦25,000",
    image: "/8F NEW.png",
    images: ["/8F NEW.png", "/8B NEW.png"],
    description:
      "A premium heritage-inspired jersey polo featuring bold varsity graphics and signature MAHIDE branding. Crafted with precision detailing, this piece combines classic athletic aesthetics with modern streetwear sensibilities.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    material: "90% Cotton, 10% Recycled Polyester Ribbed Knit",
    careInstructions: [
      "Wash inside out with similar colors",
      "Do not iron directly on graphics",
      "Dry flat",
      "Machine wash cold gentle cycle",
    ],
    featured: false,
    availability: "in_stock",
  },
  {
    id: "heritage-jersey-polo",
    name: "MAHIDE \"Heritage\" Jersey Polo",
    price: "₦25,000",
    image: "/9F NEW.png",
    images: ["/9F NEW.png", "/9B NEW.png"],
    description:
      "A classic jersey polo that honors MAHIDE's design philosophy. Features distinctive block lettering, ornate crest embroidery, and vintage-inspired varsity detailing. Perfect for those who appreciate timeless streetwear craftsmanship.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black/Cream"],
    material: "90% Cotton, 10% Recycled Polyester Ribbed Knit",
    careInstructions: [
      "Wash inside out with similar colors",
      "Do not iron directly on embroidery",
      "Dry flat",
      "Machine wash cold gentle cycle",
    ],
    featured: false,
    availability: "in_stock",
  },
  {
    id: "lion-flag-tee",
    name: "MAHIDE Lion Flag Tee",
    price: "₦20,000",
    image: "/10F.jpg",
    images: ["/10F.jpg"],
    description:
      "Make a bold statement with the MAHIDE Lion Flag Tee. Features a striking crimson flag graphic built from repeating MAHIDE stripe text, a rampant lion crest at the canton, and a silver star border framing the entire design. Finished with a bold 'MAHIDE' wordmark beneath — heritage and streetwear in one.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    material: "100% Ultra-Heavyweight Cotton",
    careInstructions: [
      "Machine wash cold inside out",
      "Do not bleach",
      "Hang dry in shade to preserve print",
      "Do not iron directly on graphics",
    ],
    featured: true,
    availability: "in_stock",
  },
]

export function getProductById(productId: string): Product | undefined {
  return products.find((p) => p.id === productId)
}
