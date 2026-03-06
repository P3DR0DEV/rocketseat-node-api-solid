import supertest from 'supertest'
import { appForTest } from '#src/app-test.ts'

describe('Authenticate E2E', () => {
  beforeAll(async () => {
    await appForTest.ready()
  })

  afterAll(async () => {
    await appForTest.close()
  })

  it('Should be able to authenticate.', async () => {
    await supertest(appForTest.server).post('/users').send({
      name: 'Pedro Mendes',
      email: 'pedro@mendes.com.br',
      password: '123456',
    })

    const response = await supertest(appForTest.server)
      .post('/sessions')
      .send({ email: 'pedro@mendes.com.br', password: '123456' })

    expect(response.status).toBe(200)

    expect(response.body).toEqual(expect.objectContaining({ token: expect.any(String) }))
  })
})
