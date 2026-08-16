"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const collections = [
  { name: "T-Shirts", href: "/shop", isComingSoon: false },
  { name: "Long Sleeves", href: "/shop", isComingSoon: true },
  { name: "Hoodies", href: "/shop", isComingSoon: true },
  { name: "Pants", href: "/shop", isComingSoon: true },
  { name: "Accessories", href: "/shop", isComingSoon: true },
  { name: "View All", href: "/shop", isComingSoon: false },
]

interface CollectionMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function CollectionMenu({ isOpen, onClose }: CollectionMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            className="fixed top-24 left-1/2 z-50 -translate-x-1/2 max-w-sm w-[90vw]"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col items-center gap-4 px-8 py-8 backdrop-blur-2xl bg-black/95 rounded-2xl border border-white/20 shadow-2xl">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/40 mb-2">
                Collections
              </span>
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                  className="w-full text-center"
                >
                  <Link
                    href={collection.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-3 text-sm uppercase font-bold tracking-[0.18em] text-white/80 hover:text-white transition-colors relative group py-1.5"
                  >
                    <span>{collection.name}</span>
                    {collection.isComingSoon && (
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-neutral-300 border border-white/15">
                        Coming Soon
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
