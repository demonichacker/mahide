"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Unlock, ArrowRight, Check, X, Twitter, Instagram, Send, Phone } from "lucide-react"
import { BackgroundSlideshow } from "./background-slideshow"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface WaitlistPageProps {
  countdownTarget: string | null
  onBypassSuccess: () => void
}

export function WaitlistPage({ countdownTarget, onBypassSuccess }: WaitlistPageProps) {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  // Password bypass state
  const [passwordMode, setPasswordMode] = useState(false)
  const [password, setPassword] = useState("")
  const [verifyingPassword, setVerifyingPassword] = useState(false)

  // Registration state
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [registered, setRegistered] = useState(false)

  // Calculate countdown
  useEffect(() => {
    const targetTime = countdownTarget ? new Date(countdownTarget).getTime() : Date.now() + 7 * 24 * 60 * 60 * 1000

    const updateTimer = () => {
      const now = Date.now()
      const difference = targetTime - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [countdownTarget])

  // Handle password bypass submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) return

    setVerifyingPassword(true)
    try {
      const res = await fetch("/api/settings/verify-bypass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        toast.success("Access Granted")
        localStorage.setItem("mahide_waitlist_bypass", "true")
        onBypassSuccess()
      } else {
        toast.error(data.error || "Incorrect password")
      }
    } catch (err) {
      toast.error("Verification failed")
    } finally {
      setVerifyingPassword(false)
    }
  }

  // Handle waitlist signup submission
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !email || !phoneNumber) {
      toast.error("Please fill in all fields")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, phoneNumber }),
      })

      const data = await res.json()
      if (res.ok) {
        toast.success("Successfully joined the list!")
        setRegistered(true)
      } else {
        toast.error(data.error || "Failed to join")
      }
    } catch (err) {
      toast.error("Registration error, try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-white flex flex-col justify-between">
      {/* Background Slideshow component */}
      <BackgroundSlideshow />

      {/* Main Grid: 3 columns on desktop, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen w-full relative z-10">
        
        {/* Left Column (Desktop only, translucent) */}
        <div className="hidden md:block bg-black/10 border-r border-white/5" />

        {/* Center Column (Form & Details Container) */}
        <div className="flex flex-col justify-between px-6 py-12 md:px-10 bg-neutral-950/95 md:bg-neutral-950/85 backdrop-blur-md border-x border-white/5 min-h-screen">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black tracking-widest text-white">MAHIDE</h1>
            
            {/* Enter with password toggle */}
            <button
              onClick={() => setPasswordMode(!passwordMode)}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm cursor-pointer"
            >
              {passwordMode ? (
                <>
                  <X className="w-3 h-3" />
                  Close
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3" />
                  Enter Using Password
                </>
              )}
            </button>
          </div>

          {/* Core Content Box */}
          <div className="my-auto py-8 space-y-12">
            
            {/* Passcode Mode Screen */}
            <AnimatePresence mode="wait">
              {passwordMode ? (
                <motion.div
                  key="password-screen"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-5 h-5 text-neutral-300" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Locked Drop</h2>
                    <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                      Enter password to bypass the waitlist check and browse the website shop.
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-sm mx-auto">
                    <input
                      type="password"
                      placeholder="ENTER PASSWORD"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-neutral-900 border border-white/15 rounded h-12 px-4 text-center text-sm font-medium tracking-widest placeholder-neutral-500 uppercase focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-white"
                      disabled={verifyingPassword}
                      autoFocus
                    />
                    <Button
                      type="submit"
                      disabled={verifyingPassword}
                      className="w-full h-12 uppercase text-xs font-bold tracking-widest bg-white text-black hover:bg-neutral-200 transition-colors"
                    >
                      {verifyingPassword ? "Verifying..." : "Access Site"}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                
                /* Standard Waitlist Screen */
                <motion.div
                  key="signup-screen"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-10"
                >
                  {/* Countdown Timer */}
                  <div className="text-center space-y-4">
                    <h2 className="text-xs font-black tracking-[0.2em] uppercase text-neutral-400">Next drop in</h2>
                    
                    {/* Time units grid */}
                    <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                      <div className="bg-neutral-900/60 border border-white/5 rounded-md p-3 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold font-mono text-white leading-none">{timeLeft.days}</div>
                        <div className="text-[8px] uppercase tracking-wider text-neutral-500 mt-1.5">Days</div>
                      </div>
                      <div className="bg-neutral-900/60 border border-white/5 rounded-md p-3 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold font-mono text-white leading-none">{timeLeft.hours}</div>
                        <div className="text-[8px] uppercase tracking-wider text-neutral-500 mt-1.5">Hours</div>
                      </div>
                      <div className="bg-neutral-900/60 border border-white/5 rounded-md p-3 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold font-mono text-white leading-none">{timeLeft.minutes}</div>
                        <div className="text-[8px] uppercase tracking-wider text-neutral-500 mt-1.5">Min</div>
                      </div>
                      <div className="bg-neutral-900/60 border border-white/5 rounded-md p-3 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold font-mono text-white leading-none">{timeLeft.seconds}</div>
                        <div className="text-[8px] uppercase tracking-wider text-neutral-500 mt-1.5">Sec</div>
                      </div>
                    </div>
                  </div>

                  {/* Form Box */}
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-bold tracking-tight">Join The Drop List</h3>
                      <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                        Be the first to get notified and gain early checkout access when the store opens.
                      </p>
                    </div>

                    {registered ? (
                      /* Success state */
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-neutral-900/60 border border-green-500/20 rounded p-6 text-center space-y-4 max-w-sm mx-auto backdrop-blur-sm"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
                          <Check className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold">You are on the list!</h4>
                          <p className="text-xs text-neutral-400">
                            We'll text and email you early access as soon as the site opens back up.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      /* Form layout */
                      <form onSubmit={handleSignupSubmit} className="space-y-3.5 max-w-sm mx-auto">
                        <input
                          type="text"
                          placeholder="FIRST NAME"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full bg-neutral-900/80 border border-white/10 rounded h-11 px-4 text-xs font-semibold tracking-wider placeholder-neutral-500 uppercase focus:outline-none focus:border-white transition-all text-white"
                          disabled={submitting}
                          required
                        />
                        <input
                          type="email"
                          placeholder="EMAIL ADDRESS"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-neutral-900/80 border border-white/10 rounded h-11 px-4 text-xs font-semibold tracking-wider placeholder-neutral-500 uppercase focus:outline-none focus:border-white transition-all text-white"
                          disabled={submitting}
                          required
                        />
                        <input
                          type="tel"
                          placeholder="PHONE NUMBER"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-neutral-900/80 border border-white/10 rounded h-11 px-4 text-xs font-semibold tracking-wider placeholder-neutral-500 uppercase focus:outline-none focus:border-white transition-all text-white"
                          disabled={submitting}
                          required
                        />
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full h-11 uppercase text-xs font-bold tracking-widest bg-white text-black hover:bg-neutral-200 transition-colors"
                        >
                          {submitting ? "Signing up..." : "Join List"}
                        </Button>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Socials */}
          <div className="flex flex-col items-center gap-4 text-neutral-500">
            <div className="flex items-center gap-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/2347049146832"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[8px] uppercase tracking-widest text-neutral-600">
              &copy; {new Date().getFullYear()} MAHIDE COLLECTION. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>

        {/* Right Column (Desktop only, translucent) */}
        <div className="hidden md:block bg-black/10 border-l border-white/5" />
      </div>
    </div>
  )
}
