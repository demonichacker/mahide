"use client"

import { useState, useEffect, useRef } from "react"
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
  const [isIsland, setIsIsland] = useState(false)
  const pathname = usePathname()
  const { cartCount } = useCart()
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // When scrolled down > 40px, transform into Dynamic Island
      if (currentScrollY > 40) {
        setIsIsland(true)
      } else {
        setIsIsland(false)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-0 sm:p-2">
        <motion.nav
          layout
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className={cn(
            "pointer-events-auto transition-all duration-500 flex items-center justify-between",
            isIsland
              ? "w-[92%] sm:w-auto min-w-[320px] sm:min-w-[480px] md:min-w-[580px] h-12 md:h-14 px-5 md:px-7 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl text-white mt-2"
              : "w-full max-w-full h-16 px-6 sm:px-8 lg:px-12 rounded-none bg-black text-white border-b border-white/10"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-black tracking-tighter hover:opacity-80 transition-opacity"
          >
            <span className={cn(
              "font-black tracking-tighter transition-all text-white",
              isIsland ? "text-base md:text-lg" : "text-xl md:text-2xl"
            )}>
              MAHIDE
            </span>
            {isIsland && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </Link>

          {/* Center Links (Home, Shop, About, Contact) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-extrabold uppercase tracking-widest transition-colors text-white",
                  pathname === link.href ? "opacity-100 underline underline-offset-4" : "opacity-75 hover:opacity-100"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Collection Grid Button */}
            <button
              onClick={() => setCollectionMenuOpen(!collectionMenuOpen)}
              className={cn(
                "flex items-center justify-center transition-all duration-300 hover:scale-105 text-white",
                isIsland
                  ? "w-8 h-8 rounded-full bg-white/10 hover:bg-white/20"
                  : "w-10 h-10 border border-white/30 hover:border-white"
              )}
              title="Browse Collections"
            >
              <Grid3x3 className="w-4 h-4" strokeWidth={1.75} />
            </button>

            {/* Cart Button */}
            <Link href="/cart">
              <button
                className={cn(
                  "relative flex items-center justify-center transition-all duration-300 hover:scale-105",
                  isIsland
                    ? "w-8 h-8 rounded-full bg-white text-black"
                    : "w-10 h-10 border border-white/30 hover:border-white text-white"
                )}
                title="Bag"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={2} />
                {cartCount > 0 && (
                  <span className={cn(
                    "absolute -top-1.5 -right-1.5 text-[10px] font-extrabold rounded-full flex items-center justify-center min-w-[18px] h-[18px] px-1",
                    isIsland ? "bg-red-500 text-white" : "bg-white text-black"
                  )}>
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-1 text-white transition-opacity"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile Menu Modal */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute top-16 left-4 right-4 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl text-white pointer-events-auto md:hidden"
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
