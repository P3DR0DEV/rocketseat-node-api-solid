import { InMemoryCheckInsRepository } from '#test/repositories/in-memory-check-ins-repository.ts'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history.ts'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check Ins History Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('Should be able to fetch check-ins history.', async () => {
    await checkInsRepository.create({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    await checkInsRepository.create({
      userId: 'user-id',
      gymId: 'gym-id2',
    })

    const { checkIns } = await sut.execute({ userId: 'user-id', page: 1 })

    expect(checkIns).toHaveLength(2)

    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-id' }),
      expect.objectContaining({ gymId: 'gym-id2' }),
    ])
  })

  it('Should be able to fetch paginated check-ins history.', async () => {
    for (let i = 0; i < 22; i++) {
      await checkInsRepository.create({
        userId: 'user-id',
        gymId: `gym-id${i}`,
      })
    }

    const { checkIns } = await sut.execute({ userId: 'user-id', page: 2 })

    expect(checkIns).toHaveLength(2)

    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-id20' }),
      expect.objectContaining({ gymId: 'gym-id21' }),
    ])
  })
})
