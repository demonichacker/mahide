'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2, Edit2 } from 'lucide-react'

interface Product {
  _id: string
  id: string
  name: string
  price: string
  image: string
  featured: boolean
  availability: 'in_stock' | 'out_of_stock' | 'coming_soon'
}

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

const availabilityColors = {
  in_stock: 'bg-green-500/20 text-green-700 border-green-300',
  out_of_stock: 'bg-red-500/20 text-red-700 border-red-300',
  coming_soon: 'bg-blue-500/20 text-blue-700 border-blue-300',
}

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product._id} className="p-4 border">
          <div className="flex gap-4">
            {/* Product Image */}
            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.id}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant="outline">{product.price}</Badge>
                <Badge
                  variant="outline"
                  className={availabilityColors[product.availability]}
                >
                  {product.availability.replace('_', ' ')}
                </Badge>
                {product.featured && (
                  <Badge className="bg-amber-500/20 text-amber-700 border-amber-300">
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-shrink-0">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(product)}
                className="gap-2"
              >
                <Edit2 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(product._id)}
                className="gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
