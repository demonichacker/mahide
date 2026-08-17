"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, ShoppingBag, ArrowRight, Package, Truck, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { Suspense } from "react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const ref = searchParams.get("ref") || searchParams.get("reference") || `MAHIDE-${Date.now()}`
  const email = searchParams.get("email") || ""
  const name = searchParams.get("name") || "Valued Customer"

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-16 md:py-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-20 h-20 md:w-24 md:h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200 shadow-sm"
      >
        <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12" strokeWidth={2} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-3"
      >
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
          Payment Successful
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black">
          Thank You, {name}!
        </h1>
        <p className="text-neutral-500 font-light text-base md:text-lg max-w-md mx-auto">
          Your order has been confirmed and is now being processed for delivery.
        </p>
      </motion.div>

      {/* Order Reference Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="my-8 p-6 bg-neutral-50 border border-neutral-200 rounded-2xl text-left space-y-4 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 gap-2">
          <div>
            <p className="text-xs uppercase font-bold text-neutral-400 tracking-wider">Transaction Reference</p>
            <p className="text-base font-mono font-bold text-black">{ref}</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider bg-emerald-100/60 px-3 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Confirmed
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-neutral-600 pt-2">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-black flex-shrink-0" />
            <div>
              <p className="font-bold text-black">Order Status</p>
              <p>Preparing for dispatch</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-black flex-shrink-0" />
            <div>
              <p className="font-bold text-black">Domestic Shipping</p>
              <p>5-7 Business Days</p>
            </div>
          </div>
        </div>

        {email && (
          <div className="flex items-center gap-3 text-xs text-neutral-500 pt-2 border-t border-neutral-200">
            <Mail className="w-4 h-4 text-black flex-shrink-0" />
            <span>Confirmation receipt sent to <strong className="text-black">{email}</strong></span>
          </div>
        )}
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link href="/shop">
          <button className="w-full sm:w-auto px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 rounded-full">
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </button>
        </Link>

        <Link href="/">
          <button className="w-full sm:w-auto px-8 py-4 border border-neutral-300 text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 rounded-full">
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <Suspense fallback={<div className="text-center py-20 font-bold uppercase">Loading order receipt...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
