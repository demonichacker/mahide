import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'secret'

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const adminToken = cookieStore.get('admin_token')?.value
  return adminToken === ADMIN_SECRET_KEY
}

export function validateAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export async function setAdminCookie() {
  const cookieStore = await cookies()
  cookieStore.set('admin_token', ADMIN_SECRET_KEY, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })
}

export async function clearAdminCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
}
