import { decimal, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const gyms = pgTable('gyms', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  description: text(),
  phone: text(),
  latitude: decimal().notNull(),
  longitude: decimal().notNull(),
})
