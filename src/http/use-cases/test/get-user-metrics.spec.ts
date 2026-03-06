import { InMemoryCheckInsRepository } from '#test/repositories/in-memory-check-ins-repository.ts'
import { GetUserMetricsUseCase } from '../get-user-metrics.ts'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('Should be able to get check-ins count from metrics.', async () => {
    for (let i = 0; i < 25; i++) {
      await checkInsRepository.create({
        userId: 'user-id',
        gymId: 'gym-id',
      })
    }

    const { checkInsCount } = await sut.execute({ userId: 'user-id' })

    expect(checkInsCount).toBe(25)
  })
})
