"use client"

import { motion } from "framer-motion"
import { BackgroundSlideshow } from "./background-slideshow"
import { BackgroundAudio } from "./background-audio"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white flex flex-col justify-between">
      {/* Background Slideshow */}
      <BackgroundSlideshow />

      {/* Background Audio */}
      <BackgroundAudio />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            MAHIDE
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-2xl font-light tracking-widest text-neutral-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Modern Fashion. Timeless Confidence.
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Premium, unisex streetwear designed for those who demand sophistication. 
            Discover our exclusive collection of timeless pieces crafted with intention.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/shop">
              <Button className="px-8 py-6 h-auto text-base font-semibold uppercase tracking-wide bg-white text-black hover:bg-neutral-200 transition-colors group">
                Explore Collection
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/#waitlist">
              <Button variant="outline" className="px-8 py-6 h-auto text-base font-semibold uppercase tracking-wide border-white text-white hover:bg-white/10 transition-colors">
                Join Waitlist
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade for text contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)" }}
      />
    </div>
  )
}
