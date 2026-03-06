import { InMemoryCheckInsRepository } from '#test/repositories/in-memory-check-ins-repository.ts'
import { LateCheckInValidationError } from '../errors/late-check-in-validation-error.ts'
import { ResourceNotFoundError } from '../errors/resource-not-found-error.ts'
import { ValidateCheckInUseCase } from '../validate-check-in.ts'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to validate a check in.', async () => {
    // Create a check-in
    const { id: checkInId } = await checkInsRepository.create({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    const { checkIn } = await sut.execute({ checkInId })

    expect(checkIn).toBeDefined()

    if (checkIn) {
      expect(checkIn.userId).toBe('user-id')
      expect(checkIn.gymId).toBe('gym-id')
      expect(checkIn.createdAt).toBeDefined()
      expect(checkIn.validatedAt).toBeDefined()
    }
  })

  it('Should not be able to validate a check in with wrong id.', async () => {
    await expect(async () => {
      await sut.execute({ checkInId: 'non-existent-id' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('Should not be able to validate a check in after 20 minutes of creation.', async () => {
    vi.setSystemTime(new Date(2026, 0, 1, 8, 0, 0))
    // Create a check-in
    const { id: checkInId } = await checkInsRepository.create({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    const TWENTY_ONE_MINUTES_IN_MS = 21 * 60 * 1000

    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS)

    await expect(async () => {
      await sut.execute({ checkInId })
    }).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
