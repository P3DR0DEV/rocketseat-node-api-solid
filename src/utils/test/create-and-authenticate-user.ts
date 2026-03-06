import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import supertest from 'supertest'
import { users } from '#src/database/schemas/users.ts'
import { databaseForTest } from '#test/setup-e2e.ts'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
  await databaseForTest.insert(users).values({
    name: 'Pedro Mendes',
    email: 'pedro@mendes.com.br',
    passwordHash: await hash('123456', 6),
    role: isAdmin ? 'ADMIN' : 'MEMBER',
  })

  const response = await supertest(app.server)
    .post('/sessions')
    .send({ email: 'pedro@mendes.com.br', password: '123456' })

  return {
    token: response.body.token,
  }
}
