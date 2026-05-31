"use client"

import { Instagram, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

const whatsappNumber = "2347049146832"
const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%20want%20to%20order%20from%20MAHIDE%20COLLECTION`

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/50 py-12 px-4">
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
              <button 
                type="button"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
                onClick={() => window.open("https://instagram.com", "_blank")}
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button 
                type="button"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
                onClick={() => window.open("https://facebook.com", "_blank")}
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button 
                type="button"
                aria-label="Follow us on Twitter"
                className="w-10 h-10 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
                onClick={() => window.open("https://twitter.com", "_blank")}
              >
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MAHIDE COLLECTION. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
