import { DrizzleGymsRepository } from '#src/database/repositories/drizzle-gyms-repository.ts'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms.ts'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new DrizzleGymsRepository()
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository)

  return fetchNearbyGymsUseCase
}
