import { DrizzleGymsRepository } from '#src/database/repositories/drizzle-gyms-repository.ts'
import { SearchGymsUseCase } from '../search-gyms.ts'

export function makeSearchGymsUseCase() {
  const gymsRepository = new DrizzleGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(gymsRepository)

  return searchGymsUseCase
}
