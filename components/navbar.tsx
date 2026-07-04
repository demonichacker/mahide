"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Grid3x3, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { CollectionMenu } from "./collection-menu"
import { useCart } from "@/context/cart-context"
import { motion } from "framer-motion"

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [collectionMenuOpen, setCollectionMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cartCount } = useCart()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/" className="text-xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
                MAHIDE
              </Link>
            </motion.div>

            {/* Center: Empty (Minimalist) */}
            <div className="hidden md:block" />

            {/* Right: Collection & Cart Buttons + Mobile Menu */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Drops Label - Desktop Only */}
              <motion.div
                className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Drops
              </motion.div>

              {/* Collection Button - Desktop */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onClick={() => setCollectionMenuOpen(!collectionMenuOpen)}
                className="hidden md:flex w-12 h-12 items-center justify-center border border-white/30 hover:border-white/60 text-white/60 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <Grid3x3 className="w-5 h-5" strokeWidth={1.5} />
              </motion.button>

              {/* Cart Button - Desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link href="/cart">
                  <button className="hidden md:flex relative w-12 h-12 items-center justify-center border border-white/30 hover:border-white/60 text-white/60 hover:text-white transition-all duration-300 hover:scale-105">
                    <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-xs font-bold rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white hover:opacity-80 transition-opacity"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-black/40 backdrop-blur-md border-b border-white/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-3 py-3 rounded text-sm font-semibold uppercase tracking-widest transition-colors",
                    pathname === link.href
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Cart Link */}
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-3 rounded text-sm font-semibold uppercase tracking-widest text-white/60 hover:bg-white/5 hover:text-white transition-colors"
              >
                <span>Cart</span>
                {cartCount > 0 && <span className="bg-white text-black text-xs px-2 py-0.5 rounded-full">{cartCount}</span>}
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Collection Menu Overlay */}
      <CollectionMenu isOpen={collectionMenuOpen} onClose={() => setCollectionMenuOpen(false)} />
    </>
  )
}
