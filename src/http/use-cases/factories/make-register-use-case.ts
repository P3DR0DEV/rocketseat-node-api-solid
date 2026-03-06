import { DrizzleUsersRepository } from '#src/database/repositories/drizzle-users-repository.ts'
import { RegisterUserUseCase } from '../register.ts'

export function makeRegisterUseCase() {
  const usersRepository = new DrizzleUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(usersRepository)

  return registerUserUseCase
}
