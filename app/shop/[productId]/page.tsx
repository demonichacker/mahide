"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getProductById } from "@/lib/data"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"

const whatsappNumber = "2347049146832"

interface Params {
  productId: string
}

export default function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { productId } = use(params)
  const product = getProductById(productId)
  const [activeImage, setActiveImage] = useState<string>("")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")

  if (!product) {
    notFound()
  }

  // Filter gallery images by selected color if color-specific image assets are defined
  const displayImages =
    selectedColor && product.colorImages && product.colorImages[selectedColor]
      ? product.colorImages[selectedColor]
      : product.images || [product.image]

  const currentImage =
    activeImage && displayImages.includes(activeImage)
      ? activeImage
      : displayImages[0] || product.image

  const handleWhatsAppOrder = () => {
    const sizeText = selectedSize ? ` - Size: ${selectedSize}` : ""
    const colorText = selectedColor ? ` - Color: ${selectedColor}` : ""
    const message = encodeURIComponent(
      `Hello! I want to order ${product.name} (${product.price})${sizeText}${colorText} from MAHIDE COLLECTION`,
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Detail Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image & Gallery */}
            <div className="space-y-4">
              <motion.div
                className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-lg bg-muted border border-border/50"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Thumbnails */}
              {displayImages && displayImages.length > 1 && (
                <div className="flex gap-4">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 aspect-square rounded-md overflow-hidden border-2 bg-muted transition-all ${
                        currentImage === img
                          ? "border-foreground"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{product.name}</h1>
                <p className="text-3xl font-bold">{product.price}</p>
                <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border rounded-md text-sm font-medium transition-all ${
                          selectedSize === size
                            ? "bg-foreground text-background border-foreground"
                            : "bg-background border-border hover:border-foreground/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider">Select Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 border rounded-md text-sm font-medium transition-all ${
                          selectedColor === color
                            ? "bg-foreground text-background border-foreground"
                            : "bg-background border-border hover:border-foreground/50"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability Banner */}
              {product.availability === "out_of_stock" && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-red-950/40 border border-red-900/50">
                  <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                  <p className="text-sm font-semibold text-red-400 uppercase tracking-wider">Out of Stock — Check back soon</p>
                </div>
              )}
              {product.availability === "coming_soon" && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-foreground/5 border border-foreground/20">
                  <span className="w-2 h-2 rounded-full bg-foreground/60 flex-shrink-0 animate-pulse" />
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Coming Soon — Stay tuned</p>
                </div>
              )}

              {/* Order Button */}
              <Button
                size="lg"
                className="w-full h-14 text-base font-semibold"
                onClick={handleWhatsAppOrder}
                disabled={product.availability === "out_of_stock" || product.availability === "coming_soon"}
              >
                {product.availability === "out_of_stock"
                  ? "Out of Stock"
                  : product.availability === "coming_soon"
                  ? "Coming Soon"
                  : "Order on WhatsApp"}
              </Button>

              {/* Product Details */}
              <Card className="p-6 space-y-6 bg-muted/30 border-border/50">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider">Material</h3>
                  <p className="text-muted-foreground">{product.material}</p>
                </div>

                {product.careInstructions && product.careInstructions.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider">Care Instructions</h3>
                    <ul className="space-y-2">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
