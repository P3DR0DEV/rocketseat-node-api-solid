import { DrizzleGymsRepository } from '#src/database/repositories/drizzle-gyms-repository.ts'
import { CreateGymUseCase } from '../create-gym.ts'

export function makeCreateGymUseCase() {
  const gymsRepository = new DrizzleGymsRepository()
  const createGymUseCase = new CreateGymUseCase(gymsRepository)

  return createGymUseCase
}
