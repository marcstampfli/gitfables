/**
 * @module app/blog/page
 * @description Blog page showcasing articles and updates
 */

import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const posts = [
  {
    title: 'Introducing GitFables',
    excerpt: 'Transform your Git history into engaging stories that showcase your development journey.',
    date: 'March 15, 2024',
    author: 'Marc Stampfli',
    category: 'Announcements',
    slug: 'introducing-gitfables',
    featured: true
  },
  {
    title: 'Best Practices for Git Commit Messages',
    excerpt: 'Learn how to write clear, meaningful commit messages that tell a better story of your development process.',
    date: 'March 14, 2024',
    author: 'Marc Stampfli',
    category: 'Tips & Tricks',
    slug: 'git-commit-message-best-practices'
  },
  {
    title: 'The Art of Technical Storytelling',
    excerpt: 'Why storytelling matters in software development and how to effectively communicate your technical journey.',
    date: 'March 13, 2024',
    author: 'Marc Stampfli',
    category: 'Development',
    slug: 'art-of-technical-storytelling'
  }
]

const categories = [
  'All',
  'Announcements',
  'Development',
  'Tips & Tricks',
  'Case Studies'
]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Hero */}
        <section className="relative py-20">
          <div className="container relative">
            <div className="max-w-[800px] mx-auto text-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Latest Updates &
                  <br />
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 blur-2xl opacity-25" />
                    <span className="relative bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      Development Stories
                    </span>
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                  Insights, tutorials, and stories about GitFables and technical storytelling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 border-b">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <nav className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`/blog/category/${category.toLowerCase().replace(/ & /g, '-')}`}
                    className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  >
                    {category}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              {posts.filter(post => post.featured).map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative block overflow-hidden rounded-xl border bg-card"
                >
                  <div className="relative aspect-[2/1] bg-muted">
                    <Image
                      src={`/blog/${post.slug}.jpg`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-primary font-medium">{post.category}</span>
                      <span className="text-muted-foreground">
                        <Calendar className="w-4 h-4 inline-block mr-1" />
                        {post.date}
                      </span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-primary">
                      <span className="text-sm font-medium">Read more</span>
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="grid sm:grid-cols-2 gap-8">
                {posts.filter(post => !post.featured).map(post => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group relative block overflow-hidden rounded-xl border bg-card"
                  >
                    <div className="relative aspect-[2/1] bg-muted">
                      <Image
                        src={`/blog/${post.slug}.jpg`}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-primary font-medium">{post.category}</span>
                        <span className="text-muted-foreground">
                          <Calendar className="w-4 h-4 inline-block mr-1" />
                          {post.date}
                        </span>
                      </div>
                      <h2 className="mt-4 text-xl font-bold group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center text-primary">
                        <span className="text-sm font-medium">Read more</span>
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="max-w-[600px] mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tight">
                Stay Updated
              </h2>
              <p className="text-lg text-muted-foreground">
                Get the latest GitFables news and development tips delivered to your inbox.
              </p>
              <Button size="lg" asChild>
                <Link href="/newsletter">
                  Subscribe to Newsletter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 