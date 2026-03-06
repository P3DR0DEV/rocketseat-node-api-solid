import supertest from 'supertest'
import { appForTest } from '#src/app-test.ts'
import { createAndAuthenticateUser } from '#src/utils/test/create-and-authenticate-user.ts'

describe('Fetch Nearby Gyms E2E', () => {
  beforeAll(async () => {
    await appForTest.ready()
  })

  afterAll(async () => {
    await appForTest.close()
  })

  it('Should be able to fetch nearby gyms.', async () => {
    const { token } = await createAndAuthenticateUser(appForTest)
    await supertest(appForTest.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Gym1',
      description: 'description',
      phone: '123456',
      latitude: 0,
      longitude: 0,
    })

    await supertest(appForTest.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Gym2',
      description: 'description',
      phone: '123456',
      latitude: -19.9225295,
      longitude: -43.9353344,
    })

    const response = await supertest(appForTest.server)
      .get('/gyms/nearby')
      .query({ latitude: '0', longitude: '0' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)

    expect(response.body).toEqual({ gyms: expect.arrayContaining([expect.objectContaining({ title: 'Gym1' })]) })
  })
})
