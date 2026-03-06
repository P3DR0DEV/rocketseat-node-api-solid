import { eq } from 'drizzle-orm'
import { db } from '#src/lib/drizzle.ts'
import type { User, UserInput, UsersRepository } from '#src/repositories/users-repository.ts'
import { users } from '../schemas/users.ts'

export class DrizzleUsersRepository implements UsersRepository {
  async create(values: UserInput) {
    const user = await db.insert(users).values(values).returning()

    return user[0]
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.select().from(users).where(eq(users.email, email))

    if (user.length === 0) {
      return null
    }

    return user[0]
  }

  async findById(id: string): Promise<User | null> {
    const user = await db.select().from(users).where(eq(users.id, id))

    if (user.length === 0) {
      return null
    }

    return user[0]
  }
}
