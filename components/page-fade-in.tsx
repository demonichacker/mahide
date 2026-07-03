"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PageFadeInProps {
  children: ReactNode
}

export function PageFadeIn({ children }: PageFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
