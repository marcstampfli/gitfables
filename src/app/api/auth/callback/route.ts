import { NextRequest } from 'next/server'
import { config } from '@/lib/config'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return new Response('No code provided', { status: 400 })
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: config.github.clientId,
        client_secret: config.github.clientSecret,
        code,
        redirect_uri: config.github.redirectUri,
      }),
    })

    const data = await response.json()

    if (data.error) {
      throw new Error(data.error_description || 'OAuth error')
    }

    // Store the token in an HTTP-only cookie
    cookies().set('github_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    // Redirect back to the main page
    return Response.redirect(new URL('/', request.url))
  } catch (error) {
    console.error('OAuth error:', error)
    return new Response('Authentication failed', { status: 500 })
  }
} 