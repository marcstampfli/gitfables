/**
 * @module app/(dashboard)/dashboard/repositories/new/page
 * @description Page for connecting new repositories from various VCS providers
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { SUPPORTED_PROVIDERS, type VCSProviderConfig } from '@/lib/vcs/vcs-providers'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function NewRepositoryPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  // If user is already authenticated with GitHub, redirect to repository selection
  if (session?.provider_token) {
    redirect('/dashboard/repositories/select')
  }

  return (
    <div className="container space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Connect Repository</h1>
        <p className="text-muted-foreground">
          Choose a version control provider to connect your repository
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {SUPPORTED_PROVIDERS.map((provider: VCSProviderConfig) => (
          <Card 
            key={provider.id}
            className={provider.isActive ? 'hover:border-primary cursor-pointer' : 'opacity-60'}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={provider.icon}
                    alt={provider.name}
                    width={24}
                    height={24}
                  />
                  <CardTitle>{provider.name}</CardTitle>
                </div>
                {!provider.isActive && (
                  <Badge variant="secondary">Coming Soon</Badge>
                )}
              </div>
              <CardDescription>
                {provider.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                asChild={provider.isActive}
                className="w-full"
                disabled={!provider.isActive}
              >
                {provider.isActive ? (
                  <Link href={`/api/auth/${provider.id}`}>
                    Connect with {provider.name}
                  </Link>
                ) : (
                  <span>Connect with {provider.name}</span>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 