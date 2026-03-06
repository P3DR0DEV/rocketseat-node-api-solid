import supertest from 'supertest'
import { appForTest } from '#src/app-test.ts'
import { createAndAuthenticateUser } from '#src/utils/test/create-and-authenticate-user.ts'

describe('Create Gym E2E', () => {
  beforeAll(async () => {
    await appForTest.ready()
  })

  afterAll(async () => {
    await appForTest.close()
  })

  it('Should be able to create a gym.', async () => {
    const { token } = await createAndAuthenticateUser(appForTest, true)

    const response = await supertest(appForTest.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Gym1',
      description: 'description',
      phone: '123456',
      latitude: -19.9225295,
      longitude: -43.9353344,
    })

    expect(response.status).toBe(201)

    expect(response.body).toEqual(expect.objectContaining({ gym: expect.objectContaining({ title: 'Gym1' }) }))
  })
})
