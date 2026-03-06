import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import z, { ZodError } from 'zod'
import { env } from './env/index.ts'
import { checkInsRoutes } from './http/controllers/check-ins/routes.ts'
import { gymRoutes } from './http/controllers/gyms/routes.ts'
import { userRoutes } from './http/controllers/users/routes.ts'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: { expiresIn: '10m' },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: error.message,
      issues: z.treeifyError(error).errors,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Log error to an external service
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})

export { app }
