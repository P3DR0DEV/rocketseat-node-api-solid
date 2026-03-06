import type { CheckIn, CheckInsRepository } from '#src/repositories/check-ins-repository.ts'

export interface FetchUserCheckInsHistoryUseCaseProps {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  private readonly checkInsRepository: CheckInsRepository

  constructor(checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository
  }

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseProps): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
