"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { BackgroundSlideshow } from "@/components/background-slideshow"
import { BackgroundAudio } from "@/components/background-audio"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, Instagram, Twitter } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields")
      return
    }

    setSubmitting(true)
    try {
      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Message sent successfully!")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast.error("Failed to send message")
    } finally {
      setSubmitting(false)
    }
  }

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
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="text-center space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white">
                CONTACT
              </h1>
              <p className="text-lg md:text-xl text-white/70 tracking-wide font-light">
                Get in Touch
              </p>
            </div>

            {/* Contact Info & Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Email */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-bold uppercase tracking-wider text-white">Email</h3>
                  </div>
                  <a href="mailto:info@mahide.com" className="text-white/70 hover:text-white transition-colors">
                    info@mahide.com
                  </a>
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-bold uppercase tracking-wider text-white">WhatsApp</h3>
                  </div>
                  <a
                    href="https://wa.me/2347049146832"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    +234 704 914 6832
                  </a>
                </div>

                {/* Social */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold uppercase tracking-wider text-white">Follow Us</h3>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6 backdrop-blur-md bg-black/20 p-8 rounded-lg border border-white/10"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/70">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 rounded focus:outline-none focus:border-white/50 transition-colors"
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/70">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 rounded focus:outline-none focus:border-white/50 transition-colors"
                    disabled={submitting}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/70">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 rounded focus:outline-none focus:border-white/50 transition-colors resize-none"
                    disabled={submitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </motion.form>
            </div>
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
