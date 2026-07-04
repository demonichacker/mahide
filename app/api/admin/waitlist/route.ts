import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getWaitlistCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const waitlistCollection = await getWaitlistCollection()
    const signups = await waitlistCollection.find({}).sort({ joinedAt: -1 }).toArray()

    const serializedSignups = signups.map((s) => ({
      ...s,
      _id: s._id.toString(),
    }))

    return NextResponse.json(serializedSignups)
  } catch (error) {
    console.error('Error fetching waitlist signups:', error)
    return NextResponse.json(
      { error: 'Failed to fetch waitlist signups' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const clearAll = searchParams.get('all') === 'true'

    const waitlistCollection = await getWaitlistCollection()

    if (clearAll) {
      await waitlistCollection.deleteMany({})
      return NextResponse.json({ success: true, message: 'All registrations cleared.' })
    }

    if (!id) {
      return NextResponse.json({ error: 'Registration ID or "all" query param is required' }, { status: 400 })
    }

    let query: any = {}
    try {
      query = { _id: new ObjectId(id) }
    } catch {
      query = { _id: id }
    }

    const result = await waitlistCollection.deleteOne(query)
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting waitlist signup:', error)
    return NextResponse.json(
      { error: 'Failed to delete waitlist signup' },
      { status: 500 }
    )
  }
}
