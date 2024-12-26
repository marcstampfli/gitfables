export const config = {
  github: {
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    redirectUri: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
  }
}

// Only validate in server context
if (typeof window === 'undefined') {
  const requiredEnvVars = [
    'NEXT_PUBLIC_GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
  ] as const

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`)
    }
  }
} 