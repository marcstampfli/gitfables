/**
 * @module lib/auth
 * @description Authentication configuration
 */

import { type NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GitLabProvider from 'next-auth/providers/gitlab'
import { type Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

/**
 * NextAuth configuration options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'read:user repo',
        },
      },
    }),
    GitLabProvider({
      clientId: process.env.GITLAB_CLIENT_ID!,
      clientSecret: process.env.GITLAB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'read_user read_api',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.provider = account.provider
        token.provider_token = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        provider: token.provider,
        provider_token: token.provider_token,
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
} 

interface AuthError {
  message: string
  status?: number
}

interface AuthResult {
  session: Session | null
  error: AuthError | null
}

export async function signInWithGitHub(): Promise<AuthResult> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      return {
        session: null,
        error: {
          message: error.message,
          status: error.status ?? 500
        }
      }
    }

    // OAuth flow will redirect, so we don't need to handle the session here
    return {
      session: null,
      error: null
    }
  } catch (error) {
    return {
      session: null,
      error: {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 500
      }
    }
  }
} 