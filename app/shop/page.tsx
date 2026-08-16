"use client"

import { products } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

const categories = [
  { id: "all", label: "All Items", comingSoon: false },
  { id: "t-shirts", label: "T-Shirts", comingSoon: false },
  { id: "long-sleeves", label: "Long Sleeves", comingSoon: true },
  { id: "hoodies", label: "Hoodies", comingSoon: true },
  { id: "pants", label: "Pants", comingSoon: true },
  { id: "accessories", label: "Accessories", comingSoon: true },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Shop Header */}
      <section className="pt-24 pb-12 px-4 text-center border-b border-neutral-100">
        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          SHOP
        </motion.h1>
        <motion.p
          className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto font-light tracking-wide mt-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Premium unisex streetwear. The full collection.
        </motion.p>

        {/* Categories Bar */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-black text-white shadow-md"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <span>{cat.label}</span>
              {cat.comingSoon && (
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-black/10 text-neutral-600">
                  Soon
                </span>
              )}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="px-4 py-16 pb-32">
        <div className="max-w-7xl mx-auto">
          {selectedCategory !== "all" && selectedCategory !== "t-shirts" ? (
            /* Coming soon category message */
            <motion.div
              className="flex flex-col items-center justify-center text-center py-20 space-y-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="text-4xl">✨</span>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-black">
                {categories.find((c) => c.id === selectedCategory)?.label} Collection
              </h3>
              <p className="text-neutral-500 font-medium text-sm md:text-base max-w-md">
                This collection is currently in production and coming soon. Follow our Instagram for drop release alerts.
              </p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-neutral-800 transition-colors"
              >
                View Available Products
              </button>
            </motion.div>
          ) : (
            /* Products list */
            <div className="flex flex-wrap justify-center gap-12 md:gap-16">
              {products
                .filter((p) => p.availability !== "out_of_stock")
                .map((product, index) => (
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
                          className="h-full w-auto object-contain opacity-100 transition-opacity duration-300"
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
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                          In Stock
                        </span>
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
          )}
        </div>
      </section>
    </div>
  )
}
