import { index, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { gyms } from './gyms.ts'
import { users } from './users.ts'

export const checkIns = pgTable(
  'check_ins',
  {
    id: uuid().primaryKey().defaultRandom(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    validatedAt: timestamp('validated_at'),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    gymId: uuid('gym_id')
      .notNull()
      .references(() => gyms.id),
  },
  (table) => ({
    userIdIdx: index('user_id_idx').on(table.userId),
    gymIdIdx: index('gym_id_idx').on(table.gymId),
    userGymIdx: index('user_gym_idx').on(table.userId, table.gymId),
  }),
)
