'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { ProductForm } from '@/components/admin/product-form'
import { ProductList } from '@/components/admin/product-list'

interface Product {
  _id: string
  id: string
  name: string
  price: string
  image: string
  images?: string[]
  description: string
  sizes: string[]
  colors: string[]
  material: string
  careInstructions: string[]
  featured: boolean
  availability: 'in_stock' | 'out_of_stock' | 'coming_soon'
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchProducts()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/products')
      if (response.status === 401) {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/products')
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      toast.success('Logged out successfully')
      router.push('/admin/login')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      let response
      if (editingProduct) {
        response = await fetch('/api/admin/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingProduct._id,
            ...productData,
          }),
        })
      } else {
        response = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        })
      }

      if (!response.ok) throw new Error('Failed to save product')
      
      toast.success(editingProduct ? 'Product updated!' : 'Product created!')
      setShowForm(false)
      setEditingProduct(null)
      await fetchProducts()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save product')
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete product')
      
      toast.success('Product deleted!')
      await fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your products</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            {showForm && (
              <Card className="p-6 sticky top-4">
                <ProductForm
                  product={editingProduct || undefined}
                  onSave={handleSaveProduct}
                  onCancel={() => {
                    setShowForm(false)
                    setEditingProduct(null)
                  }}
                />
              </Card>
            )}
            {!showForm && (
              <Card className="p-6">
                <Button
                  onClick={() => setShowForm(true)}
                  className="w-full"
                  size="lg"
                >
                  + Add New Product
                </Button>
              </Card>
            )}
          </div>

          {/* Products List */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Loading products...</p>
              </Card>
            ) : products.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No products yet. Create one to get started!</p>
              </Card>
            ) : (
              <ProductList
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
