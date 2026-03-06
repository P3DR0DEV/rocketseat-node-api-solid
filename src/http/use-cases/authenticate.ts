import { compare } from 'bcryptjs'
import type { User, UsersRepository } from '#src/repositories/users-repository.ts'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.ts'

interface AuthenticateUseCaseProps {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  private readonly usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }: AuthenticateUseCaseProps): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordCorrect = await compare(password, user.passwordHash)

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
