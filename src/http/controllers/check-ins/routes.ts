import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '#src/http/middlewares/verify-jwt.ts'
import { verifyUserRole } from '#src/http/middlewares/verify-user-role.ts'
import { createCheckIn } from './create.ts'
import { fetchUserCheckInsHistory } from './history.ts'
import { getUserMetrics } from './metrics.ts'
import { validateCheckIn } from './validate.ts'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJwt)

  app.post('/check-ins', createCheckIn)
  app.get('/check-ins/metrics', getUserMetrics)
  app.get('/check-ins/history', fetchUserCheckInsHistory)
  app.patch('/check-ins/:checkInId/validate', { onRequest: [verifyUserRole('ADMIN')] }, validateCheckIn)
}
