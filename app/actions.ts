'use server'

import { auth } from 'lib/auth'
import { type Session } from 'next-auth'
import { queryBuilder } from 'lib/planetscale'
import { revalidatePath } from 'next/cache'

export async function increment(slug: string) {
  const data = await queryBuilder
    .selectFrom('Views')
    .where('slug', '=', slug)
    .select(['count'])
    .execute()

  const views = !data.length ? 0 : Number(data[0].count)

  return queryBuilder
    .insertInto('Views')
    .values({ slug, count: 1 })
    .onDuplicateKeyUpdate({ count: views + 1 })
    .execute()
}

async function getSession(): Promise<Session> {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  return session
}

export async function saveNotesEntry(formData: FormData) {
  const session = await getSession()
  const email = session.user?.email as string
  const createdBy = session.user?.name as string
  const entry = formData.get('entry')?.toString() || ''
  const body = entry.slice(0, 500)

  await queryBuilder
    .insertInto('Notes')
    .values({ email, body, createdBy })
    .execute()

  revalidatePath('/drop-a-note')
}

export async function collectLinkActions(formData: FormData, pathname: string) {
  const session = await getSession()
  const collectedBy = session.user?.email as string
  const linkName = formData.get('intent')

  if (typeof linkName !== 'string') {
    throw new Error('Invalid link name')
  }

  await queryBuilder
    .insertInto('Link')
    .values({ name: linkName, collectedBy, slug: pathname })
    .execute()

  revalidatePath(pathname)
}

export async function checkIfUserHasCollectedLink(linkName: string) {
  const session = await getSession()
  const collectedBy = session.user?.email as string

  const data = await queryBuilder
    .selectFrom('Link')
    .where('collectedBy', '=', collectedBy)
    .where('name', '=', linkName)
    .select(['id'])
    .execute()

  return { session: !!session, data: !!data.length }
}
