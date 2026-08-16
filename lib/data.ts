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
    availability: "out_of_stock",
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
    availability: "out_of_stock",
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
    availability: "out_of_stock",
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
    availability: "out_of_stock",
  },
  {
    id: "jersey-polo-collection",
    name: "MAHIDE \"Motion\" Jersey Polo",
    price: "₦25,000",
    image: "/7F NEW.png",
    images: ["/7F NEW.png", "/7B NEW.png", "/8F NEW.png", "/8B NEW.png", "/9F NEW.png", "/9B NEW.png"],
    colorImages: {
      "Green": ["/7F NEW.png", "/7B NEW.png"],
      "Red": ["/8F NEW.png", "/8B NEW.png"],
      "Black": ["/9F NEW.png", "/9B NEW.png"],
    },
    description:
      "The MAHIDE Jersey Polo Collection — three distinct colorways (Green, Red, Black), one iconic silhouette. Features gold varsity graphics, compass star detailing, and signature MAHIDE block typography throughout. Available in Green, Red, and Black colorways.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Green", "Red", "Black"],
    material: "90% Cotton, 10% Recycled Polyester Ribbed Knit",
    careInstructions: [
      "Wash inside out with similar colors",
      "Do not iron directly on gold graphics",
      "Dry flat",
      "Machine wash cold gentle cycle",
    ],
    featured: true,
    availability: "in_stock",
  },
  {
    id: "essential-tee",
    name: "MAHIDE Essential Tee",
    price: "₦15,000",
    image: "/10F.jpg",
    images: ["/10F.jpg", "/essential-tee-white.png"],
    colorImages: {
      "Black": ["/10F.jpg"],
      "White": ["/essential-tee-white.png"],
    },
    description:
      "The MAHIDE Essential Tee — the same iconic Lion Flag design in two colourways. Featuring the crimson flag graphic built from repeating MAHIDE stripe text, rampant lion crest, silver star border, and bold 'MAHIDE' wordmark. Available in Black and White.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White"],
    material: "100% Lightweight Cotton",
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
