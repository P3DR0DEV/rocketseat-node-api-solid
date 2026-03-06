import type { CheckIn, CheckInsRepository } from '#src/repositories/check-ins-repository.ts'
import type { GymsRepository } from '#src/repositories/gyms-repository.ts'
import { getDistanceBetweenCoordinates } from '#src/utils/get-distance-between-coordinates.ts'
import { MaxDistanceError } from './errors/max-distance-error.ts'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

interface CheckInUseCaseProps {
  userId: string
  gymId: string

  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  private readonly checkInsRepository: CheckInsRepository
  private readonly gymsRepository: GymsRepository

  constructor(checkInsRepository: CheckInsRepository, gymsRepository: GymsRepository) {
    this.checkInsRepository = checkInsRepository
    this.gymsRepository = gymsRepository
  }

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckInUseCaseProps): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const MAX_DISTANCE_BETWEEN_USER_AND_GYM_IN_KM = 0.1 // 10 meters

    const distance = getDistanceBetweenCoordinates(
      { latitude: gym.latitude, longitude: gym.longitude },
      { latitude: userLatitude, longitude: userLongitude },
    )

    if (distance > MAX_DISTANCE_BETWEEN_USER_AND_GYM_IN_KM) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      userId,
      gymId,
    })

    return { checkIn }
  }
}
