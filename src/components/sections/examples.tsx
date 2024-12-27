/**
 * @module components/sections/examples
 * @description Section showcasing example stories
 */

import Image from 'next/image'
import { Animated } from '@/components/ui/animated'

interface ExampleUser {
  name: string
  role: string
  avatar: string
}

const examples: ExampleUser[] = [
  {
    name: 'Sarah Chen',
    role: 'Senior Developer',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=sarah&backgroundColor=b6e3f4',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Tech Lead',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=michael&backgroundColor=c0aede',
  },
  {
    name: 'Dev Team',
    role: 'Engineering',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=team&backgroundColor=d1d4f9',
  },
]

export function Examples() {
  return (
    <section className="py-20">
      <div className="container">
        <Animated animation="slide-up">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Used by developers worldwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
              Join thousands of developers who use GitFables to showcase their work
            </p>
          </div>
        </Animated>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {examples.map((user, index) => (
            <Animated
              key={user.name}
              animation="slide-up"
              delay={200 + index * 100}
            >
              <div className="flex flex-col items-center gap-4 p-6 rounded-lg bg-muted/50">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </div>
            </Animated>
          ))}
        </div>
      </div>
    </section>
  )
} 