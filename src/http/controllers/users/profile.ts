import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileUseCase } from '#src/http/use-cases/factories/make-get-user-profile.ts'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const { user } = await getUserProfileUseCase.execute({ userId: request.user.sub })

  return reply.status(200).send({
    user: {
      ...user,
      passwordHash: undefined,
    },
  })
}
