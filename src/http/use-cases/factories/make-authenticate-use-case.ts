import { DrizzleUsersRepository } from '#src/database/repositories/drizzle-users-repository.ts'
import { AuthenticateUseCase } from '../authenticate.ts'

export function makeAuthenticateUseCase() {
  const usersRepository = new DrizzleUsersRepository()
  const registerUserUseCase = new AuthenticateUseCase(usersRepository)

  return registerUserUseCase
}
