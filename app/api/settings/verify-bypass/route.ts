import { NextRequest, NextResponse } from 'next/server'
import { getSettingsCollection } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ success: false, error: 'Password is required' }, { status: 400 })
    }

    const settingsCollection = await getSettingsCollection()
    const waitlistSettings = await settingsCollection.findOne({ _id: 'waitlist' as any })

    const correctPassword = waitlistSettings?.bypassPassword || 'admin'

    if (password === correctPassword) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 400 })
  } catch (error) {
    console.error('Error verifying waitlist bypass password:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
