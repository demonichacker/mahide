"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  useEffect(() => {
    // Check if the user previously unmuted
    const savedMuted = localStorage.getItem("mahide_audio_muted")
    if (savedMuted === "false") {
      setIsMuted(false)
    }

    // Create audio element
    const audio = new Audio()
    // Determine audio path from settings endpoint, fallback to /bg_track.mp3
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        audio.src = data.audioPath || '/bg_track.mp3'
      })
      .catch(() => {
        audio.src = '/bg_track.mp3'
      })
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    // Fallback: if audio errors, try /audio/bg_track.mp3
    const handleError = () => {
      if (audio.src && audio.src.endsWith('/bg_track.mp3')) {
        console.log('Retrying audio with path /audio/bg_track.mp3')
        audio.src = '/audio/bg_track.mp3'
      }
    }
    audio.addEventListener('error', handleError)

    // Attempt autoplay if not muted
    if (savedMuted === "false") {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasInteracted(true)
            setShowTooltip(false)
          })
          .catch(() => {
            // Autoplay blocked: fall back to muted
            audio.muted = true
            setIsMuted(true)
          })
      }
    }

    // Try playing on first window click to circumvent autoplay blocker if already unmuted
    const handleFirstInteraction = () => {
      if (audioRef.current && !hasInteracted) {
        if (!isMuted) {
          audioRef.current.play().then(() => {
            setHasInteracted(true)
            setShowTooltip(false)
          }).catch(console.error)
        }
      }
    }
    window.addEventListener("click", handleFirstInteraction)

    return () => {
      audio.removeEventListener("error", handleError)
      window.removeEventListener("click", handleFirstInteraction)
      audio.pause()
    }
  }, [])

  const toggleMute = () => {
    if (!audioRef.current) return

    const newMuted = !isMuted
    setIsMuted(newMuted)
    audioRef.current.muted = newMuted
    localStorage.setItem("mahide_audio_muted", String(newMuted))

    if (!newMuted) {
      audioRef.current.play().then(() => {
        setHasInteracted(true)
        setShowTooltip(false)
      }).catch((e) => {
        console.error("Playback blocked:", e)
      })
    } else {
      audioRef.current.pause()
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      {/* Floating Audio Play Indicator */}
      <motion.button
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md shadow-2xl cursor-pointer relative"
        aria-label="Toggle sound"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-neutral-400" />
        ) : (
          <>
            {/* Visual Equalizer Animation */}
            <Volume2 className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -inset-1 rounded-full border border-white/30 animate-ping opacity-70 pointer-events-none" />
          </>
        )}
      </motion.button>

      {/* Tooltip badge "CLICK TO UNMUTE" */}
      <AnimatePresence>
        {showTooltip && isMuted && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded bg-neutral-900/90 text-neutral-200 border border-neutral-800/80 backdrop-blur-sm cursor-pointer shadow-lg select-none"
            onClick={toggleMute}
          >
            Click to Unmute
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
