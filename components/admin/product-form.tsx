'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'

interface Product {
  _id?: string
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

interface ProductFormProps {
  product?: Product
  onSave: (product: Partial<Product>) => Promise<void>
  onCancel: () => void
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      id: '',
      name: '',
      price: '',
      image: '',
      images: [],
      description: '',
      sizes: [],
      colors: [],
      material: '',
      careInstructions: [],
      featured: false,
      availability: 'in_stock',
    }
  )

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formDataObj = new FormData()
      formDataObj.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataObj,
      })

      if (!response.ok) {
        const error = await response.json()
        toast({
          title: 'Upload failed',
          description: error.error || 'Failed to upload image',
          variant: 'destructive',
        })
        return
      }

      const data = await response.json()
      setFormData((prev) => ({ ...prev, image: data.url }))
      toast({
        title: 'Success',
        description: 'Main image uploaded successfully',
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleGalleryImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setIsUploading(true)
    const uploadedUrls: string[] = [...(formData.images || [])]

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formDataObj = new FormData()
        formDataObj.append('file', file)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formDataObj,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Failed to upload image')
        }

        const data = await response.json()
        uploadedUrls.push(data.url)
      }

      setFormData((prev) => ({ ...prev, images: uploadedUrls }))
      toast({
        title: 'Success',
        description: `${files.length} image(s) uploaded successfully`,
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload images',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
    }
  }

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayInput = (name: keyof Pick<Product, 'sizes' | 'colors' | 'images' | 'careInstructions'>, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value ? value.split(',').map((item) => item.trim()) : [],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onSave(formData)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="id">Product ID</Label>
        <Input
          id="id"
          name="id"
          value={formData.id || ''}
          onChange={handleInputChange}
          placeholder="e.g., two-tone-polo"
          required
          disabled={!!product}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          placeholder="e.g., MAHIDE Two-Tone Polo"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          value={formData.price || ''}
          onChange={handleInputChange}
          placeholder="e.g., ₦18,000"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Main Image</Label>
        <div className="space-y-2">
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          {formData.image && (
            <div className="relative w-32 h-32">
              <Image
                src={formData.image}
                alt="Main product image"
                fill
                className="object-cover rounded"
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Gallery Images (Upload multiple)</Label>
        <div className="space-y-2">
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryImagesUpload}
            disabled={isUploading}
          />
          {formData.images && formData.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {formData.images.map((url, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={url}
                    alt={`Gallery image ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded flex items-center justify-center text-white text-sm transition-opacity"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          placeholder="Product description"
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="material">Material</Label>
        <Input
          id="material"
          name="material"
          value={formData.material || ''}
          onChange={handleInputChange}
          placeholder="e.g., 100% Premium Cotton"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sizes">Sizes (comma-separated)</Label>
        <Input
          id="sizes"
          value={(formData.sizes || []).join(', ')}
          onChange={(e) => handleArrayInput('sizes', e.target.value)}
          placeholder="S, M, L, XL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="colors">Colors (comma-separated)</Label>
        <Input
          id="colors"
          value={(formData.colors || []).join(', ')}
          onChange={(e) => handleArrayInput('colors', e.target.value)}
          placeholder="Black, White"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="careInstructions">Care Instructions (comma-separated)</Label>
        <Textarea
          id="careInstructions"
          value={(formData.careInstructions || []).join(', ')}
          onChange={(e) => handleArrayInput('careInstructions', e.target.value)}
          placeholder="Machine wash cold, Do not bleach"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="availability">Availability</Label>
        <Select
          value={formData.availability || 'in_stock'}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              availability: value as 'in_stock' | 'out_of_stock' | 'coming_soon',
            }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in_stock">In Stock</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            <SelectItem value="coming_soon">Coming Soon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="featured">Featured</Label>
        <Select
          value={formData.featured ? 'true' : 'false'}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, featured: value === 'true' }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes (Featured)</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1" disabled={isLoading || isUploading}>
          {isLoading ? 'Saving...' : isUploading ? 'Uploading...' : 'Save Product'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isUploading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
