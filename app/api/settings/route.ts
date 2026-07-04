import { NextRequest, NextResponse } from 'next/server'
import { getSettingsCollection, getWaitlistCollection } from '@/lib/mongodb'

export async function GET() {
  try {
    const settingsCollection = await getSettingsCollection()
    const waitlistSettings = await settingsCollection.findOne({ _id: 'waitlist' as any })

    if (!waitlistSettings) {
      return NextResponse.json({
        waitlistActive: false,
        countdownTarget: null,
      })
    }

    return NextResponse.json({
      waitlistActive: !!waitlistSettings.active,
      countdownTarget: waitlistSettings.countdownTarget || null,
      audioPath: waitlistSettings.audioPath || '/bg_track.mp3',
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, email, phoneNumber } = body

    if (!firstName || !email || !phoneNumber) {
      return NextResponse.json(
        { error: 'First name, email, and phone number are required' },
        { status: 400 }
      )
    }

    const waitlistCollection = await getWaitlistCollection()
    
    // Check if email already registered
    const existing = await waitlistCollection.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { error: 'You are already on the waitlist with this email address.' },
        { status: 400 }
      )
    }

    const signup = {
      firstName,
      email,
      phoneNumber,
      joinedAt: new Date(),
    }

    await waitlistCollection.insertOne(signup)

    return NextResponse.json({ success: true, message: 'Joined waitlist successfully!' }, { status: 201 })
  } catch (error) {
    console.error('Error joining waitlist:', error)
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    )
  }
}
