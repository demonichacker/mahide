"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/data"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Check, ArrowLeft, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BackgroundSlideshow } from "@/components/background-slideshow"
import { BackgroundAudio } from "@/components/background-audio"
import { useCart } from "@/context/cart-context"
import { toast } from "sonner"

interface Params {
  productId: string
}

export default function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { productId } = use(params)
  const product = getProductById(productId)
  const router = useRouter()
  const { addToCart } = useCart()
  const [activeImage, setActiveImage] = useState<string>("")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

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

  const handleAddToCart = async () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size")
      return
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color")
      return
    }

    setIsAdding(true)
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        color: selectedColor,
        size: selectedSize,
        quantity,
        image: currentImage,
      })
      toast.success("Added to cart!")
      setTimeout(() => {
        router.push("/cart")
      }, 500)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Cinematic Background Slideshow */}
      <BackgroundSlideshow />

      {/* Background Audio */}
      <BackgroundAudio />

      {/* Back Button */}
      <Link href="/shop" className="relative z-30 absolute top-20 left-6 flex items-center gap-2 text-white hover:opacity-70 transition-opacity">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-semibold uppercase tracking-widest">Back to Shop</span>
      </Link>

      {/* Product Detail Section */}
      <section className="relative z-10 py-16 px-4 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image - Floating */}
            <motion.div
              className="space-y-6 flex flex-col items-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="relative h-96 md:h-[550px] lg:h-[600px] w-full flex items-center justify-center">
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt={product.name}
                  className="h-full w-auto object-contain drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 25px 35px rgba(0, 0, 0, 0.6))",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Thumbnails */}
              {displayImages && displayImages.length > 1 && (
                <div className="flex gap-4 flex-wrap justify-center max-w-md">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                        currentImage === img
                          ? "border-white opacity-100"
                          : "border-white/30 opacity-60 hover:opacity-100"
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
            </motion.div>

            {/* Product Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter">{product.name}</h1>
                <p className="text-3xl font-bold">{product.price}</p>
                <p className="text-neutral-300 leading-relaxed text-lg max-w-lg">{product.description}</p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border rounded text-sm font-bold uppercase tracking-wider transition-all ${
                          selectedSize === size
                            ? "bg-white text-black border-white"
                            : "bg-transparent border-white/40 text-white hover:border-white"
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
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest">Select Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 border rounded text-sm font-bold uppercase tracking-wider transition-all ${
                          selectedColor === color
                            ? "bg-white text-black border-white"
                            : "bg-transparent border-white/40 text-white hover:border-white"
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
                <div className="flex items-center gap-3 px-4 py-3 rounded bg-red-600/20 border border-red-500/50">
                  <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                  <p className="text-sm font-bold text-red-300 uppercase tracking-wider">Out of Stock</p>
                </div>
              )}
              {product.availability === "coming_soon" && (
                <div className="flex items-center gap-3 px-4 py-3 rounded bg-white/10 border border-white/30">
                  <span className="w-2 h-2 rounded-full bg-white flex-shrink-0 animate-pulse" />
                  <p className="text-sm font-bold text-white/70 uppercase tracking-wider">Coming Soon</p>
                </div>
              )}

              {/* Quantity Selector */}
              {product.availability !== "out_of_stock" && product.availability !== "coming_soon" && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest">Quantity</h3>
                  <div className="flex items-center gap-4 border border-white/20 w-fit px-4 py-3 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-white/60 hover:text-white transition-colors font-bold"
                    >
                      −
                    </button>
                    <span className="text-white font-bold w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-white/60 hover:text-white transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <Button
                size="lg"
                className="w-full h-14 text-base font-bold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                onClick={handleAddToCart}
                disabled={product.availability === "out_of_stock" || product.availability === "coming_soon" || isAdding}
              >
                <ShoppingBag className="w-5 h-5" />
                {product.availability === "out_of_stock"
                  ? "Out of Stock"
                  : product.availability === "coming_soon"
                  ? "Coming Soon"
                  : isAdding ? "Adding..." : "Add to Cart"}
              </Button>

              {/* Product Details */}
              <div className="space-y-6 border-t border-white/20 pt-8">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest">Material</h3>
                  <p className="text-neutral-300">{product.material}</p>
                </div>

                {product.careInstructions && product.careInstructions.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-widest">Care Instructions</h3>
                    <ul className="space-y-2">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2 text-neutral-300">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                          <span className="text-sm">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dark gradient overlay at bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}
      />
    </div>
  )
}
