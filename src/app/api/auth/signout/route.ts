import { NextRequest } from 'next/server'
import { signOut } from '@/lib/actions/auth'

export async function POST(request: NextRequest) {
  await signOut()
  return Response.redirect(new URL('/', request.url))
} 