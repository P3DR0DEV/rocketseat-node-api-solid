import { DrizzleCheckInsRepository } from '#src/database/repositories/drizzle-check-ins-repository.ts'
import { ValidateCheckInUseCase } from '../validate-check-in.ts'

export function makeValidateCheckInUseCase() {
  const checkInRepository = new DrizzleCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository)

  return validateCheckInUseCase
}
