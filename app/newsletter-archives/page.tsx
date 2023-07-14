import type { Metadata } from 'next'
import Link from 'next/link'
import { allNewsletterArchives } from 'contentlayer/generated'
import ViewCounter from '../blog/view-counter'
import { getViewsCount } from 'lib/metrics'

export const metadata: Metadata = {
  title: 'Newsletter Archives',
  description: 'Read archived newsletters from the Career Changers newsletter.',
}

export default async function NewsletterArchivesPage() {
  const allViews = await getViewsCount()

  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        from the archives
      </h1>
      {allNewsletterArchives
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
            href={`/newsletter-archives/${post.slug}`}
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
