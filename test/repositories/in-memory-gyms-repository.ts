import { randomUUID } from 'node:crypto'
import type { FindManyNearbyParams, Gym, GymInput, GymsRepository } from '#src/repositories/gyms-repository.ts'
import { getDistanceBetweenCoordinates } from '#src/utils/get-distance-between-coordinates.ts'

export class InMemoryGymsRepository implements GymsRepository {
  items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((user) => user.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(values: GymInput): Promise<Gym> {
    const gym = { id: randomUUID(), ...values }

    await this.items.push(gym)

    return gym
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = this.items.filter((gym) => gym.title.toLowerCase().includes(query.toLowerCase())).slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams): Promise<Gym[]> {
    return this.items.filter((gym) => {
      const distance = getDistanceBetweenCoordinates({ latitude, longitude }, { latitude: gym.latitude, longitude: gym.longitude })

      return distance <= 10
    })
  }
}
