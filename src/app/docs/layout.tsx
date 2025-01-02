import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Documentation - GitFables',
    template: '%s - GitFables Documentation'
  },
  description: 'Everything you need to know about using GitFables effectively.'
}

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return children
} 