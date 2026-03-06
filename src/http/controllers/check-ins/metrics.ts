import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '#src/http/use-cases/factories/make-get-user-metrics.ts'

export async function getUserMetrics(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user

  const getUserMetricsUseCase = makeGetUserMetricsUseCase()
  const { checkInsCount } = await getUserMetricsUseCase.execute({ userId: sub })

  return reply.status(200).send({
    checkInsCount,
  })
}
