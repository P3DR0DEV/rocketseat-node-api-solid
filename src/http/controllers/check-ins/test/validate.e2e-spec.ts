import supertest from 'supertest'
import { appForTest } from '#src/app-test.ts'
import { checkIns } from '#src/database/schemas/check-ins.ts'
import { gyms } from '#src/database/schemas/gyms.ts'
import { users } from '#src/database/schemas/users.ts'
import { createAndAuthenticateUser } from '#src/utils/test/create-and-authenticate-user.ts'
import { databaseForTest } from '#test/setup-e2e.ts'

describe('Validate Check-in E2E', () => {
  beforeAll(async () => {
    await appForTest.ready()
  })

  afterAll(async () => {
    await appForTest.close()
  })

  it('Should be able to validate a check-in.', async () => {
    // MUST BE ADMIN TO CREATE GYMS TO VALIDATE CHECK-INS FOR THAT GYM
    const { token } = await createAndAuthenticateUser(appForTest, true)

    const user = (await databaseForTest.select().from(users)).find((user) => user.email === 'pedro@mendes.com.br')

    if (!user) {
      throw new Error('User not found')
    }

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

    const checkIn = await databaseForTest
      .insert(checkIns)
      .values({
        userId: user.id,
        gymId: gym[0].id,
      })
      .returning()

    const response = await supertest(appForTest.server)
      .patch(`/check-ins/${checkIn[0].id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(204)
  })
})
