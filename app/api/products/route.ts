import { NextResponse } from 'next/server'
import { getProductsCollection } from '@/lib/mongodb'
import { products as localProducts } from '@/lib/data'

export async function GET() {
  try {
    const collection = await getProductsCollection()
    const dbProducts = await collection.find({}).toArray()

    if (!dbProducts || dbProducts.length === 0) {
      // Fallback to local products list
      return NextResponse.json(localProducts)
    }

    const serializedProducts = dbProducts.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }))

    return NextResponse.json(serializedProducts)
  } catch (error) {
    console.error('Error fetching public products:', error)
    // Fallback to local list if DB connection fails
    return NextResponse.json(localProducts)
  }
}
