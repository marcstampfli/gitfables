import 'next-auth'
import type { JWT as NextAuthJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    provider?: string
    provider_token?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends NextAuthJWT {
    provider?: string
    provider_token?: string
  }
} 