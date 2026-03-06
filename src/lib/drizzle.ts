import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '#src/env/index.ts'

export const db = drizzle(env.DATABASE_URL, {
  casing: 'snake_case',
})
