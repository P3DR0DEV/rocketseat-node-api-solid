import type { Gym, GymsRepository } from '#src/repositories/gyms-repository.ts'

interface FetchNearbyGymsUseCaseProps {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  private readonly gymsRepository: GymsRepository

  constructor(gymsRepository: GymsRepository) {
    this.gymsRepository = gymsRepository
  }

  async execute({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseProps): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude })

    return { gyms }
  }
}
