import { DrizzleCheckInsRepository } from '#src/database/repositories/drizzle-check-ins-repository.ts'
import { GetUserMetricsUseCase } from '../get-user-metrics.ts'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new DrizzleCheckInsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetricsUseCase
}
