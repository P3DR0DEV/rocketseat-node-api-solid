import { hash } from 'bcryptjs'
import type { User, UsersRepository } from '#src/repositories/users-repository.ts'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.ts'

interface RegisterUseCaseProps {
  name: string
  email: string
  password: string
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  private readonly usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }: RegisterUseCaseProps): Promise<RegisterUserUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    })

    return { user }
  }
}
