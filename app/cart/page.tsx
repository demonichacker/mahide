"use client"

import { useCart } from "@/context/cart-context"
import { motion } from "framer-motion"
import Link from "next/link"
import { ShoppingBag, Plus, Minus, X as XIcon, ArrowLeft, Truck } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import Script from "next/script"

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: any) => { openIframe: () => void }
    }
  }
}

interface DeliveryForm {
  fullName: string
  phone: string
  email: string
  address: string
  location: "lagos" | "outside_lagos" | ""
}

function CheckoutButton({
  form,
  subtotalKobo,
  items,
  onSuccess,
  onClose,
  disabled,
}: {
  form: DeliveryForm
  subtotalKobo: number // in naira
  items: any[]
  onSuccess: () => void
  onClose: () => void
  disabled: boolean
}) {
  const [paystackLoaded, setPaystackLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && window.PaystackPop) {
      setPaystackLoaded(true)
    }
  }, [])

  const deliveryFee = form.location === "lagos" ? 5000 : form.location === "outside_lagos" ? 10000 : 0
  const grandTotalNaira = subtotalKobo + deliveryFee
  const amountInKobo = grandTotalNaira * 100

  const handlePayClick = () => {
    if (!form.fullName.trim()) {
      toast.error("Please enter your full name for delivery")
      return
    }
    if (!form.phone.trim()) {
      toast.error("Please enter your phone number for delivery updates")
      return
    }
    if (!form.email || !form.email.includes("@")) {
      toast.error("Please enter a valid email address for receipt")
      return
    }
    if (!form.location) {
      toast.error("Please select a delivery location (Within Lagos or Outside Lagos)")
      return
    }
    if (!form.address.trim()) {
      toast.error("Please enter your full delivery address")
      return
    }

    if (!window.PaystackPop) {
      toast.error("Paystack payment system loading... Please try again in 3 seconds.")
      return
    }

    const reference = `MAHIDE-${Date.now()}`

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_KEY,
      email: form.email,
      amount: amountInKobo,
      currency: "NGN",
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: form.fullName,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: form.phone,
          },
          {
            display_name: "Delivery Location",
            variable_name: "delivery_location",
            value: form.location === "lagos" ? "Within Lagos (₦5,000)" : "Outside Lagos (₦10,000)",
          },
          {
            display_name: "Delivery Address",
            variable_name: "delivery_address",
            value: form.address,
          },
          {
            display_name: "Purchased Items",
            variable_name: "purchased_items",
            value: items
              .map((i) => `${i.name} [Color: ${i.color || "N/A"}, Size: ${i.size || "N/A"}] x${i.quantity}`)
              .join(" | "),
          },
        ],
      },
      callback: function (response: any) {
        // Save order details to backend API for admin fulfillment
        fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference: response.reference || reference,
            fullName: form.fullName,
            phone: form.phone,
            email: form.email,
            location: form.location === "lagos" ? "Within Lagos" : "Outside Lagos",
            deliveryFee,
            address: form.address,
            items: items.map((i) => ({
              id: i.id,
              name: i.name,
              color: i.color,
              size: i.size,
              quantity: i.quantity,
              price: i.price,
            })),
            subtotal: subtotalKobo,
            totalAmount: grandTotalNaira,
          }),
        }).catch((err) => console.error("Error saving order:", err))

        onSuccess()
      },
      onClose: function () {
        onClose()
      },
    })

    handler.openIframe()
  }

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        onLoad={() => setPaystackLoaded(true)}
      />
      <button
        onClick={handlePayClick}
        disabled={disabled}
        className="w-full h-14 bg-black text-white font-bold uppercase tracking-wider hover:bg-neutral-800 disabled:opacity-40 transition-colors text-sm md:text-base rounded-none cursor-pointer"
      >
        Pay ₦{grandTotalNaira.toLocaleString("en-NG")} with Paystack
      </button>
    </>
  )
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotalAmount, clearCart } = useCart()
  const [form, setForm] = useState<DeliveryForm>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    location: "",
  })

  const subtotalNaira = cartTotalAmount / 100
  const deliveryFee = form.location === "lagos" ? 5000 : form.location === "outside_lagos" ? 10000 : 0
  const grandTotalNaira = subtotalNaira + deliveryFee

  const handleSuccess = () => {
    toast.success("🎉 Payment successful! Your order has been placed. Check your email for details.")
    clearCart()
  }

  const handleClose = () => {
    toast("Payment window closed. Your cart and delivery info are still saved.")
  }

  return (
    <div className="min-h-screen w-full bg-white text-black">
      {/* Header */}
      <div className="border-b border-neutral-100 py-6 px-4 flex items-center gap-4">
        <Link href="/shop" className="flex items-center gap-2 text-black hover:opacity-60 transition-opacity">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold uppercase tracking-widest">Back to Shop</span>
        </Link>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto w-full">
          {items.length === 0 ? (
            /* Empty Cart State */
            <motion.div
              className="flex flex-col items-center justify-center gap-8 text-center py-24"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ShoppingBag className="w-16 h-16 text-neutral-300 mx-auto" strokeWidth={1} />

              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-black">
                  Your Bag is Empty
                </h1>
                <p className="text-lg text-neutral-500 max-w-md font-light">
                  Looks like you haven't added anything yet. Discover the collection.
                </p>
              </div>

              <Link href="/shop">
                <button className="px-12 py-4 bg-black text-white font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors text-sm">
                  Continue Shopping
                </button>
              </Link>
            </motion.div>
          ) : (
            /* Full Cart */
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Cart Items & Delivery Info Left Column */}
              <div className="lg:col-span-2 space-y-10">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black">Your Bag</h1>

                {/* Items list */}
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.color}-${item.size}`}
                      className="border border-neutral-100 p-5 rounded-lg flex flex-col sm:flex-row gap-5 bg-white shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                      {/* Product Image */}
                      <div className="w-full sm:w-28 h-28 flex items-center justify-center bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-bold uppercase tracking-wider text-black mb-1">
                            {item.name}
                          </h3>
                          <div className="space-y-0.5 text-sm text-neutral-500">
                            {item.color && <p>Color: <span className="font-semibold text-black">{item.color}</span></p>}
                            {item.size && <p>Size: <span className="font-semibold text-black">{item.size}</span></p>}
                          </div>
                        </div>

                        {/* Quantity & Remove */}
                        <div className="flex items-center justify-between pt-3">
                          <div className="flex items-center gap-3 border border-neutral-200 rounded px-3 py-2">
                            <button
                              onClick={() => updateQuantity(`${item.id}-${item.color}-${item.size}`, item.quantity - 1)}
                              className="text-neutral-400 hover:text-black transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-black font-semibold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(`${item.id}-${item.color}-${item.size}`, item.quantity + 1)}
                              className="text-neutral-400 hover:text-black transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(`${item.id}-${item.color}-${item.size}`)}
                            className="text-neutral-300 hover:text-red-500 transition-colors"
                          >
                            <XIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-black">{item.price}</p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-neutral-400 mt-1">× {item.quantity}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Delivery Information Form */}
                <div className="border border-neutral-200 p-6 md:p-8 rounded-lg bg-neutral-50 space-y-6">
                  <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                    <Truck className="w-6 h-6 text-black" />
                    <div>
                      <h2 className="text-lg font-bold uppercase tracking-wider text-black">Delivery Details</h2>
                      <p className="text-xs text-neutral-500">Please provide your shipping information</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full border border-neutral-200 bg-white rounded px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="08012345678"
                        className="w-full border border-neutral-200 bg-white rounded px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full border border-neutral-200 bg-white rounded px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  {/* Delivery Location Options */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                      Delivery Location *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, location: "lagos" })}
                        className={`p-4 rounded border text-left flex items-center justify-between transition-all ${
                          form.location === "lagos"
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-neutral-200 hover:border-black"
                        }`}
                      >
                        <div>
                          <p className="font-bold text-sm">Within Lagos</p>
                          <p className={`text-xs ${form.location === "lagos" ? "text-neutral-300" : "text-neutral-500"}`}>
                            Standard Lagos Delivery
                          </p>
                        </div>
                        <span className="font-bold text-sm">₦5,000</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setForm({ ...form, location: "outside_lagos" })}
                        className={`p-4 rounded border text-left flex items-center justify-between transition-all ${
                          form.location === "outside_lagos"
                            ? "bg-black text-white border-black"
                            : "bg-white text-black border-neutral-200 hover:border-black"
                        }`}
                      >
                        <div>
                          <p className="font-bold text-sm">Outside Lagos</p>
                          <p className={`text-xs ${form.location === "outside_lagos" ? "text-neutral-300" : "text-neutral-500"}`}>
                            Interstate Shipping
                          </p>
                        </div>
                        <span className="font-bold text-sm">₦10,000</span>
                      </button>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-700">
                      Delivery Address *
                    </label>
                    <textarea
                      rows={3}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Enter house number, street name, area, and state"
                      className="w-full border border-neutral-200 bg-white rounded px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Right Column */}
              <motion.div
                className="border border-neutral-200 p-8 rounded-lg h-fit sticky top-28 space-y-6 shadow-sm bg-white"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold uppercase tracking-wider text-black">Order Summary</h2>

                <div className="space-y-3 border-t border-neutral-100 pt-5">
                  <div className="flex justify-between text-neutral-500 text-sm">
                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="font-semibold text-black">₦{subtotalNaira.toLocaleString("en-NG")}</span>
                  </div>

                  <div className="flex justify-between text-neutral-500 text-sm">
                    <span>Delivery</span>
                    <span className="font-semibold text-black">
                      {form.location === "lagos"
                        ? "₦5,000"
                        : form.location === "outside_lagos"
                        ? "₦10,000"
                        : "Select location"}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-black border-t border-neutral-100 pt-4">
                    <span>Total</span>
                    <span className="text-xl font-black">₦{grandTotalNaira.toLocaleString("en-NG")}</span>
                  </div>
                </div>

                {/* Paystack Checkout */}
                <CheckoutButton
                  form={form}
                  subtotalKobo={subtotalNaira}
                  items={items}
                  onSuccess={handleSuccess}
                  onClose={handleClose}
                  disabled={items.length === 0}
                />

                <Link href="/shop">
                  <button className="w-full h-11 border border-neutral-200 text-black font-semibold uppercase tracking-wider hover:bg-neutral-50 transition-colors text-sm rounded-none">
                    Continue Shopping
                  </button>
                </Link>

                <p className="text-xs text-neutral-400 text-center">
                  Secured by Paystack · 256-bit SSL encryption
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
