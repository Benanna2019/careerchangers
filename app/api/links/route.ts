import { auth } from 'lib/auth'
import { queryBuilder } from 'lib/planetscale'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }
  const linkName = await req.json()

  const collectedBy = session.user?.email as string

  const data = await queryBuilder
    .selectFrom('Link')
    .where('collectedBy', '=', collectedBy)
    .where('name', '=', linkName)
    .select(['id'])
    .execute()

  return NextResponse.json({ session: !!session, data: !!data.length })
}
