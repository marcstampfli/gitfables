import { type User } from '@supabase/supabase-js'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface RootLayoutProps {
  children: React.ReactNode
  user: User | null
}

export function RootLayout({ children, user }: RootLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header user={user} />
      <main className="flex-1 container py-6 md:py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
} 