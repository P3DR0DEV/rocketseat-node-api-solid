import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '#src/http/middlewares/verify-jwt.ts'
import { authenticate } from './authenticate.ts'
import { profile } from './profile.ts'
import { refresh } from './refresh.ts'
import { register } from './register.ts'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  /** Rotas fechadas */
  app.get('/me', { preHandler: verifyJwt }, profile)
}
