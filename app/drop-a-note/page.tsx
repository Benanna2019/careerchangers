import type { Metadata } from 'next'
import { auth } from 'lib/auth'
import { queryBuilder } from 'lib/planetscale'
import { SignIn, SignOut } from './buttons'
import Form from './form'

async function getNotes() {
  const data = await queryBuilder
    .selectFrom('Notes')
    .select(['id', 'body', 'createdBy', 'updatedAt'])
    .orderBy('updatedAt', 'desc')
    .limit(100)
    .execute()

  return data
}

export const metadata: Metadata = {
  title: 'Drop a Note',
  description: 'Request a blog post, leave a note, or just say hi.',
}

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default async function DropANotePage() {
  let entries
  let session

  try {
    const [notesRes, sessionRes] = await Promise.allSettled([
      getNotes(),
      auth(),
    ])

    if (notesRes.status === 'fulfilled' && notesRes.value[0]) {
      entries = notesRes.value
    } else {
      console.error(notesRes)
    }

    if (sessionRes.status === 'fulfilled') {
      session = sessionRes.value
    } else {
      console.error(sessionRes)
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold tracking-tighter">
        sign my guestbook
      </h1>
      {session?.user ? (
        <>
          <Form />
          <SignOut />
        </>
      ) : (
        <SignIn />
      )}
      {entries?.map((entry) => (
        <div key={entry.id} className="mb-4 flex flex-col space-y-1">
          <div className="w-full break-words text-sm">
            <span className="mr-1 text-neutral-600 dark:text-neutral-400">
              {entry.created_by}:
            </span>
            {entry.body}
          </div>
        </div>
      ))}
    </section>
  )
}
