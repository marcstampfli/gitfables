/**
 * @module app/about/page
 * @description About page introducing GitFables and its creator
 */

import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Twitter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Hero */}
        <section className="relative py-20">
          <div className="container relative">
            <div className="max-w-[800px] mx-auto text-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  The Story Behind
                  <br />
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur-2xl opacity-25" />
                    <span className="relative bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      GitFables
                    </span>
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                  Transforming Git histories into engaging stories, one commit at a time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="prose prose-gray dark:prose-invert lg:prose-lg max-w-none">
                <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  GitFables was born from a simple idea: every development journey tells a story worth sharing. As developers, we spend countless hours crafting code, solving problems, and building amazing things. But often, these stories remain hidden in commit logs and pull requests.
                </p>
                <p className="text-lg text-muted-foreground">
                  I created GitFables to bridge this gap – to transform technical Git histories into engaging narratives that everyone can understand and appreciate. Whether you&apos;re showcasing your work to stakeholders, documenting your journey for your portfolio, or sharing knowledge with your team, GitFables helps you tell your development story in a compelling way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Creator */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight">Meet the Creator</h2>
                  <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                    GitFables is crafted with passion by a developer for developers.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 p-8 rounded-xl border bg-card">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden bg-muted">
                    <Image
                      src="/marc.jpg"
                      alt="Marc Stampfli"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold">Marc Stampfli</h3>
                    <p className="text-muted-foreground mt-1">Founder & Developer</p>
                    <p className="mt-4 text-muted-foreground">
                      Full-stack developer passionate about creating tools that make developers&apos; lives better. When not coding, you&apos;ll find me exploring new technologies, contributing to open source, or writing about software development.
                    </p>
                    <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="https://github.com/marcstampfli">
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="https://twitter.com/marcstampfli">
                          <Twitter className="w-4 h-4 mr-2" />
                          Twitter
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-[600px] mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">
                Join the Journey
              </h2>
              <p className="text-lg text-muted-foreground">
                Ready to transform your Git history into engaging stories?
              </p>
              <Button size="lg" asChild icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                <Link href="/login">
                  Get Started Free
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 