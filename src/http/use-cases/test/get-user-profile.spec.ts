import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '#test/repositories/in-memory-users-repository.ts'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.ts'
import { GetUserProfileUseCase } from '../get-user-profile.ts'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('Should be able to get a user profile.', async () => {
    const createdUser = await usersRepository.create({
      name: 'Pedro Mendes',
      email: 'pedro@example.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user).toBeDefined()

    if (user) {
      expect(user.name).toBe('Pedro Mendes')
      expect(user.email).toBe('pedro@example.com')
    }
  })

  it('Should not be able to get a user profile with wrong id.', async () => {
    await expect(async () => {
      await sut.execute({ userId: 'non-existent-id' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
