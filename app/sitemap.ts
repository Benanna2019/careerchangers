import { allBlogs } from 'contentlayer/generated'

export default async function sitemap() {
  const blogs = allBlogs.map((post) => ({
    url: `https://careerchangers.guide/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }))

  const routes = ['', '/blog', '/drop-a-note', '/newsletter-archives'].map(
    (route) => ({
      url: `https://careerchangers.guide${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  )

  return [...routes, ...blogs]
}
