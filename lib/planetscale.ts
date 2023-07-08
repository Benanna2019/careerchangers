// import 'server-only' not working with API routes yet
import { Generated, Kysely } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'

interface GuestbookTable {
  id: Generated<number>
  email: string
  body: string
  createdBy: string
  updatedAt?: string
}

interface ViewsTable {
  slug: string
  count: number
}

interface LinkTable {
  id: Generated<number>
  name: string
  slug: string
  collectedBy: string
}

interface Database {
  Guestbook: GuestbookTable
  Views: ViewsTable
  Link: LinkTable
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
})
