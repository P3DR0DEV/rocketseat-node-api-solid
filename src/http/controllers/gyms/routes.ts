import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '#src/http/middlewares/verify-jwt.ts'
import { verifyUserRole } from '#src/http/middlewares/verify-user-role.ts'
import { createGym } from './create.ts'
import { fetchNearbyGyms } from './fetch-nearby.ts'
import { searchGyms } from './search.ts'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('preHandler', verifyJwt)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createGym)
  app.get('/gyms/search', searchGyms)
  app.get('/gyms/nearby', fetchNearbyGyms)
}
