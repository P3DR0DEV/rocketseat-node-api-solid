import supertest from 'supertest'
import { appForTest } from '#src/app-test.ts'

describe('Register E2E', () => {
  beforeAll(async () => {
    await appForTest.ready()
  })

  afterAll(async () => {
    await appForTest.close()
  })

  it('Should be able to register.', async () => {
    const response = await supertest(appForTest.server).post('/users').send({
      name: 'Pedro Mendes',
      email: 'pedro@mendes.com.br',
      password: '123456',
    })

    expect(response.status).toBe(201)
  })
})
