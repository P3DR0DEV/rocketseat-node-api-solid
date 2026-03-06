import { InMemoryCheckInsRepository } from '#test/repositories/in-memory-check-ins-repository.ts'
import { InMemoryGymsRepository } from '#test/repositories/in-memory-gyms-repository.ts'
import { CheckInUseCase } from '../check-in.ts'
import { MaxDistanceError } from '../errors/max-distance-error.ts'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins-error.ts'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.ts'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({ id: 'gym-id', title: 'Gym', description: '', phone: '', latitude: 0, longitude: 0 })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in.', async () => {
    const { checkIn } = await sut.execute({ userId: 'user-id', gymId: 'gym-id', userLatitude: 0, userLongitude: 0 })

    expect(checkIn).toBeDefined()

    if (checkIn) {
      expect(checkIn.userId).toBe('user-id')
      expect(checkIn.gymId).toBe('gym-id')
      expect(checkIn.createdAt).toBeDefined()
      expect(checkIn.validatedAt).toBeNull()
    }
  })

  it('Should not be able to check in if gymId is invalid.', async () => {
    await expect(async () => {
      await sut.execute({ userId: 'user-id', gymId: 'invalid-gym-id', userLatitude: 0, userLongitude: 0 })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be able to check in twice in the same day.', async () => {
    vi.setSystemTime(new Date(2026, 0, 1, 8, 0, 0))

    await sut.execute({ userId: 'user-id', gymId: 'gym-id', userLatitude: 0, userLongitude: 0 })

    await expect(async () => {
      await sut.execute({ userId: 'user-id', gymId: 'gym-id', userLatitude: 0, userLongitude: 0 })
    }).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('Should be able to check in twice bur in different days.', async () => {
    vi.setSystemTime(new Date(2026, 0, 1, 8, 0, 0))

    await sut.execute({ userId: 'user-id', gymId: 'gym-id', userLatitude: 0, userLongitude: 0 })

    vi.setSystemTime(new Date(2026, 0, 2, 8, 0, 0))

    const { checkIn } = await sut.execute({ userId: 'user-id', gymId: 'gym-id', userLatitude: 0, userLongitude: 0 })

    expect(checkIn).toBeDefined()

    if (checkIn) {
      expect(checkIn.userId).toBe('user-id')
      expect(checkIn.gymId).toBe('gym-id')
      expect(checkIn.createdAt).toBeDefined()
      expect(checkIn.validatedAt).toBeNull()
    }
  })

  it('Should not be able to check in if the user is not near the gym.', async () => {
    gymsRepository.items.push({
      id: 'gym-id2',
      title: 'Gym',
      description: '',
      phone: '',
      latitude: -19.9225295,
      longitude: -43.9353344,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-id',
        gymId: 'gym-id',
        userLatitude: -19.8586274,
        userLongitude: -43.9535426,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
