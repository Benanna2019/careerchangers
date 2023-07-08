import Image from 'next/image'
import avatar from 'app/avatar.jpg'
import ViewCounter from 'app/blog/view-counter'
import { getViewsCount } from 'lib/metrics'
import hotairballoons from 'app/hotairballoons.jpg'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

async function BlogLink({ slug, name }) {
  const allViews = await getViewsCount()

  return (
    <a
      href={`/blog/${slug}`}
      className="flex w-full items-center justify-between  rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
    >
      <div className="flex flex-col">
        <p className="font-bold text-neutral-900 dark:text-neutral-100">
          {name}
        </p>
        <ViewCounter allViews={allViews} slug={slug} trackView={false} />
      </div>
      <div className="text-neutral-700 dark:text-neutral-300">
        <ArrowIcon />
      </div>
    </a>
  )
}

export default async function Page() {
  return (
    <section>
      <div className="my-8">
        <div className="relative mb-4 h-52">
          <Image
            alt="Me speaking on stage at React Summit about the future of Next.js"
            src={hotairballoons}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        Welcome, Career Changer 👋
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
        {`Career changers began with the mission of helping people who are learning to code 
        learn how to network and find their first software job. `}
      </p>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          There is a gap in the industry when it comes to software devs finding
          their first job. Many people go to a coding bootcamp only to{' '}
          <i>
            <strong>feel</strong>
          </i>{' '}
          as though they are left out to dry when it comes to finding a job.
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I went through this experience myself. My coding bootcamp was great.
          My instructor was awesome. But the rest of the experience was lacking.
          I was left to figure out how to network and find a job on my own. The
          job hunting process and making connections was something that we were
          told we would get help with but we did not.
        </p>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          There may be the occassional individual who is going through the
          coding bootcamp to learn and not get a job. But those are the vast
          minority of individuals. The aim of the majority going through a
          coding bootcamp is to get a job.
        </p>
      </div>
      {/* <div className="my-8 flex w-full flex-col space-y-4">
        <Suspense>
         
          <BlogLink
            name="What Makes A Great Developer Experience?"
            slug="developer-experience-examples"
          />
          <BlogLink
            name="2023 State of Databases for Serverless & Edge"
            slug="backend"
          />
          <BlogLink name="The Story of Heroku" slug="heroku" />
        </Suspense>
      </div> */}
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          If you are curious about me, my name is Ben Patton. My background is
          in non-profit work and counseling. In non-profit work our income was
          through fundraising and so many fundraising principles can be applied
          to networking to help find a job. There are wonderful resources and I
          hope this is a place to not only help you learn how to network but
          also find resource and others going through the same journey as you so
          you know you are not alone.
        </p>
      </div>
    </section>
  )
}
