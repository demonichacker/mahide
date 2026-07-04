"use client"

import { motion } from "framer-motion"
import { BackgroundSlideshow } from "@/components/background-slideshow"
import { BackgroundAudio } from "@/components/background-audio"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Cinematic Background Slideshow */}
      <BackgroundSlideshow />

      {/* Background Audio */}
      <BackgroundAudio />

      {/* Back Button */}
      <Link href="/" className="relative z-30 absolute top-20 left-6 flex items-center gap-2 text-white hover:opacity-70 transition-opacity">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-semibold uppercase tracking-widest">Back</span>
      </Link>

      {/* Content Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="text-center space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white">
                ABOUT
              </h1>
              <p className="text-lg md:text-xl text-white/70 tracking-wide font-light">
                MAHIDE COLLECTION
              </p>
            </div>

            {/* About Content */}
            <div className="space-y-8 text-white/80 backdrop-blur-md bg-black/20 p-8 md:p-12 rounded-lg border border-white/10">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
                  Who We Are
                </h2>
                <p className="text-lg leading-relaxed font-light">
                  MAHIDE COLLECTION is a luxury unisex streetwear brand designed for those who demand sophistication, quality, and bold simplicity. We create timeless pieces that transcend traditional fashion boundaries.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
                  Our Mission
                </h2>
                <p className="text-lg leading-relaxed font-light">
                  To craft premium, genderless fashion that empowers individuals to express their authentic selves. Every piece is designed with intention, quality, and artistic vision at its core.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
                  Our Values
                </h2>
                <ul className="space-y-3 text-lg font-light leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">✦</span>
                    <span><strong className="text-white">Quality:</strong> Premium materials and meticulous craftsmanship</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">✦</span>
                    <span><strong className="text-white">Inclusivity:</strong> Unisex designs for everyone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">✦</span>
                    <span><strong className="text-white">Authenticity:</strong> Honest brand storytelling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold">✦</span>
                    <span><strong className="text-white">Innovation:</strong> Pushing fashion boundaries</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">
                  Our Collections
                </h2>
                <p className="text-lg leading-relaxed font-light">
                  Each MAHIDE drop is carefully curated to deliver exceptional quality and timeless design. From premium streetwear to editorial pieces, we create fashion that resonates with those who understand true luxury.
                </p>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="text-center pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/shop">
                <button className="px-12 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors text-sm md:text-base">
                  Shop Now
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}
      />
    </div>
  )
}
