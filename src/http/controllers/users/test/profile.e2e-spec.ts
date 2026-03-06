import supertest from 'supertest'
import { appForTest } from '#src/app-test.ts'
import { createAndAuthenticateUser } from '#src/utils/test/create-and-authenticate-user.ts'

describe('Profile E2E', () => {
  beforeAll(async () => {
    await appForTest.ready()
  })

  afterAll(async () => {
    await appForTest.close()
  })

  it('Should be able to register.', async () => {
    const { token } = await createAndAuthenticateUser(appForTest)

    const response = await supertest(appForTest.server).get('/me').set('Authorization', `Bearer ${token}`).send()

    expect(response.status).toBe(200)

    expect(response.body).toEqual(expect.objectContaining({ user: expect.objectContaining({ name: 'Pedro Mendes' }) }))
  })
})
