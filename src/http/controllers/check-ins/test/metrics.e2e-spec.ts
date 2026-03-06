import supertest from 'supertest'
import { appForTest } from '#src/app-test.ts'
import { gyms } from '#src/database/schemas/gyms.ts'
import { createAndAuthenticateUser } from '#src/utils/test/create-and-authenticate-user.ts'
import { databaseForTest } from '#test/setup-e2e.ts'

describe('Get User Metrics E2E', () => {
  beforeAll(async () => {
    await appForTest.ready()
  })

  afterAll(async () => {
    await appForTest.close()
  })

  it('Should be able to search paginated gyms.', async () => {
    const { token } = await createAndAuthenticateUser(appForTest)

    const gym = await databaseForTest
      .insert(gyms)
      .values({
        title: 'Gym1',
        description: 'description',
        phone: '123456',
        latitude: String(0),
        longitude: String(0),
      })
      .returning()

    await supertest(appForTest.server).post('/check-ins').set('Authorization', `Bearer ${token}`).send({
      gymId: gym[0].id,
      latitude: 0,
      longitude: 0,
    })

    const response = await supertest(appForTest.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)

    expect(response.body).toEqual({ checkInsCount: 1 })
  })
})
