"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { WaitlistPage } from "./waitlist-page"

export function WaitlistGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [waitlistActive, setWaitlistActive] = useState(false)
  const [countdownTarget, setCountdownTarget] = useState<string | null>(null)
  const [isBypassed, setIsBypassed] = useState(false)

  const fetchSettings = async () => {
    try {
      // Exclude admin pages from guard checks entirely
      if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
        setLoading(false)
        return
      }

      // Check if client has waitlist bypass set in localStorage
      const bypass = localStorage.getItem("mahide_waitlist_bypass") === "true"
      if (bypass) {
        setIsBypassed(true)
        setLoading(false)
        return
      }

      const res = await fetch("/api/settings")
      if (res.ok) {
        const data = await res.json()
        setWaitlistActive(data.waitlistActive)
        setCountdownTarget(data.countdownTarget)
      }
    } catch (error) {
      console.error("Failed to load settings:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [pathname])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-neutral-700 border-t-white rounded-full animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neutral-400">Loading MAHIDE...</p>
        </div>
      </div>
    )
  }

  // Bypass the guard on admin routes or if the user has bypassed waitlist
  if (pathname.startsWith("/admin") || pathname.startsWith("/api") || !waitlistActive || isBypassed) {
    return <>{children}</>
  }

  // Show waitlist screen otherwise
  return (
    <WaitlistPage
      countdownTarget={countdownTarget}
      onBypassSuccess={() => setIsBypassed(true)}
    />
  )
}
