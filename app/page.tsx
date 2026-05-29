"use client"
import { Button } from "@/components/ui/button"
import { Sparkles, Package, Zap } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { collections } from "@/lib/data"

const whatsappNumber = "2347049146832"
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%20want%20to%20order%20from%20MAHIDE%20COLLECTION`

export default function HomePage() {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroY = useTransform(scrollY, [0, 300], [0, 100])

  const handleOrderClick = (productName: string, productPrice: string) => {
    const message = encodeURIComponent(`Hello! I want to order ${productName} (${productPrice}) from MAHIDE COLLECTION`)
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Animated background layers */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-foreground/5 via-background to-background"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "linear",
          }}
        />

        {/* Floating geometric accent lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 -left-48 w-96 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
            animate={{
              x: [0, 100],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 -right-48 w-96 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
            animate={{
              x: [0, -100],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Main content with scroll parallax */}
        <motion.div
          className="relative z-10 text-center max-w-6xl mx-auto space-y-10"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          {/* Animated headline with staggered letters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                MAHIDE
              </motion.span>
              <motion.span
                className="block relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                COLLECTION
                {/* Subtle glow accent */}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Animated subheadline */}
          <motion.p
            className="text-xl md:text-3xl text-muted-foreground font-light tracking-[0.2em] uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Modern Streetwear. Timeless Confidence.
          </motion.p>

          {/* CTA buttons with hover animations */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/collections">
                <Button size="lg" className="text-base h-14 px-10 relative overflow-hidden group">
                  <span className="relative z-10">View Collection</span>
                  <motion.div
                    className="absolute inset-0 bg-foreground/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="text-base h-14 px-10 bg-transparent backdrop-blur-sm border-foreground/20 hover:bg-foreground/5"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                Order on WhatsApp
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border border-foreground/30 rounded-full flex items-start justify-center p-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div className="w-1 h-2 bg-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">Our Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <Link key={collection.slug} href={`/collections/${collection.slug}`}>
                <motion.div
                  className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="relative z-20 h-full flex flex-col justify-end p-8">
                    <h3 className="text-3xl font-bold mb-2">{collection.name}</h3>
                    <p className="text-muted-foreground text-sm">{collection.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/collections">
              <Button size="lg" variant="outline" className="text-base h-14 px-10 bg-transparent">
                View All Collections
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">About MAHIDE</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            At MAHIDE COLLECTION, we believe fashion is more than clothing—it's a statement of who you are. Our
            carefully curated streetwear pieces blend modern aesthetics with timeless elegance, crafted for those who
            demand quality and simplicity. Every item is designed to elevate your style with confidence and
            sophistication.
          </p>
        </div>
      </section>

      {/* Why MAHIDE Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">Why MAHIDE</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-foreground/5 flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every piece is crafted from the finest materials, ensuring durability and luxury that lasts.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-foreground/5 flex items-center justify-center">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Modern Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Contemporary styles that push boundaries while maintaining timeless elegance and sophistication.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-foreground/5 flex items-center justify-center">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold">Fast WhatsApp Ordering</h3>
              <p className="text-muted-foreground leading-relaxed">
                Order instantly through WhatsApp for a seamless, personal shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">Ready to elevate your style?</h2>
          <Button size="lg" className="text-base h-14 px-10" onClick={() => window.open(whatsappLink, "_blank")}>
            Order on WhatsApp
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight">MAHIDE COLLECTION</h3>
              <p className="text-muted-foreground">Modern Streetwear. Timeless Confidence.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Contact</h4>
              <Button
                variant="outline"
                className="w-fit bg-transparent"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                WhatsApp: 07049146832
              </Button>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Follow Us</h4>
              <div className="flex gap-4">
                {/* Assuming Instagram, Facebook, Twitter icons are still used */}
                {/* Placeholder for social media icons */}
                {/* <button className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </button> */}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MAHIDE COLLECTION. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
