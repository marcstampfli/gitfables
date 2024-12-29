/**
 * @module app/(auth)/layout
 * @description Layout for authentication pages
 */

import Link from 'next/link'
import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container relative flex min-h-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-8 top-8 flex items-center text-lg font-medium">
        <Image src="/logo.svg" alt="GitFables" width={24} height={24} className="mr-2" />
        GitFables
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {children}
      </div>
    </div>
  )
} 