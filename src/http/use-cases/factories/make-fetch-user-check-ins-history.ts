import { DrizzleCheckInsRepository } from '#src/database/repositories/drizzle-check-ins-repository.ts'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history.ts'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new DrizzleCheckInsRepository()
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return fetchUserCheckInsHistoryUseCase
}
