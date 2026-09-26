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
    availability: "out_of_stock",
  },
]

export function getProductById(productId: string): Product | undefined {
  return products.find((p) => p.id === productId)
}
