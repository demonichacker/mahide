import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!isAdminAuthenticated()) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type (allow images and audio)
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const allowedAudioTypes = ['audio/mpeg', 'audio/mp3', 'audio/mp4', 'audio/x-m4a']
    const isImage = allowedImageTypes.includes(file.type)
    const isAudio = allowedAudioTypes.includes(file.type) || file.type.startsWith('audio/')
    if (!isImage && !isAudio) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 5MB allowed.' },
        { status: 400 }
      )
    }

    // Generate filename with timestamp
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop() || 'png'
    const filename = `${timestamp}.${fileExtension}`

    // Use /tmp for Vercel serverless execution to prevent bundling giant public dir
    const isVercel = process.env.VERCEL === '1'
    const targetDir = isVercel
      ? '/tmp'
      : `${process.cwd()}/public/${isAudio ? 'audio' : 'uploads'}`

    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true })
    }

    const filepath = `${targetDir}/${filename}`
    const buffer = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(buffer))

    // Return the public URL
    const publicUrl = isAudio ? `/audio/${filename}` : `/uploads/${filename}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: filename,
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
