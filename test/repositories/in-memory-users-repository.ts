import { randomUUID } from 'node:crypto'
import type { User, UserInput, UsersRepository } from '#src/repositories/users-repository.ts'

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = []

  async create(values: UserInput) {
    const user = { id: randomUUID(), ...values }

    await this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
