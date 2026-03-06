import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '#test/repositories/in-memory-users-repository.ts'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error.ts'
import { RegisterUserUseCase } from '../register.ts'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('Should create a user and the password should be hashed.', async () => {
    await sut.execute({ name: 'Pedro Mendes', email: 'pedro@example.com', password: '123456' })

    const user = await usersRepository.findByEmail('pedro@example.com')

    expect(user).toBeDefined()

    if (user) {
      expect(user.name).toBe('Pedro Mendes')
      expect(user.email).toBe('pedro@example.com')
      expect(user.passwordHash).toBeDefined()

      const isPasswordCorrectlyHashed = await compare('123456', user.passwordHash)

      expect(isPasswordCorrectlyHashed).toBe(true)
    }
  })

  it('Should throw an error if the user already exists.', async () => {
    await sut.execute({ name: 'Pedro Mendes', email: 'pedro@example.com', password: '123456' })

    await expect(async () => {
      await sut.execute({
        name: 'Pedro Mendes',
        email: 'pedro@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
