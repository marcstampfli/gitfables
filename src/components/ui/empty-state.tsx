import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Icon className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">{title}</CardTitle>
          <CardDescription className="mt-1">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      {action && (
        <CardContent className="flex justify-center">
          <Button
            onClick={action.onClick}
            {...(action.href ? { asChild: true } : {})}
          >
            {action.href ? (
              <Link href={action.href}>{action.label}</Link>
            ) : (
              action.label
            )}
          </Button>
        </CardContent>
      )}
    </Card>
  )
} 