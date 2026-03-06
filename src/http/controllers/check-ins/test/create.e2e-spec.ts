import supertest from 'supertest'
import { appForTest } from '#src/app-test.ts'
import { gyms } from '#src/database/schemas/gyms.ts'
import { createAndAuthenticateUser } from '#src/utils/test/create-and-authenticate-user.ts'
import { databaseForTest } from '#test/setup-e2e.ts'

describe('Create Check-in E2E', () => {
  beforeAll(async () => {
    await appForTest.ready()
  })

  afterAll(async () => {
    await appForTest.close()
  })

  it('Should be able to create a check-in.', async () => {
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

    const response = await supertest(appForTest.server)
      .post('/check-ins')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gymId: gym[0].id,
        latitude: 0,
        longitude: 0,
      })

    expect(response.status).toBe(201)

    expect(response.body).toEqual({ checkIn: expect.objectContaining({ gymId: gym[0].id }) })
  })
})
