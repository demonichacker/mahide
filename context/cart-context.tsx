"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: string
  color?: string
  size?: string
  quantity: number
  image: string
}

export function getItemKey(item: { id: string; color?: string; size?: string }): string {
  return `${item.id}-${item.color || ""}-${item.size || ""}`
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemKey: string) => void
  updateQuantity: (itemKey: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: string
  cartTotalAmount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "mahide_cart_v1"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Persist cart to localStorage whenever items change after initial load
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (e) {
        console.error("Failed to save cart to localStorage", e)
      }
    }
  }, [items, isLoaded])

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const targetKey = getItemKey(item)
      const existingIndex = prev.findIndex((i) => getItemKey(i) === targetKey)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity,
        }
        return updated
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (itemKey: string) => {
    setItems((prev) => prev.filter((item) => getItemKey(item) !== itemKey))
  }

  const updateQuantity = (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemKey)
    } else {
      setItems((prev) =>
        prev.map((item) => (getItemKey(item) === itemKey ? { ...item, quantity } : item))
      )
    }
  }

  const clearCart = () => {
    setItems([])
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
    } catch (e) {
      // ignore
    }
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotalKobo = items.reduce((sum, item) => {
    const numericPrice = parseInt(item.price.replace(/[^\d]/g, ""), 10) || 0
    return sum + numericPrice * item.quantity
  }, 0)
  const cartTotal = `₦${cartTotalKobo.toLocaleString("en-NG")}`
  const cartTotalAmount = cartTotalKobo * 100 // kobo for Paystack

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        cartTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
