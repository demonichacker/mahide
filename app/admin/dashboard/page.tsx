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
  const [settings, setSettings] = useState<any>(null)
  const [savingSettings, setSavingSettings] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    fetchProducts()
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      if (res.status === 401) return
      const data = await res.json()
      setSettings(data)
    } catch (err) {
      console.error('Failed to load settings', err)
    }
  }

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
          {/* Settings Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-4">
              <h3 className="text-lg font-semibold mb-3">Site Settings</h3>
              {settings ? (
                <div className="space-y-3">
                  <label className="flex items-center justify-between gap-3">
                    <span className="text-sm">Waitlist Active</span>
                    <input
                      type="checkbox"
                      checked={!!settings.active}
                      onChange={(e) => setSettings((s:any)=>({...s, active: e.target.checked}))}
                    />
                  </label>

                  <label className="block text-sm">
                    Bypass Password
                    <input
                      type="text"
                      value={settings.bypassPassword || ''}
                      onChange={(e)=>setSettings((s:any)=>({...s, bypassPassword: e.target.value}))}
                      className="w-full mt-1 p-2 rounded border bg-input"
                    />
                  </label>

                  <label className="block text-sm">
                    Countdown Target (ISO)
                    <input
                      type="datetime-local"
                      value={settings.countdownTarget ? new Date(settings.countdownTarget).toISOString().slice(0,16) : ''}
                      onChange={(e)=>setSettings((s:any)=>({...s, countdownTarget: new Date(e.target.value).toISOString()}))}
                      className="w-full mt-1 p-2 rounded border bg-input"
                    />
                  </label>

                  <label className="block text-sm">
                    Background Audio
                    <div className="flex gap-2 mt-1">
                      <input type="file" accept="audio/*" id="audioUpload" className="" />
                      <button
                        className="px-3 py-2 bg-foreground text-background rounded"
                        onClick={async ()=>{
                          const input: any = document.getElementById('audioUpload')
                          if (!input || !input.files || input.files.length===0) return alert('Select an audio file')
                          const file = input.files[0]
                          const fd = new FormData()
                          fd.append('file', file)
                          const up = await fetch('/api/admin/upload', {method:'POST', body: fd})
                          const data = await up.json()
                          if (!data || !data.url) return alert('Upload failed')
                          setSettings((s:any)=>({...s, audioPath: data.url}))
                          alert('Uploaded and set audio')
                        }}
                      >Upload</button>
                    </div>
                    {settings.audioPath && <div className="text-xs text-muted-foreground mt-1">Current: {settings.audioPath}</div>}
                  </label>

                  <div className="flex gap-2">
                    <button
                      disabled={savingSettings}
                      onClick={async ()=>{
                        try{
                          setSavingSettings(true)
                          const res = await fetch('/api/admin/settings', {
                            method: 'PUT',
                            headers: {'Content-Type':'application/json'},
                            body: JSON.stringify({
                              active: settings.active,
                              bypassPassword: settings.bypassPassword,
                              countdownTarget: settings.countdownTarget,
                              audioPath: settings.audioPath,
                            })
                          })
                          const d = await res.json()
                          if (!res.ok) throw new Error(d.error||'Save failed')
                          alert('Settings saved')
                        }catch(err:any){
                          alert(err.message||'Failed')
                        }finally{setSavingSettings(false)}
                      }}
                      className="px-3 py-2 bg-primary text-white rounded"
                    >Save Settings</button>
                  </div>
                </div>
              ) : (
                <p>Loading settings...</p>
              )}
            </Card>
          </div>
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
