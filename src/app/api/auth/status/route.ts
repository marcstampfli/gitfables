import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const token = cookies().get('github_token')
  return NextResponse.json({ authenticated: !!token })
} 