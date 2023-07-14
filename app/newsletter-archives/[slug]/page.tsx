import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mdx } from 'app/components/mdx'
import { allNewsletterArchives } from 'contentlayer/generated'
import Balancer from 'react-wrap-balancer'
import ViewCounter from '../../blog/view-counter'
import { getViewsCount } from 'lib/metrics'

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allNewsletterArchives.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post
  const ogImage = image
    ? `https://careerchangers.guide${image}`
    : `https://careerchangers.guide/og?title=${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://careerchangers.guide/newsletter-archives/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

function formatDate(date: string) {
  const currentDate = new Date()
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `${fullDate} (${formattedDate})`
}

export default async function Blog({ params }) {
  const post = allNewsletterArchives.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const [allViews] = await Promise.all([getViewsCount()])

  return (
    <section>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(post.structuredData)}
      </script>
      <h1 className="max-w-[650px] text-2xl font-bold tracking-tighter">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="mt-2 mb-8 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
        <ViewCounter allViews={allViews} slug={post.slug} trackView />
      </div>
      <Mdx code={post.body.code} />
    </section>
  )
}
