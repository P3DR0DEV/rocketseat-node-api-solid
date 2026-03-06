import { InMemoryGymsRepository } from '#test/repositories/in-memory-gyms-repository.ts'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms.ts'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to fetch gyms nearby.', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'description',
      phone: '123456',
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Gym 2 ',
      description: 'description',
      phone: '123456',
      latitude: 10000,
      longitude: 10000,
    })

    const { gyms } = await sut.execute({ userLatitude: 0, userLongitude: 0 })

    expect(gyms).toHaveLength(1)

    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })

  it('Should return an empty array if there are no gyms nearby.', async () => {
    await gymsRepository.create({
      title: `Gym`,
      description: 'description',
      phone: '123456',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({ userLatitude: 10000, userLongitude: 10000 })

    expect(gyms).toHaveLength(0)

    expect(gyms).toEqual([])
  })
})
