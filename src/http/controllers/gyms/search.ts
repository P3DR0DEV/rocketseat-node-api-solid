import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeSearchGymsUseCase } from '#src/http/use-cases/factories/make-search-gyms.ts'

export async function searchGyms(request: FastifyRequest, reply: FastifyReply) {
  const searchGymBodySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymBodySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymsUseCase()
  const { gyms } = await searchGymUseCase.execute({ query, page })

  return reply.status(200).send({
    gyms,
  })
}
