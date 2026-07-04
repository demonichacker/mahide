"use client"

import { useCart } from "@/context/cart-context"
import { motion } from "framer-motion"
import { BackgroundSlideshow } from "@/components/background-slideshow"
import { BackgroundAudio } from "@/components/background-audio"
import Link from "next/link"
import { ShoppingBag, Plus, Minus, X as XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)

  const handleCheckout = async () => {
    if (items.length === 0) return

    setCheckingOut(true)
    try {
      // Simulate checkout
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Order placed successfully! Please check WhatsApp for confirmation.")
      clearCart()
      // Redirect or show success message
    } catch (error) {
      toast.error("Checkout failed. Please try again.")
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Cinematic Background */}
      <BackgroundSlideshow />
      <BackgroundAudio />

      {/* Content */}
      <section className="relative z-10 py-32 px-4 min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          {items.length === 0 ? (
            /* Empty Cart State */
            <motion.div
              className="flex flex-col items-center justify-center gap-8 text-center py-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ShoppingBag className="w-16 h-16 text-white/40 mx-auto" strokeWidth={1} />
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Your Bag is Empty
              </motion.h1>

              <motion.p
                className="text-lg text-white/60 max-w-md font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Looks like you haven't added anything yet. Discover the latest collection.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link href="/shop">
                  <button className="px-12 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors text-sm md:text-base">
                    Continue Shopping
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            /* Full Cart State */
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Cart Items - Left Column */}
              <div className="lg:col-span-2 space-y-8">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Your Bag</h1>

                <div className="space-y-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="backdrop-blur-md bg-white/5 border border-white/10 p-6 rounded-lg flex flex-col sm:flex-row gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {/* Product Image */}
                      <div className="w-full sm:w-32 h-32 flex items-center justify-center bg-black/20 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-2">
                            {item.name}
                          </h3>
                          <div className="space-y-1 text-sm text-white/60">
                            {item.color && <p>Color: {item.color}</p>}
                            {item.size && <p>Size: {item.size}</p>}
                          </div>
                        </div>

                        {/* Quantity & Remove */}
                        <div className="flex items-center justify-between pt-4">
                          <div className="flex items-center gap-3 border border-white/20 rounded px-3 py-2">
                            <button
                              onClick={() => updateQuantity(`${item.id}-${item.color}-${item.size}`, item.quantity - 1)}
                              className="text-white/60 hover:text-white transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-white font-semibold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(`${item.id}-${item.color}-${item.size}`, item.quantity + 1)}
                              className="text-white/60 hover:text-white transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(`${item.id}-${item.color}-${item.size}`)}
                            className="text-white/60 hover:text-red-400 transition-colors"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">{item.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Checkout Summary - Right Column */}
              <motion.div
                className="backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-lg h-fit sticky top-32 space-y-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Order Summary</h2>

                <div className="space-y-4 border-t border-white/10 pt-6">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-white border-t border-white/10 pt-6">
                    <span>Total</span>
                    <span>{cartTotal}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full h-14 bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200 disabled:opacity-50 transition-colors text-sm md:text-base"
                >
                  {checkingOut ? "Processing..." : "Proceed to Checkout"}
                </button>

                <Link href="/shop">
                  <button className="w-full h-12 border border-white/30 text-white font-semibold uppercase tracking-wider hover:bg-white/5 transition-colors text-sm">
                    Continue Shopping
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          )}
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
