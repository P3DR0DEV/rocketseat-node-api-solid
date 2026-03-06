import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCheckInUseCase } from '#src/http/use-cases/factories/make-check-in-use-case.ts'

export async function createCheckIn(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user

  const createCheckInBodySchema = z.object({
    gymId: z.uuid(),
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  })

  const { gymId, latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const createCheckInUseCase = makeCheckInUseCase()
  const { checkIn } = await createCheckInUseCase.execute({
    userId: sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({
    checkIn,
  })
}
