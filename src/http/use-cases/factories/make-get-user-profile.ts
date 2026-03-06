import { DrizzleUsersRepository } from '#src/database/repositories/drizzle-users-repository.ts'
import { GetUserProfileUseCase } from '../get-user-profile.ts'

export function makeGetUserProfileUseCase() {
  const usersRepository = new DrizzleUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
