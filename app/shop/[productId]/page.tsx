"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/data"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Check, ArrowLeft, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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

  const [showSizeError, setShowSizeError] = useState(false)
  const [showColorError, setShowColorError] = useState(false)

  const handleAddToCart = async () => {
    let hasError = false
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setShowSizeError(true)
      toast.error("Please select a size before adding to cart")
      hasError = true
    } else {
      setShowSizeError(false)
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setShowColorError(true)
      toast.error("Please select a color before adding to cart")
      hasError = true
    } else {
      setShowColorError(false)
    }

    if (hasError) return

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
    <div className="relative min-h-screen w-full bg-white text-black">

      {/* Back Button */}
      <Link href="/shop" className="absolute top-20 left-6 z-30 flex items-center gap-2 text-black hover:opacity-60 transition-opacity">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-semibold uppercase tracking-widest">Back to Shop</span>
      </Link>

      {/* Product Detail Section */}
      <section className="py-16 px-4 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
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
                  className="h-full w-auto object-contain"
                  style={{
                    filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.15))",
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
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImage === img
                          ? "border-black opacity-100"
                          : "border-neutral-200 opacity-60 hover:opacity-100"
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
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-black">{product.name}</h1>
                <p className="text-3xl font-bold text-black">{product.price}</p>
                <p className="text-neutral-600 leading-relaxed text-lg max-w-lg">{product.description}</p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-black">Select Size</h3>
                    {showSizeError && !selectedSize && (
                      <span className="text-xs font-bold text-red-600 animate-pulse">! Please pick a size</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size)
                          setShowSizeError(false)
                        }}
                        className={`px-6 py-3 border rounded text-sm font-bold uppercase tracking-wider transition-all ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : showSizeError
                            ? "bg-red-50 border-red-500 text-red-700 hover:border-black"
                            : "bg-transparent border-neutral-300 text-black hover:border-black"
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
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-black">Select Color</h3>
                    {showColorError && !selectedColor && (
                      <span className="text-xs font-bold text-red-600 animate-pulse">! Please pick a color</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color)
                          setShowColorError(false)
                        }}
                        className={`px-6 py-3 border rounded text-sm font-bold uppercase tracking-wider transition-all ${
                          selectedColor === color
                            ? "bg-black text-white border-black"
                            : showColorError
                            ? "bg-red-50 border-red-500 text-red-700 hover:border-black"
                            : "bg-transparent border-neutral-300 text-black hover:border-black"
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
                <div className="flex items-center gap-3 px-4 py-3 rounded bg-red-50 border border-red-200">
                  <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                  <p className="text-sm font-bold text-red-600 uppercase tracking-wider">Out of Stock</p>
                </div>
              )}
              {product.availability === "coming_soon" && (
                <div className="flex items-center gap-3 px-4 py-3 rounded bg-neutral-100 border border-neutral-200">
                  <span className="w-2 h-2 rounded-full bg-neutral-400 flex-shrink-0 animate-pulse" />
                  <p className="text-sm font-bold text-neutral-600 uppercase tracking-wider">Coming Soon</p>
                </div>
              )}

              {/* Quantity Selector */}
              {product.availability !== "out_of_stock" && product.availability !== "coming_soon" && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-black">Quantity</h3>
                  <div className="flex items-center gap-4 border border-neutral-200 w-fit px-4 py-3 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-neutral-400 hover:text-black transition-colors font-bold"
                    >
                      −
                    </button>
                    <span className="text-black font-bold w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-neutral-400 hover:text-black transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <Button
                size="lg"
                className="w-full h-14 text-base font-bold uppercase tracking-wider bg-black text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
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
              <div className="space-y-6 border-t border-neutral-200 pt-8">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-black">Material</h3>
                  <p className="text-neutral-600">{product.material}</p>
                </div>

                {product.careInstructions && product.careInstructions.length > 0 && (
                  <div className="space-y-3 border-b border-neutral-100 pb-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-black">Care Instructions</h3>
                    <ul className="space-y-2">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start gap-2 text-neutral-600">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                          <span className="text-sm">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Delivery Information Accordion */}
                <div className="border border-neutral-200 rounded-lg p-5 space-y-3 bg-neutral-50/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-wider text-black">Delivery Information</h3>
                    <span className="text-xs text-neutral-400 font-semibold">Shipping Policy</span>
                  </div>
                  <ul className="space-y-2 text-xs md:text-sm font-medium text-neutral-700 leading-relaxed uppercase tracking-wide">
                    <li>- READY TO SHIP.</li>
                    <li>- FOR DOMESTIC ORDERS, 5-7 BUSINESS DAYS AFTER ORDER PROCESSING.</li>
                    <li>- FOR INTERNATIONAL ORDERS, 7-15 BUSINESS DAYS AFTER ORDER PROCESSING.</li>
                    <li>- NOTE THAT IMPORT DUTIES MAY APPLY FOR CUSTOMERS IN CERTAIN REGIONS.</li>
                    <li className="pt-2 text-neutral-900 font-bold border-t border-neutral-200">
                      - FOR MORE INFO, KINDLY REFER TO OUR SHIPPING POLICY
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
