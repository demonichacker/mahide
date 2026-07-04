"use client"

import { useEffect, useState } from "react"

const images = ["/bg1.jpg","/bg2.jpg","/bg3.jpg","/bg4.jpg","/bg5.jpg","/bg6.jpg","/bg7.jpg","/bg8.jpg"]

export function BackgroundSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(i => (i + 1) % images.length), 5000)
    return () => clearInterval(t)
  }, [])

  const col1 = images[current]
  const col2 = images[(current + 1) % images.length]
  const col3 = images[(current + 2) % images.length]

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-neutral-950">
      {/* Desktop: 3 portrait columns, smooth fade */}
      <div className="hidden md:flex h-full w-full">
        {[col1, col2, col3].map((src, i) => (
          <div key={i} className="relative flex-1 overflow-hidden">
            {images.map((img) => (
              <div
                key={img}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${img})`,
                  opacity: src === img ? 0.72 : 0,
                  transition: "opacity 1.8s ease-in-out",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: single image, smooth fade */}
      <div className="md:hidden h-full w-full relative">
        {images.map((img) => (
          <div
            key={img}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
              opacity: images[current] === img ? 0.72 : 0,
              transition: "opacity 1.8s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* Bottom fade for text contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)" }}
      />
    </div>
  )
}
