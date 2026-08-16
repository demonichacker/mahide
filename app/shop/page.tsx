"use client"

import { products } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ShopPage() {
  return (
    <div className="relative min-h-screen w-full bg-white">

      {/* Shop Header */}
      <section className="py-16 px-4 text-center border-b border-neutral-100">
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          SHOP
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto font-light tracking-wide mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Premium unisex streetwear. The full collection.
        </motion.p>
      </section>

      {/* Products Grid */}
      <section className="px-4 py-16 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-12 md:gap-16">
            {products.filter(p => p.availability !== "out_of_stock").map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="flex flex-col items-center group cursor-pointer w-64 md:w-72"
              >
                {/* Product Image */}
                <Link href={`/shop/${product.id}`}>
                  <div className="relative h-80 md:h-[420px] lg:h-[480px] w-full flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className={`h-full w-auto object-contain ${
                        product.availability === "out_of_stock" || product.availability === "coming_soon"
                          ? "opacity-35"
                          : "opacity-100"
                      } transition-opacity duration-300`}
                      style={{
                        filter: "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.12))",
                      }}
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="text-center w-full">
                  <Link href={`/shop/${product.id}`}>
                    <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-black group-hover:text-neutral-500 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-lg md:text-xl font-bold text-black mt-2">
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
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                        In Stock
                      </span>
                    )}
                  </div>

                  {/* View Button */}
                  <Link href={`/shop/${product.id}`}>
                    <button className="mt-4 text-xs uppercase font-bold tracking-widest text-black border border-black/30 px-6 py-2 hover:bg-black hover:text-white transition-all duration-300 group-hover:border-black">
                      View Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
