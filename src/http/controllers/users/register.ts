import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserAlreadyExistsError } from '#src/http/use-cases/errors/user-already-exists-error.ts'
import { makeRegisterUseCase } from '#src/http/use-cases/factories/make-register-use-case.ts'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUserUseCase = makeRegisterUseCase()
    await registerUserUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
