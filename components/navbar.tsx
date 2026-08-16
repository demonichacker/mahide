"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Grid3x3, ShoppingBag, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { CollectionMenu } from "./collection-menu"
import { useCart } from "@/context/cart-context"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { name: "Home", href: "/" },
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
      {/* Permanent Fixed Dynamic Island Navbar */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-3">
        <nav
          className="pointer-events-auto flex items-center justify-between gap-4 sm:gap-6 h-12 md:h-14 px-5 sm:px-7 rounded-full bg-black/95 backdrop-blur-xl border border-white/20 shadow-2xl text-white w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl transition-all duration-300"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-black tracking-tighter hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <span className="font-black tracking-tighter text-white text-base md:text-lg">
              MAHIDE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </Link>

          {/* Center Links (Home, Shop, About, Contact) - Desktop */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-colors text-white",
                  pathname === link.href ? "opacity-100 underline underline-offset-4" : "opacity-70 hover:opacity-100"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Collection Grid Button */}
            <button
              onClick={() => setCollectionMenuOpen(!collectionMenuOpen)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-105"
              title="Browse Collections"
            >
              <Grid3x3 className="w-4 h-4" strokeWidth={1.75} />
            </button>

            {/* Cart Button */}
            <Link href="/cart">
              <button
                className="relative w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-all duration-300 hover:scale-105"
                title="Bag"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-[10px] font-extrabold rounded-full flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-red-500 text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-1 text-white hover:opacity-80 transition-opacity"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown Card */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute top-16 left-4 right-4 bg-black/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 shadow-2xl text-white pointer-events-auto md:hidden max-w-sm mx-auto"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors",
                      pathname === link.href
                        ? "bg-white/15 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-white/40" />
                  </Link>
                ))}

                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white/60 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span>Your Bag</span>
                  {cartCount > 0 && (
                    <span className="bg-white text-black text-xs font-extrabold px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Collection Menu Overlay */}
      <CollectionMenu isOpen={collectionMenuOpen} onClose={() => setCollectionMenuOpen(false)} />
    </>
  )
}
