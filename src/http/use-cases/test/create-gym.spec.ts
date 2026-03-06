import { InMemoryGymsRepository } from '#test/repositories/in-memory-gyms-repository.ts'
import { CreateGymUseCase } from '../create-gym.ts'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('Should create a gym.', async () => {
    const { gym } = await sut.execute({
      title: 'Gym',
      description: 'description',
      phone: '123456',
      latitude: 0,
      longitude: 0,
    })

    expect(gym).toBeDefined()

    if (gym) {
      expect(gym.id).toBeDefined()
      expect(gym.title).toBe('Gym')
      expect(gym.description).toBe('description')
      expect(gym.phone).toBe('123456')
      expect(gym.latitude).toBe(0)
      expect(gym.longitude).toBe(0)
    }
  })
})
