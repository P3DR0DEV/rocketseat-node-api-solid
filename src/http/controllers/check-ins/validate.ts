import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeValidateCheckInUseCase } from '#src/http/use-cases/factories/make-validate-check-in.ts'

export async function validateCheckIn(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInBodySchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = validateCheckInBodySchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()
  await validateCheckInUseCase.execute({ checkInId })

  return reply.status(204).send()
}
