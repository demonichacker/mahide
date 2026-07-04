import { NextRequest, NextResponse } from 'next/server'
import { getProductsCollection } from '@/lib/mongodb'
import { products as localProducts } from '@/lib/data'
import { ObjectId } from 'mongodb'

interface Params {
  productId: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { productId } = await params
    const collection = await getProductsCollection()

    // Try finding by id or ObjectId in DB
    let query: any = { id: productId }
    let dbProduct = await collection.findOne(query)

    if (!dbProduct) {
      try {
        dbProduct = await collection.findOne({ _id: new ObjectId(productId) })
      } catch {
        // Invalid ObjectId
      }
    }

    if (dbProduct) {
      return NextResponse.json({
        ...dbProduct,
        _id: dbProduct._id.toString(),
      })
    }

    // Fallback to local products
    const localProduct = localProducts.find((p) => p.id === productId)
    if (localProduct) {
      return NextResponse.json(localProduct)
    }

    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  } catch (error) {
    console.error('Error fetching public single product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product details' },
      { status: 500 }
    )
  }
}
