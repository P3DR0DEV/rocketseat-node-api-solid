import type { User, UsersRepository } from '#src/repositories/users-repository.ts'
import { ResourceNotFoundError } from './errors/resource-not-found-error.ts'

interface GetUserProfileUseCaseProps {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  private readonly usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ userId }: GetUserProfileUseCaseProps): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
