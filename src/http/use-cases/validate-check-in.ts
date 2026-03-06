import dayjs from 'dayjs'
import type { CheckIn, CheckInsRepository } from '#src/repositories/check-ins-repository.ts'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

interface ValidateCheckInUseCaseProps {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  private readonly checkInsRepository: CheckInsRepository

  constructor(checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository
  }

  async execute({ checkInId }: ValidateCheckInUseCaseProps): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.createdAt, 'minute')

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validatedAt = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}
