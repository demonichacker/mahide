"use client"

import { products } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"
import { BackgroundSlideshow } from "@/components/background-slideshow"
import { BackgroundAudio } from "@/components/background-audio"

const availabilityBadge = (availability?: string) => {
  if (availability === "out_of_stock") {
    return (
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-500 mt-2">
        Out of Stock
      </span>
    )
  }
  if (availability === "coming_soon") {
    return (
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-neutral-400 mt-2">
        Coming Soon
      </span>
    )
  }
  return null
}

export default function ShopPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Cinematic Background Slideshow */}
      <BackgroundSlideshow />

      {/* Background Audio */}
      <BackgroundAudio />

      {/* Shop Header */}
      <section className="relative z-20 py-16 px-4 text-center">
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          SHOP
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-light tracking-wide mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Premium unisex streetwear. Floating over our collection.
        </motion.p>
      </section>

      {/* Products Grid - Floating Items */}
      <section className="relative z-10 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                {/* Floating Image - Transparent Background */}
                <Link href={`/shop/${product.id}`}>
                  <div className="relative h-96 md:h-[500px] lg:h-[550px] w-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className={`h-full w-auto object-contain drop-shadow-2xl ${
                        product.availability === "out_of_stock" || product.availability === "coming_soon"
                          ? "opacity-40"
                          : "opacity-100"
                      } transition-opacity duration-300`}
                      style={{
                        filter: "drop-shadow(0 20px 25px rgba(0, 0, 0, 0.5))",
                      }}
                    />
                  </div>
                </Link>

                {/* Product Info - Below Floating Image */}
                <div className="text-center w-full">
                  <Link href={`/shop/${product.id}`}>
                    <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-white group-hover:text-neutral-300 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-lg md:text-xl font-bold text-white mt-2">
                    {product.price}
                  </p>

                  {/* Status */}
                  <div className="mt-3">
                    {product.availability === "out_of_stock" ? (
                      <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
                        Out of Stock
                      </span>
                    ) : product.availability === "coming_soon" ? (
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        In Stock
                      </span>
                    )}
                  </div>

                  {/* View Button */}
                  <Link href={`/shop/${product.id}`}>
                    <button className="mt-4 text-xs uppercase font-bold tracking-widest text-white border border-white/30 px-6 py-2 hover:bg-white hover:text-black transition-all duration-300 group-hover:border-white">
                      View Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark gradient overlay at bottom for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}
      />
    </div>
  )
}
