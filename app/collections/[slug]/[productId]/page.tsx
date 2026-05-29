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

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>
}) {
  const { slug, productId } = use(params)
  const product = getProductById(productId)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")

  if (!product) {
    notFound()
  }

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
          <Link href="/collections" className="hover:text-foreground transition-colors">
            Collections
          </Link>
          <span>/</span>
          <Link href={`/collections/${slug}`} className="hover:text-foreground transition-colors capitalize">
            {slug}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Detail Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-lg"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

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

              {/* Order Button */}
              <Button size="lg" className="w-full h-14 text-base font-semibold" onClick={handleWhatsAppOrder}>
                Order on WhatsApp
              </Button>

              {/* Product Details */}
              <Card className="p-6 space-y-6 bg-muted/30 border-border/50">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider">Material</h3>
                  <p className="text-muted-foreground">{product.material}</p>
                </div>

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
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
