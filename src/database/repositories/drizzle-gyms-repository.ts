import { eq, type InferSelectModel, ilike, sql } from 'drizzle-orm'
import { db } from '#src/lib/drizzle.ts'
import type { FindManyNearbyParams, Gym, GymInput, GymsRepository } from '#src/repositories/gyms-repository.ts'
import { gyms } from '../schemas/gyms.ts'

type DrizzleInferGymType = InferSelectModel<typeof gyms>

export class DrizzleGymsRepository implements GymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = await db.select().from(gyms).where(eq(gyms.id, id))

    if (gym.length === 0) {
      return null
    }

    return {
      ...gym[0],
      latitude: Number(gym[0].latitude),
      longitude: Number(gym[0].longitude),
    }
  }

  async create(values: GymInput): Promise<Gym> {
    const gym = await db
      .insert(gyms)
      .values({
        ...values,
        latitude: String(values.latitude),
        longitude: String(values.longitude),
      })
      .returning()

    return {
      ...gym[0],
      latitude: Number(gym[0].latitude),
      longitude: Number(gym[0].longitude),
    }
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const returnedGyms = await db
      .select()
      .from(gyms)
      .where(ilike(gyms.title, `%${query}%`))
      .limit(20)
      .offset((page - 1) * 20)

    return returnedGyms.map((gym) => ({
      ...gym,
      latitude: Number(gym.latitude),
      longitude: Number(gym.longitude),
    }))
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams): Promise<Gym[]> {
    const query = sql`SELECT * FROM ${gyms} WHERE (6371* ACOS(COS(RADIANS(${latitude}) ) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(${longitude})) + SIN(RADIANS(${latitude})) * SIN(RADIANS(latitude)))) <= 10`

    const result = await db.execute(query)
    const returnedGyms = result.rows as DrizzleInferGymType[]

    return returnedGyms.map((gym) => ({
      ...gym,
      latitude: Number(gym.latitude),
      longitude: Number(gym.longitude),
    }))
  }
}
