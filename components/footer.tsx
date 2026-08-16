"use client"

import { Instagram, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const whatsappNumber = "2347049146832"
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%20want%20to%20order%20from%20MAHIDE%20COLLECTION`

const instagramUrl = "https://www.instagram.com/mahidecollection?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
const tiktokUrl = "https://www.tiktok.com/@mahide.collection?is_from_webapp=1&sender_device=pc"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/50 py-12 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">MAHIDE COLLECTION</h3>
            <p className="text-muted-foreground">Modern Streetwear. Timeless Confidence.</p>
          </div>
          <div id="about" className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <Button
              variant="outline"
              className="w-fit bg-transparent"
              onClick={() => window.open(whatsappLink, "_blank")}
            >
              WhatsApp: 07049146832
            </Button>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex gap-4">
              {/* Instagram */}
              <button 
                type="button"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors text-foreground"
                onClick={() => window.open(instagramUrl, "_blank")}
              >
                <Instagram className="w-5 h-5" />
              </button>

              {/* TikTok */}
              <button 
                type="button"
                aria-label="Follow us on TikTok"
                className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors text-foreground"
                onClick={() => window.open(tiktokUrl, "_blank")}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.883 2.884 2.888 2.888 0 0 1-2.885-2.884 2.887 2.887 0 0 1 2.885-2.883c.277 0 .54.043.788.118v-3.53a6.31 6.31 0 0 0-.788-.05 6.327 6.327 0 0 0-6.324 6.349 6.326 6.326 0 0 0 6.324 6.348 6.326 6.326 0 0 0 6.325-6.348V9.117a8.163 8.163 0 0 0 4.773 1.528V7.2a4.78 4.78 0 0 1-1.005-.514z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} MAHIDE COLLECTION. All rights reserved.</span>
          <Link href="/admin">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs hover:text-foreground transition-colors opacity-50 hover:opacity-100"
              title="Admin Panel"
            >
              <Settings className="w-3 h-3" />
              Admin
            </button>
          </Link>
        </div>
      </div>
    </footer>
  )
}
