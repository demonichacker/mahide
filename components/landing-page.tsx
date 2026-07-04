"use client"

import { motion } from "framer-motion"
import { BackgroundSlideshow } from "./background-slideshow"
import { BackgroundAudio } from "./background-audio"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function LandingPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between items-center">
      {/* Background Slideshow */}
      <BackgroundSlideshow />

      {/* Background Audio */}
      <BackgroundAudio />

      {/* Main Content - Centered */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 px-4 gap-12">
        {/* Brand Statement */}
        <motion.div
          className="text-center max-w-2xl space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-tight">
            MAHIDE
          </h1>
          <p className="text-sm md:text-lg font-light tracking-widest text-white/70 uppercase">
            Modern Fashion. Timeless Confidence.
          </p>
        </motion.div>

        {/* Main CTA Button */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link href="/shop">
            <motion.button
              className="relative w-full h-16 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:border-white/60 transition-all duration-300 flex items-center justify-between px-6 md:px-8 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Text */}
              <span className="text-base md:text-lg font-black tracking-widest text-white uppercase">
                View Collections
              </span>

              {/* Arrow Icon Button */}
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 ml-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 0 }}
                initial={{ rotate: 0 }}
              >
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-black" strokeWidth={3} />
              </motion.div>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Dark Gradient Overlay - Top to Bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  )
}
