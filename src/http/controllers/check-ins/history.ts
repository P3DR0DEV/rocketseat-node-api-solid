import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '#src/http/use-cases/factories/make-fetch-user-check-ins-history.ts'

export async function fetchUserCheckInsHistory(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user

  const fetchUserCheckInsHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchUserCheckInsHistorySchema.parse(request.query)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()
  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({ userId: sub, page })

  return reply.status(200).send({
    checkIns,
  })
}
