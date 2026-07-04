import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getSettingsCollection, getWaitlistCollection } from '@/lib/mongodb'

export async function GET() {
  try {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settingsCollection = await getSettingsCollection()
    let waitlistSettings = await settingsCollection.findOne({ _id: 'waitlist' as any })

    // If it doesn't exist, seed a default setting
    if (!waitlistSettings) {
      const defaultSettings = {
        _id: 'waitlist' as any,
        active: false,
        bypassPassword: 'admin',
        countdownTarget: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        audioPath: '/bg_track.mp3',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      await settingsCollection.insertOne(defaultSettings)
      waitlistSettings = defaultSettings
    }

    // Get the waitlist signup count
    const waitlistCollection = await getWaitlistCollection()
    const signupCount = await waitlistCollection.countDocuments()

    return NextResponse.json({
      active: !!waitlistSettings.active,
      bypassPassword: waitlistSettings.bypassPassword || 'admin',
      countdownTarget: waitlistSettings.countdownTarget || '',
      audioPath: waitlistSettings.audioPath || '/bg_track.mp3',
      signupCount,
    })
  } catch (error) {
    console.error('Error fetching admin settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { active, bypassPassword, countdownTarget, audioPath } = body

    const settingsCollection = await getSettingsCollection()
    
    const result = await settingsCollection.updateOne(
      { _id: 'waitlist' as any },
      {
          $set: {
          active: !!active,
          bypassPassword: bypassPassword || 'admin',
          countdownTarget: countdownTarget || '',
          audioPath: audioPath || '/bg_track.mp3',
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    )

    return NextResponse.json({ success: true, matchedCount: result.matchedCount, modifiedCount: result.modifiedCount })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  return PUT(request)
}
