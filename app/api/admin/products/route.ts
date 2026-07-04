import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getProductsCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// GET all products
export async function GET(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const collection = await getProductsCollection()
    const products = await collection.find({}).toArray()

    const serializedProducts = products.map((p) => ({
      ...p,
      _id: p._id?.toString?.() ?? p._id,
    }))

    return NextResponse.json(serializedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const collection = await getProductsCollection()

    const product = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(product)

    return NextResponse.json(
      { ...product, _id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { _id, ...updateData } = body



    if (!_id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const collection = await getProductsCollection()

    // Product records use string `id` in the admin UI, but Mongo `_id` is typically an ObjectId.
    // We support both safely: if `_id` is a valid ObjectId string, query by `_id`.
    // Otherwise, fall back to querying by the document `id` field.
    const query = (() => {
      try {
        return { _id: new ObjectId(_id) }
      } catch {
        return { id: _id }
      }
    })()


    const result = await collection.updateOne(
      query,
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      }
    )



    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const collection = await getProductsCollection()
    
    // Support deleting by Mongo `_id` (ObjectId string) or by the document `id` field.
    const query = (() => {
      try {
        return { _id: new ObjectId(id) }
      } catch {
        return { id }
      }
    })()

    const result = await collection.deleteOne(query)

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
