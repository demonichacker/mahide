"use client"
import { Card } from "@/components/ui/card"
import { collections } from "@/lib/data"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Collections
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our curated collections of premium streetwear. Each piece is designed to elevate your style with
            confidence and sophistication.
          </motion.p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/collections/${collection.slug}`}>
                  <Card className="group relative overflow-hidden border-border/50 hover:border-foreground/20 transition-all duration-300 cursor-pointer">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
                      <img
                        src={collection.image || "/placeholder.svg"}
                        alt={collection.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-8 space-y-2">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{collection.name}</h2>
                        <p className="text-muted-foreground text-sm md:text-base">{collection.description}</p>
                        <div className="pt-2">
                          <span className="text-sm font-medium group-hover:underline underline-offset-4">
                            View Collection →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
