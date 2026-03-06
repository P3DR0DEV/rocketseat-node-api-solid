import { InMemoryGymsRepository } from '#test/repositories/in-memory-gyms-repository.ts'
import { SearchGymsUseCase } from '../search-gyms.ts'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Should be able to fetch gyms.', async () => {
    await gymsRepository.create({
      title: 'Iron Gym',
      description: 'description',
      phone: '123456',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({ query: 'iron', page: 1 })

    expect(gyms).toHaveLength(1)

    expect(gyms).toEqual([expect.objectContaining({ title: 'Iron Gym' })])
  })

  it('Should be able to fetch paginated gyms.', async () => {
    for (let i = 0; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym${i}`,
        description: 'description',
        phone: '123456',
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({ query: 'gym', page: 2 })

    expect(gyms).toHaveLength(3)

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym20' }),
      expect.objectContaining({ title: 'Gym21' }),
      expect.objectContaining({ title: 'Gym22' }),
    ])
  })
})
