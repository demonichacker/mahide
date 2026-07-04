"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const collections = [
  { name: "Long Sleeves", href: "/shop" },
  { name: "T-Shirts", href: "/shop" },
  { name: "Hoodies", href: "/shop" },
  { name: "Pants", href: "/shop" },
  { name: "Accessories", href: "/shop" },
  { name: "View All", href: "/shop" },
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
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            className="fixed top-32 left-1/2 z-50 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-6 px-8 py-8 backdrop-blur-md bg-black/10 rounded-lg border border-white/10">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={collection.href}
                    onClick={onClose}
                    className="text-xs uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors relative group"
                  >
                    {collection.name}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
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
