export interface Gym {
  id: string
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export interface GymInput {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(values: GymInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby({ latitude, longitude }: FindManyNearbyParams): Promise<Gym[]>
}
