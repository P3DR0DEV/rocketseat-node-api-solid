export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  role: 'ADMIN' | 'MEMBER'
}

export interface UserInput {
  name: string
  email: string
  passwordHash: string
  role: 'ADMIN' | 'MEMBER'
}

export interface UsersRepository {
  create(values: UserInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
