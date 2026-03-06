import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '#test/repositories/in-memory-users-repository.ts'
import { AuthenticateUseCase } from '../authenticate.ts'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error.ts'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Should be able to authenticate a user.', async () => {
    await usersRepository.create({
      name: 'Pedro Mendes',
      email: 'pedro@example.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ email: 'pedro@example.com', password: '123456' })

    expect(user).toBeDefined()

    if (user) {
      expect(user.name).toBe('Pedro Mendes')
      expect(user.email).toBe('pedro@example.com')
      expect(user.passwordHash).toBeDefined()
    }
  })

  it('Should not authenticate with an invalid email.', async () => {
    await expect(async () => {
      await sut.execute({ email: 'pedro@example.com', password: '123456' })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not authenticate with an invalid password.', async () => {
    await usersRepository.create({
      name: 'Pedro Mendes',
      email: 'pedro@example.com',
      passwordHash: await hash('123456', 6),
    })

    await expect(async () => {
      await sut.execute({ email: 'pedro@example.com', password: '1234567' })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
