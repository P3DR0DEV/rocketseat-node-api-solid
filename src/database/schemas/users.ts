import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const usersRole = pgEnum('USERS_ROLE', ['MEMBER', 'ADMIN'])

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  role: usersRole().notNull().default('MEMBER'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
