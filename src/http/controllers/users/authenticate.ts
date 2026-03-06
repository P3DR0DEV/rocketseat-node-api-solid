import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { InvalidCredentialsError } from '#src/http/use-cases/errors/invalid-credentials-error.ts'
import { makeAuthenticateUseCase } from '#src/http/use-cases/factories/make-authenticate-use-case.ts'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUserUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUserUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sub: user.id,
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sub: user.id,
        expiresIn: '7d',
      },
    )


    return reply.setCookie('refreshToken', refreshToken, { 
      path: '/',
      httpOnly: true,
      sameSite: true,
      secure: true,
     }).status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
