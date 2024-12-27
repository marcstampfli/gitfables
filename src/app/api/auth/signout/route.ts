import { NextRequest } from 'next/server'
import { signOut } from '@/lib/auth/actions'

export async function POST(request: NextRequest) {
  await signOut()
  return Response.redirect(new URL('/', request.url))
} 