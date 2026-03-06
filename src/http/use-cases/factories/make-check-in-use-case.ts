import { DrizzleCheckInsRepository } from '#src/database/repositories/drizzle-check-ins-repository.ts'
import { DrizzleGymsRepository } from '#src/database/repositories/drizzle-gyms-repository.ts'
import { CheckInUseCase } from '../check-in.ts'

export function makeCheckInUseCase() {
  const checkInRepository = new DrizzleCheckInsRepository()
  const gymsRepository = new DrizzleGymsRepository()
  const checkInUseCase = new CheckInUseCase(checkInRepository, gymsRepository)

  return checkInUseCase
}
