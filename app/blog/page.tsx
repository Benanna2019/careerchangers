import type { Metadata } from 'next'
import Link from 'next/link'
import { allBlogs } from 'contentlayer/generated'
import ViewCounter from './view-counter'
import { getViewsCount } from 'lib/metrics'
import { TestDialog } from 'app/components/test-modal'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.',
}

export default async function BlogPage() {
  const allViews = await getViewsCount()

  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">read my blog</h1>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="mb-4 flex flex-col space-y-1"
            href={`/blog/${post.slug}`}
          >
            <div className="flex w-full flex-col">
              <p className="tracking-tight text-neutral-900 dark:text-neutral-100">
                {post.title}
              </p>
              <ViewCounter
                allViews={allViews}
                slug={post.slug}
                trackView={false}
              />
            </div>
          </Link>
        ))}
    </section>
  )
}
