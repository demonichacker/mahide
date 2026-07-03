"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"

const availabilityBadge = (availability?: string) => {
  if (availability === "out_of_stock") {
    return (
      <span className="absolute top-3 left-3 z-10 text-xs font-bold uppercase tracking-widest bg-red-900/90 text-red-200 px-3 py-1 rounded-sm">
        Out of Stock
      </span>
    )
  }
  if (availability === "coming_soon") {
    return (
      <span className="absolute top-3 left-3 z-10 text-xs font-bold uppercase tracking-widest bg-foreground/80 text-background px-3 py-1 rounded-sm">
        Coming Soon
      </span>
    )
  }
  return null
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Shop Header */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Unisex Shop
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Premium, timeless, and completely unisex streetwear. Crafted for anyone who values quality, comfort, and bold simplicity.
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card className="group overflow-hidden border-border/50 hover:border-foreground/20 transition-all duration-300 bg-card h-full flex flex-col justify-between">
                  <div>
                    <Link href={`/shop/${product.id}`}>
                      <div className="relative overflow-hidden aspect-[3/4] cursor-pointer">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${product.availability === "out_of_stock" || product.availability === "coming_soon" ? "opacity-60" : ""}`}
                        />
                        {availabilityBadge(product.availability)}
                      </div>
                    </Link>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold tracking-tight text-balance group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xl font-bold mt-2">{product.price}</p>
                      <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                        {product.description}
                      </p>
                    </CardContent>
                  </div>
                  <div className="p-6 pt-0">
                    <Link href={`/shop/${product.id}`}>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent hover:bg-foreground hover:text-background transition-colors duration-300"
                        disabled={product.availability === "out_of_stock"}
                      >
                        {product.availability === "out_of_stock"
                          ? "Out of Stock"
                          : product.availability === "coming_soon"
                          ? "Coming Soon"
                          : "View Details"}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
