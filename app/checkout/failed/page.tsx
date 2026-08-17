"use client"

import Link from "next/link"
import { XCircle, RefreshCw, ShoppingBag, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function CheckoutFailedPage() {
  return (
    <div className="min-h-screen bg-white text-black pt-20 flex items-center justify-center">
      <div className="max-w-md mx-auto w-full px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-200 shadow-sm"
        >
          <XCircle className="w-10 h-10" strokeWidth={2} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 px-4 py-1.5 rounded-full border border-red-200">
            Payment Cancelled / Incomplete
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-black">
            Transaction Not Completed
          </h1>
          <p className="text-neutral-500 font-light text-sm md:text-base max-w-sm mx-auto">
            Your payment was not completed. Don't worry, your cart and delivery details are still saved.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col gap-3"
        >
          <Link href="/cart">
            <button className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 rounded-full">
              <RefreshCw className="w-4 h-4" />
              Return to Cart & Try Again
            </button>
          </Link>

          <Link href="/shop">
            <button className="w-full py-3 border border-neutral-200 text-neutral-600 text-xs font-bold uppercase tracking-widest hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2 rounded-full">
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
