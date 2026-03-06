import type { Gym, GymsRepository } from '#src/repositories/gyms-repository.ts'

interface SearchGymsUseCaseProps {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  private readonly gymsRepository: GymsRepository

  constructor(gymsRepository: GymsRepository) {
    this.gymsRepository = gymsRepository
  }

  async execute({ query, page }: SearchGymsUseCaseProps): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
