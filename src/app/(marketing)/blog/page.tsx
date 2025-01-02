/**
 * @module app/blog/page
 * @description Blog page showcasing articles and development stories
 */

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { PageHeader } from '@/components/marketing/page-header'
import { cn } from '@/lib/utils'

const featuredPost = {
  title: 'Introducing GitFables: Transform Your Git History into Stories',
  description: 'Learn how GitFables turns complex development histories into engaging narratives that everyone can understand.',
  image: '/blog/introducing-gitfables.jpg',
  date: 'March 15, 2024',
  readTime: '5 min read',
  author: {
    name: 'GitFables Team',
    image: '/team/gitfables-team.jpg'
  },
  slug: 'introducing-gitfables'
}

const recentPosts = [
  {
    title: 'Best Practices for Writing Meaningful Git Commits',
    description: 'Discover how to write clear, descriptive commit messages that make your development story easier to understand.',
    image: '/blog/git-commits.jpg',
    date: 'March 10, 2024',
    readTime: '4 min read',
    author: {
      name: 'Sarah Chen',
      image: '/team/sarah.jpg'
    },
    slug: 'git-commit-best-practices'
  },
  {
    title: 'Using AI to Generate Development Documentation',
    description: 'How artificial intelligence is revolutionizing the way we document and share our development process.',
    image: '/blog/ai-documentation.jpg',
    date: 'March 5, 2024',
    readTime: '6 min read',
    author: {
      name: 'Alex Rodriguez',
      image: '/team/alex.jpg'
    },
    slug: 'ai-documentation'
  },
  {
    title: 'The Power of Storytelling in Software Development',
    description: 'Why narrative structures are crucial for communicating technical concepts to stakeholders.',
    image: '/blog/storytelling.jpg',
    date: 'February 28, 2024',
    readTime: '7 min read',
    author: {
      name: 'Emma Wilson',
      image: '/team/emma.jpg'
    },
    slug: 'storytelling-in-development'
  }
]

const topics = [
  'All Posts',
  'Development',
  'Best Practices',
  'AI & ML',
  'Documentation',
  'Team Collaboration'
]

export default function BlogPage() {
  return (
    <div className="relative">
      <PageHeader
        title="Blog & Stories"
        titleGradient="Stories"
        description="Insights, tutorials, and stories about development documentation and collaboration."
      />

      {/* Featured Post */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <Link 
              href={`/blog/${featuredPost.slug}`}
              className="group relative bg-background hover:bg-muted/50 border rounded-xl overflow-hidden transition-colors"
            >
              <div className="aspect-[2/1] relative">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={featuredPost.author.image}
                        alt={featuredPost.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span>{featuredPost.author.name}</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {featuredPost.description}
                </p>
                <div className="flex items-center text-primary font-medium">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Button
                  key={topic}
                  variant={topic === 'All Posts' ? 'default' : 'outline'}
                  size="sm"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-12">
              Recent Posts
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative bg-background hover:bg-muted/50 border rounded-xl overflow-hidden transition-colors"
                >
                  <div className="aspect-[3/2] relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={post.author.image}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-muted-foreground">{post.author.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-[600px] mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-muted-foreground">
              Get the latest articles and development stories delivered to your inbox.
            </p>
            <form className="flex gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                required
              />
              <Button type="submit">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
} 